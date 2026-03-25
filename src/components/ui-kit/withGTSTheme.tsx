/**
 * 🎨 GTS Theme Utilities
 * Utilities for applying GTS theme to components
 */

import React from 'react';

// Simplified utility that's kept for compatibility
export const withGTSTheme = <T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>
) => WrappedComponent;

// Simplified hooks and utilities
export const useGTSThemeStyles = () => ({
  styles: {},
  classes: 'dark'
});

// This file is kept for compatibility but theming is now handled by CSS variables and the dark class