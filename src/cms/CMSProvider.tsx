import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { CMSData, VehicleCategory, TopOffer, Experience, Scenario, PostAuthor, Post, Review, GuestStory, MembershipTier, HeroContent, AboutContent, FooterContent } from "./cmsTypes";
import { cmsDefaults } from "./cmsDefaults";

const CMS_STORAGE_KEY = "gts_cms_data";

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  if (!target) return source;
  
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

function loadFromStorage(): CMSData {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (raw) {
      return deepMerge(cmsDefaults, JSON.parse(raw)) as CMSData;
    }
  } catch (e) {
    console.warn("CMS: Failed to load from localStorage", e);
  }
  return cmsDefaults;
}

function saveToStorage(data: CMSData) {
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("CMS: Failed to save to localStorage", e);
  }
}

interface CMSContextValue {
  data: CMSData;
  // Hero
  updateHero: (hero: Partial<HeroContent>) => void;
  // About
  updateAbout: (about: Partial<AboutContent>) => void;
  // Vehicle Categories
  updateVehicleCategory: (id: string, updates: Partial<VehicleCategory>) => void;
  addVehicleCategory: (category: VehicleCategory) => void;
  deleteVehicleCategory: (id: string) => void;
  // Top Offers
  updateTopOffer: (id: string, updates: Partial<TopOffer>) => void;
  addTopOffer: (offer: TopOffer) => void;
  deleteTopOffer: (id: string) => void;
  // Experiences
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  addExperience: (exp: Experience) => void;
  deleteExperience: (id: string) => void;
  // Scenarios
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  addScenario: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
  // Posts
  updatePost: (id: string, updates: Partial<Post>) => void;
  addPost: (post: Post) => void;
  deletePost: (id: string) => void;
  // Post Authors
  updatePostAuthor: (id: string, updates: Partial<PostAuthor>) => void;
  addPostAuthor: (author: PostAuthor) => void;
  deletePostAuthor: (id: string) => void;
  // Reviews
  updateReview: (id: string, updates: Partial<Review>) => void;
  addReview: (review: Review) => void;
  deleteReview: (id: string) => void;
  // Guest Stories
  updateGuestStory: (id: string, updates: Partial<GuestStory>) => void;
  addGuestStory: (story: GuestStory) => void;
  deleteGuestStory: (id: string) => void;
  // Membership
  updateMembershipTier: (id: string, updates: Partial<MembershipTier>) => void;
  // Footer
  updateFooter: (footer: Partial<FooterContent>) => void;
  // Utilities
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const CMSContext = createContext<CMSContextValue | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(loadFromStorage);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const update = useCallback((updater: (prev: CMSData) => CMSData) => {
    setData(prev => updater(prev));
  }, []);

  // Generic list CRUD helpers
  const updateItem = <T extends { id: string }>(
    key: keyof CMSData,
    id: string,
    updates: Partial<T>
  ) => {
    update(prev => ({
      ...prev,
      [key]: (prev[key] as unknown as T[]).map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const addItem = <T,>(key: keyof CMSData, item: T) => {
    update(prev => ({
      ...prev,
      [key]: [...(prev[key] as unknown as T[]), item]
    }));
  };

  const deleteItem = <T extends { id: string }>(key: keyof CMSData, id: string) => {
    update(prev => ({
      ...prev,
      [key]: (prev[key] as unknown as T[]).filter(item => item.id !== id)
    }));
  };

  const value: CMSContextValue = {
    data,
    // Hero
    updateHero: (hero) => update(prev => ({ ...prev, hero: { ...prev.hero, ...hero } })),
    // About
    updateAbout: (about) => update(prev => ({ ...prev, about: { ...prev.about, ...about } })),
    // Vehicle Categories
    updateVehicleCategory: (id, updates) => updateItem<VehicleCategory>("vehicleCategories", id, updates),
    addVehicleCategory: (cat) => addItem("vehicleCategories", cat),
    deleteVehicleCategory: (id) => deleteItem<VehicleCategory>("vehicleCategories", id),
    // Top Offers
    updateTopOffer: (id, updates) => updateItem<TopOffer>("topOffers", id, updates),
    addTopOffer: (offer) => addItem("topOffers", offer),
    deleteTopOffer: (id) => deleteItem<TopOffer>("topOffers", id),
    // Experiences
    updateExperience: (id, updates) => updateItem<Experience>("experiences", id, updates),
    addExperience: (exp) => addItem("experiences", exp),
    deleteExperience: (id) => deleteItem<Experience>("experiences", id),
    // Scenarios
    updateScenario: (id, updates) => updateItem<Scenario>("scenarios", id, updates),
    addScenario: (scenario) => addItem("scenarios", scenario),
    deleteScenario: (id) => deleteItem<Scenario>("scenarios", id),
    // Posts
    updatePost: (id, updates) => updateItem<Post>("posts", id, updates),
    addPost: (post) => addItem("posts", post),
    deletePost: (id) => deleteItem<Post>("posts", id),
    // Post Authors
    updatePostAuthor: (id, updates) => updateItem<PostAuthor>("postAuthors", id, updates),
    addPostAuthor: (author) => addItem("postAuthors", author),
    deletePostAuthor: (id) => deleteItem<PostAuthor>("postAuthors", id),
    // Reviews
    updateReview: (id, updates) => updateItem<Review>("reviews", id, updates),
    addReview: (review) => addItem("reviews", review),
    deleteReview: (id) => deleteItem<Review>("reviews", id),
    // Guest Stories
    updateGuestStory: (id, updates) => updateItem<GuestStory>("guestStories", id, updates),
    addGuestStory: (story) => addItem("guestStories", story),
    deleteGuestStory: (id) => deleteItem<GuestStory>("guestStories", id),
    // Membership
    updateMembershipTier: (id, updates) => updateItem<MembershipTier>("membershipTiers", id, updates),
    // Footer
    updateFooter: (footer) => update(prev => ({ ...prev, footer: { ...prev.footer, ...footer } })),
    // Utilities
    resetToDefaults: () => {
      setData(cmsDefaults);
      localStorage.removeItem(CMS_STORAGE_KEY);
    },
    exportData: () => JSON.stringify(data, null, 2),
    importData: (json: string) => {
      try {
        const parsed = JSON.parse(json);
        setData(deepMerge(cmsDefaults, parsed) as CMSData);
        return true;
      } catch {
        return false;
      }
    }
  };

  return <CMSContext.Provider value={value}>{children}</CMSContext.Provider>;
}

export function useCMS(): CMSContextValue {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error("useCMS must be used within CMSProvider");
  return ctx;
}
