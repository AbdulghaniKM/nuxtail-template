import { ref, computed, onMounted } from 'vue';
import {
  applyThemeToDOM,
  getSystemTheme,
  getColorValue,
} from '../utils/theme';
import type { ColorPalette } from '../types/config';

type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'app-theme';

export const useTheme = () => {
  const { nuxtail: appConfig } = useAppConfig();
  const themeMode = ref<ThemeMode>('system');
  const currentTheme = ref<'light' | 'dark'>('light');

  const isDark = computed(() => currentTheme.value === 'dark');
  const isLight = computed(() => currentTheme.value === 'light');

  const setTheme = (theme: ThemeMode) => {
    themeMode.value = theme;
    if (typeof localStorage !== 'undefined') {
      if (theme === 'system') {
        localStorage.removeItem(STORAGE_KEY);
        currentTheme.value = getSystemTheme();
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
        currentTheme.value = theme;
      }
    }
    applyThemeToDOM(theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const getColor = (colorKey: keyof ColorPalette): string => {
    return getColorValue(colorKey);
  };

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const initialMode = stored || appConfig.theme.defaultTheme || 'system';
    setTheme(initialMode);

    if (themeMode.value === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (themeMode.value === 'system') {
          currentTheme.value = e.matches ? 'dark' : 'light';
          applyThemeToDOM('system');
        }
      };
      mediaQuery.addEventListener('change', handleChange);
    }
  });

  return {
    theme: currentTheme,
    mode: themeMode,
    isDark,
    isLight,
    toggleTheme,
    setTheme,
    getColor,
  };
};
