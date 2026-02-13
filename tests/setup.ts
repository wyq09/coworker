import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// 扩展 Vitest 的 expect 断言
expect.extend(matchers);

// 每个测试后清理 React 组件
afterEach(() => {
  cleanup();
});

// Mock Tauri API
vi.mock('@tauri-apps/api/core', async () => {
  const actual = await vi.importActual('@tauri-apps/api/core');
  return {
    ...actual,
    invoke: vi.fn(),
  };
});

vi.mock('@tauri-apps/api/window', async () => {
  const actual = await vi.importActual('@tauri-apps/api/window');
  return {
    ...actual,
    getCurrentWindow: vi.fn(() => ({
      label: 'main',
      title: 'Coworker',
      close: vi.fn(),
      minimize: vi.fn(),
      maximize: vi.fn(),
      unmaximize: vi.fn(),
      isMaximized: vi.fn(),
      isMinimized: vi.fn(),
      onFocusChanged: vi.fn(),
      onResized: vi.fn(),
      onThemeChanged: vi.fn(),
    })),
  };
});

// Mock window.__TAURI__ 对象（用于 Tauri v2）
Object.defineProperty(window, '__TAURI__', {
  value: {
    core: {
      invoke: vi.fn(),
    },
    window: {
      getCurrentWindow: vi.fn(),
    },
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
