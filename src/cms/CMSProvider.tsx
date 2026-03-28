import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type {
  CMSData,
  VehicleCategory,
  TopOffer,
  Experience,
  Scenario,
  PostAuthor,
  Post,
  Review,
  GuestStory,
  MembershipTier,
  HeroContent,
  AboutContent,
  FooterContent,
} from "./cmsTypes";
import { cmsDefaults } from "./cmsDefaults";

const CMS_STORAGE_KEY = "gts_cms_data";
const CMS_SUPABASE_TABLE = "cms_content";
const CMS_SUPABASE_ROW_ID = "global";
const CMS_SYNC_DEBOUNCE_MS = 800;
const CMS_FALLBACK_SYNC_INTERVAL_MS = 15000;

type CMSSyncMode = "remote" | "local";

interface CMSLoadResult {
  status: "success" | "empty" | "error";
  data?: CMSData;
  error?: unknown;
}

interface CMSMutationResult {
  success: boolean;
  error?: string;
}

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  if (!target) return source;

  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function normalizeCMSData(data?: Partial<CMSData> | null): CMSData {
  return deepMerge(cmsDefaults, data || {}) as CMSData;
}

function toStableComparable(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((entry) => toStableComparable(entry));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entryValue]) => entryValue !== undefined)
        .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey, "en"))
        .map(([entryKey, entryValue]) => [entryKey, toStableComparable(entryValue)])
    );
  }

  return value;
}

function stableSerialize(value: unknown): string {
  return JSON.stringify(toStableComparable(value));
}

function formatSupabaseError(error: unknown): string {
  if (!error) return "Неизвестная ошибка синхронизации CMS.";
  if (typeof error === "string") return error;

  if (typeof error === "object") {
    const message = "message" in error && typeof error.message === "string" ? error.message : "";
    const details = "details" in error && typeof error.details === "string" ? error.details : "";
    const hint = "hint" in error && typeof error.hint === "string" ? error.hint : "";

    return [message, details, hint].filter(Boolean).join(" | ") || "Ошибка синхронизации CMS с Supabase.";
  }

  return "Ошибка синхронизации CMS с Supabase.";
}

function loadFromStorage(): CMSData {
  if (typeof window === "undefined") return cmsDefaults;

  try {
    const raw = window.localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      return normalizeCMSData(JSON.parse(raw) as CMSData);
    }
  } catch (error) {
    console.warn("[GTS CMS] Failed to load from localStorage:", error);
  }

  return cmsDefaults;
}

function saveToStorage(data: CMSData) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("[GTS CMS] Failed to save to localStorage:", error);
  }
}

async function loadSupabaseCMS(): Promise<CMSLoadResult> {
  try {
    const { supabase } = await import("../utils/supabase/client");
    const { data, error } = await supabase
      .from(CMS_SUPABASE_TABLE)
      .select("id, data, updated_at")
      .eq("id", CMS_SUPABASE_ROW_ID)
      .maybeSingle();

    if (error) throw error;
    if (!data) return { status: "empty" };

    return {
      status: "success",
      data: normalizeCMSData(data.data as CMSData),
    };
  } catch (error) {
    console.warn("[GTS CMS] Supabase load failed, using local cache:", error);
    return { status: "error", error };
  }
}

