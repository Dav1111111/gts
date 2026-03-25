/**
 * 🎨 GTS Theme Utilities
 * Theme utilities for GTS design system
 */

export const GTSThemeClasses = {
  forceTheme: 'dark',
  container: 'min-h-screen bg-background text-foreground dark',
  page: 'bg-background text-foreground dark',
  surface: 'bg-card text-card-foreground dark',
  card: 'bg-card text-card-foreground border dark',
  heading: 'text-foreground font-[var(--font-heading)] dark',
  text: 'text-foreground font-[var(--font-body)] dark',
  muted: 'text-muted-foreground font-[var(--font-body)] dark',
  input: 'bg-input text-foreground border placeholder:text-muted-foreground dark',
  button: 'bg-accent text-accent-foreground hover:bg-accent/90 dark',
  buttonSecondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border dark',
  accent: 'text-accent dark',
  accentBg: 'bg-accent text-accent-foreground dark',
  border: 'border dark',
} as const;

export const getGTSThemeStyles = () => ({});

export const applyGTSDarkTheme = (element: HTMLElement) => {
  if (!element) return;
  element.classList.add('dark');
};

export const useGTSTheme = () => {
  const applyTheme = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      applyGTSDarkTheme(ref.current);
    }
  };
  
  return { applyTheme, themeStyles: {}, classes: GTSThemeClasses };
};

export const GTSForcedComponents = GTSThemeClasses;
export const GTSInlineStyles = {
  page: {},
  card: {},
  heading: {},
  text: {},
  input: {},
  button: {},
} as const;