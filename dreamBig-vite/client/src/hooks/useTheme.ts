import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  isLoading: boolean;
  setTheme: (theme: Theme) => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Get saved theme from localStorage
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      
      // Detect system preference
      const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      
      // Use saved theme or fall back to system preference
      const initialTheme = savedTheme || systemTheme;
      
      setThemeState(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    } catch (error) {
      console.warn('Failed to load theme:', error);
      // Fallback to light theme if there's an error
      setThemeState('light');
      document.documentElement.classList.toggle('dark', false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme, setTheme]);

  return { 
    theme, 
    toggleTheme, 
    isLoading, 
    setTheme 
  };
};