async function upsertSupabaseCMS(data: CMSData): Promise<CMSMutationResult> {
  try {
    const { supabase } = await import("../utils/supabase/client");
    const payload = normalizeCMSData(data);

    console.log("[GTS CMS] Upsert content →", {
      heroTitle: payload.hero.title,
      aboutTitle: payload.about.title,
      vehicles: payload.vehicleCategories.length,
      offers: payload.topOffers.length,
      experiences: payload.experiences.length,
      posts: payload.posts.length,
    });

    const { error } = await supabase
      .from(CMS_SUPABASE_TABLE)
      .upsert(
        {
          id: CMS_SUPABASE_ROW_ID,
          data: payload,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) throw error;

    const { data: persistedRow, error: persistedError } = await supabase
      .from(CMS_SUPABASE_TABLE)
      .select("id, data, updated_at")
      .eq("id", CMS_SUPABASE_ROW_ID)
      .single();

    if (persistedError) throw persistedError;

    const persistedCMS = normalizeCMSData(persistedRow.data as CMSData);
    const matches = stableSerialize(persistedCMS) === stableSerialize(payload);

    console.log("[GTS CMS] Upsert verification ←", {
      matches,
      updatedAt: persistedRow.updated_at,
      heroTitle: persistedCMS.hero.title,
      offers: persistedCMS.topOffers.length,
      experiences: persistedCMS.experiences.length,
    });

    if (!matches) {
      return {
        success: false,
        error: "Supabase принял запрос, но вернул старую версию CMS. Изменения пока остались локальными.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[GTS CMS] Supabase upsert failed:", error);
    return { success: false, error: formatSupabaseError(error) };
  }
}

interface CMSContextValue {
  data: CMSData;
  isSyncing: boolean;
  syncMode: CMSSyncMode;
  syncError: string | null;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateAbout: (about: Partial<AboutContent>) => void;
  updateVehicleCategory: (id: string, updates: Partial<VehicleCategory>) => void;
  addVehicleCategory: (category: VehicleCategory) => void;
  deleteVehicleCategory: (id: string) => void;
  updateTopOffer: (id: string, updates: Partial<TopOffer>) => void;
  addTopOffer: (offer: TopOffer) => void;
  deleteTopOffer: (id: string) => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  addExperience: (exp: Experience) => void;
  deleteExperience: (id: string) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  addScenario: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
  updatePostAuthor: (id: string, updates: Partial<PostAuthor>) => void;
  addPostAuthor: (author: PostAuthor) => void;
  deletePostAuthor: (id: string) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  addReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  updateGuestStory: (id: string, updates: Partial<GuestStory>) => void;
  addGuestStory: (story: GuestStory) => void;
  deleteGuestStory: (id: string) => void;
  updateMembershipTier: (id: string, updates: Partial<MembershipTier>) => void;
  updateFooter: (footer: Partial<FooterContent>) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(loadFromStorage);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMode, setSyncMode] = useState<CMSSyncMode>("local");
  const [syncError, setSyncError] = useState<string | null>(null);
  const dataRef = useRef(data);
  const lastRemoteSnapshotRef = useRef(stableSerialize(data));
  const initialLoadCompleteRef = useRef(false);
  const hasPendingLocalChangesRef = useRef(false);
  const saveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const refreshFromSupabase = useCallback(async () => {
    const remote = await loadSupabaseCMS();

    if (remote.status !== "success") {
      console.log("[GTS CMS] refreshFromSupabase — status:", remote.status);
      if (remote.status === "error") {
        setSyncMode("local");
        setSyncError(formatSupabaseError(remote.error));
      }
      return remote;
    }

    const serialized = stableSerialize(remote.data);
    lastRemoteSnapshotRef.current = serialized;
    setSyncMode("remote");
    setSyncError(null);

    setData((prev) => {
      const changed = stableSerialize(prev) !== serialized;
      console.log("[GTS CMS] refreshFromSupabase — changed:", changed);
      return changed ? remote.data! : prev;
    });
    saveToStorage(remote.data!);

    return remote;
  }, []);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsSyncing(true);
      const remote = await refreshFromSupabase();
      if (cancelled) return;

      if (remote.status === "empty") {
        const localSnapshot = dataRef.current;
        const shouldSeed = stableSerialize(localSnapshot) !== stableSerialize(cmsDefaults);

        if (shouldSeed) {
          const result = await upsertSupabaseCMS(localSnapshot);
          if (cancelled) return;

          if (result.success) {
            await refreshFromSupabase();
          } else {
            setSyncMode("local");
            setSyncError(result.error || "Не удалось создать общую запись CMS.");
          }
        }
      }

      initialLoadCompleteRef.current = true;
      setIsSyncing(false);
    })();

    return () => {
      cancelled = true;
      initialLoadCompleteRef.current = true;
      if (saveTimeoutRef.current !== null) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [refreshFromSupabase]);

  useEffect(() => {
    if (!initialLoadCompleteRef.current || !hasPendingLocalChangesRef.current) {
      return;
    }

    const currentSnapshot = stableSerialize(data);
    if (currentSnapshot === lastRemoteSnapshotRef.current) {
      hasPendingLocalChangesRef.current = false;
      setIsSyncing(false);
      setSyncError(null);
      setSyncMode("remote");
      return;
    }

    if (saveTimeoutRef.current !== null) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    setIsSyncing(true);
    saveTimeoutRef.current = window.setTimeout(() => {
      (async () => {
        const result = await upsertSupabaseCMS(dataRef.current);

        if (result.success) {
          hasPendingLocalChangesRef.current = false;
          await refreshFromSupabase();
        } else {
          setSyncMode("local");
          setSyncError(result.error || "Не удалось сохранить общую версию CMS.");
        }

        setIsSyncing(false);
      })();
    }, CMS_SYNC_DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current !== null) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, refreshFromSupabase]);

  useEffect(() => {
    let isMounted = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let channel: any = null;

    const syncVisibleClient = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }

      console.log("[GTS CMS] Polling/visibility sync triggered");
      void refreshFromSupabase();
    };

    (async () => {
      const { supabase } = await import("../utils/supabase/client");
      if (!isMounted) return;

      channel = supabase
        .channel("cms-content-realtime")
        .on(
          "postgres_changes" as any,
          { event: "*", schema: "public", table: CMS_SUPABASE_TABLE },
          (payload: any) => {
            console.log("[GTS CMS] Realtime event received:", payload.eventType, payload);
            void refreshFromSupabase();
          }
        )
        .subscribe((status: string) => {
          console.log("[GTS CMS] Realtime subscription status:", status);
          if (status === "SUBSCRIBED") {
            void refreshFromSupabase();
          }
        });
    })();

    const intervalId = window.setInterval(syncVisibleClient, CMS_FALLBACK_SYNC_INTERVAL_MS);
    const onFocus = () => syncVisibleClient();
    const onVisibilityChange = () => syncVisibleClient();

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (channel) {
        (async () => {
          const { supabase } = await import("../utils/supabase/client");
          supabase.removeChannel(channel);
        })();
      }
    };
  }, [refreshFromSupabase]);

  const update = useCallback((updater: (prev: CMSData) => CMSData) => {
    hasPendingLocalChangesRef.current = true;
    setData((prev) => normalizeCMSData(updater(prev)));
  }, []);

  const updateItem = <T extends { id: string }>(
    key: keyof CMSData,
    id: string,
    updates: Partial<T>
  ) => {
    update((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown as T[]).map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const addItem = <T,>(key: keyof CMSData, item: T) => {
    update((prev) => ({
      ...prev,
      [key]: [...(prev[key] as unknown as T[]), item],
    }));
  };

  const deleteItem = <T extends { id: string }>(key: keyof CMSData, id: string) => {
    update((prev) => ({
      ...prev,
      [key]: (prev[key] as unknown as T[]).filter((item) => item.id !== id),
    }));
  };

  const value: CMSContextValue = {
    data,
    isSyncing,
    syncMode,
    syncError,
    updateHero: (hero) => update((prev) => ({ ...prev, hero: { ...prev.hero, ...hero } })),
    updateAbout: (about) => update((prev) => ({ ...prev, about: { ...prev.about, ...about } })),
    updateVehicleCategory: (id, updates) => updateItem<VehicleCategory>("vehicleCategories", id, updates),
    addVehicleCategory: (category) => addItem("vehicleCategories", category),
    deleteVehicleCategory: (id) => deleteItem<VehicleCategory>("vehicleCategories", id),
    updateTopOffer: (id, updates) => updateItem<TopOffer>("topOffers", id, updates),
    addTopOffer: (offer) => addItem("topOffers", offer),
    deleteTopOffer: (id) => deleteItem<TopOffer>("topOffers", id),
    updateExperience: (id, updates) => updateItem<Experience>("experiences", id, updates),
    addExperience: (exp) => addItem("experiences", exp),
    deleteExperience: (id) => deleteItem<Experience>("experiences", id),
    updateScenario: (id, updates) => updateItem<Scenario>("scenarios", id, updates),
    addScenario: (scenario) => addItem("scenarios", scenario),
    deleteScenario: (id) => deleteItem<Scenario>("scenarios", id),
    updatePost: (id, updates) => updateItem<Post>("posts", id, updates),
    addPost: (post) => addItem("posts", post),
    deletePost: (id) => deleteItem<Post>("posts", id),
    updatePostAuthor: (id, updates) => updateItem<PostAuthor>("postAuthors", id, updates),
    addPostAuthor: (author) => addItem("postAuthors", author),
    deletePostAuthor: (id) => deleteItem<PostAuthor>("postAuthors", id),
    updateReview: (id, updates) => updateItem<Review>("reviews", id, updates),
    addReview: (review) => addItem("reviews", review),
    deleteReview: (id) => deleteItem<Review>("reviews", id),
    updateGuestStory: (id, updates) => updateItem<GuestStory>("guestStories", id, updates),
    addGuestStory: (story) => addItem("guestStories", story),
    deleteGuestStory: (id) => deleteItem<GuestStory>("guestStories", id),
    updateMembershipTier: (id, updates) => updateItem<MembershipTier>("membershipTiers", id, updates),
    updateFooter: (footer) => update((prev) => ({ ...prev, footer: { ...prev.footer, ...footer } })),
    resetToDefaults: () => {
      hasPendingLocalChangesRef.current = true;
      setData(cmsDefaults);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(CMS_STORAGE_KEY);
      }
    },
    exportData: () => JSON.stringify(data, null, 2),
    importData: (json: string) => {
      try {
        const parsed = JSON.parse(json) as Partial<CMSData>;
        hasPendingLocalChangesRef.current = true;
        setData(normalizeCMSData(parsed));
        return true;
      } catch {
        return false;
      }
    },
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS(): CMSContextValue {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within CMSProvider");
  }
  return context;
}
