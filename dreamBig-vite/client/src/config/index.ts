import { config } from "./config";

// Apply colors from config on app start
if (typeof window !== 'undefined') {
  const colors = config.colors;
  const root = document.documentElement;
  
  // Set CSS variables from config
  const setColors = () => {
    const isDark = root.classList.contains('dark');
    
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
    
    root.style.setProperty('--background', isDark ? colors.background.dark : colors.background.light);
    root.style.setProperty('--foreground', isDark ? colors.foreground.dark : colors.foreground.light);
    root.style.setProperty('--border', isDark ? colors.border.dark : colors.border.light);
    root.style.setProperty('--card', isDark ? colors.card.dark : colors.card.light);
    root.style.setProperty('--card-foreground', isDark ? colors.cardForeground.dark : colors.cardForeground.light);
    root.style.setProperty('--card-border', isDark ? colors.cardBorder.dark : colors.cardBorder.light);
    root.style.setProperty('--muted', isDark ? colors.muted.dark : colors.muted.light);
    root.style.setProperty('--muted-foreground', isDark ? colors.mutedForeground.dark : colors.mutedForeground.light);
  };
  
  // Apply on load
  setColors();
  
  // Update when dark mode toggles
  new MutationObserver(setColors).observe(root, {
    attributes: true,
    attributeFilter: ['class']
  });
}

// Re-export config and types
export { config };
export type { SiteConfig } from "./types";
