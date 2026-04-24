import { ref, computed } from 'vue';
import { applyTheme } from '../utils/theme';
import type { ColorPalette, ThemeConfig } from '../types/config';
import { useTheme } from './useTheme';

const getInitialTheme = (): ThemeConfig => {
  const { nuxtail: appConfig } = useAppConfig();
  return {
    defaultTheme: appConfig.theme.defaultTheme,
    light: { ...appConfig.theme.light },
    dark: { ...appConfig.theme.dark },
  };
};

const customColors = ref<ThemeConfig | null>(null);

export const useColorCustomizer = () => {
  const { theme } = useTheme();

  if (!customColors.value) {
    customColors.value = getInitialTheme();
  }

  const updateColor = (
    colorKey: keyof ColorPalette,
    value: string,
    themeMode: 'light' | 'dark' = theme.value
  ) => {
    if (!customColors.value) return;
    const colorValue = value.startsWith('#') || value.startsWith('rgb') ? value : `#${value}`;
    (customColors.value[themeMode] as any)[colorKey] = colorValue;
    applyTheme(customColors.value);
  };

  const resetColors = () => {
    customColors.value = getInitialTheme();
    applyTheme(customColors.value);
  };

  return {
    colors: computed(() => customColors.value),
    updateColor,
    resetColors,
  };
};
