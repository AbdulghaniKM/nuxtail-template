import type { ThemeConfig, ColorPalette } from '../types/config';

export type { ColorPalette };

export const generateCSSVariables = (theme: ThemeConfig): string => {
  const lightVars = generateColorVariables(theme.light);
  const darkVars = generateColorVariables(theme.dark);

  return `
    :root {
      ${lightVars}
    }

    [data-theme="dark"] {
      ${darkVars}
    }

    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        ${darkVars}
      }
    }
  `;
};

const camelToKebab = (str: string): string =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const generateColorVariables = (palette: ColorPalette): string => {
  return Object.entries(palette)
    .filter(([, value]) => value)
    .map(([key, value]) => `  --color-${camelToKebab(key)}: ${value};`)
    .join('\n');
};

export const applyTheme = (theme: ThemeConfig): void => {
  if (typeof document === 'undefined') return;
  const styleId = 'app-theme-variables';
  let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = generateCSSVariables(theme);
};

let transitionTimer: ReturnType<typeof setTimeout> | null = null;

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const applyThemeToDOM = (theme: 'light' | 'dark' | 'system'): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.classList.add('theme-switching');
  if (transitionTimer) clearTimeout(transitionTimer);
  transitionTimer = setTimeout(() => {
    root.classList.remove('theme-switching');
    transitionTimer = null;
  }, 300);

  if (theme === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
};

export const getColorValue = (colorKey: keyof ColorPalette): string => {
  return `var(--color-${camelToKebab(colorKey)})`;
};
