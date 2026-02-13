import { useEffect, useState } from 'react';
import type { ThemeMode } from '../types';

/**
 * 主题 Hook
 * 用于管理应用的主题切换
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // 从 localStorage 读取保存的主题设置
    const saved = localStorage.getItem('theme') as ThemeMode;
    if (saved) return saved;

    // 检测系统主题偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    // 移除之前的主题类
    root.classList.remove('light', 'dark');

    // 应用新主题
    if (theme === 'auto') {
      // 自动模式：根据系统偏好切换
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }

    // 保存到 localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 监听系统主题变化
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, setTheme };
}
