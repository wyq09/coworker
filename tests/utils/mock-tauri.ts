/**
 * Tauri API Mock 工具
 * 用于模拟 Tauri 后端命令和窗口功能
 */

import { invoke } from '@tauri-apps/api/core';
import { emit, listen } from '@tauri-apps/api/event';
import { vi } from 'vitest';

/**
 * 创建 Tauri 命令 Mock
 */
export const createTauriCommandMock = <T extends unknown[], R>(
  commandName: string,
  returnValue?: R | Promise<R>
) => {
  const mockFn = vi.fn<typeof invoke<R>>(
    async (cmd: string, args?: T) => {
      if (cmd !== commandName) {
        throw new Error(`Unexpected command: ${cmd}`);
      }
      return returnValue as R;
    }
  );

  return {
    mock: mockFn,
    // 便捷方法：设置返回值
    withReturnValue: (value: R | Promise<R>) => {
      mockFn.mockResolvedValueOnce(value);
    },
    // 便捷方法：设置错误
    withError: (error: Error | string) => {
      mockFn.mockRejectedValueOnce(
        error instanceof Error ? error : new Error(error)
      );
    },
  };
};

/**
 * Mock 窗口管理器
 */
export const mockWindowManager = {
  currentWindow: {
    label: 'main',
    title: 'Coworker',
    close: vi.fn(),
    minimize: vi.fn(),
    maximize: vi.fn(),
    unmaximize: vi.fn(),
    isMaximized: vi.fn().mockResolvedValue(false),
    isMinimized: vi.fn().mockResolvedValue(false),
    setAlwaysOnTop: vi.fn(),
    setSkipTaskbar: vi.fn(),
    setTitle: vi.fn(),
    center: vi.fn(),
    requestUserAttention: vi.fn(),
  },
};

/**
 * Mock 文件系统对话框
 */
export const mockFileDialog = {
  open: vi.fn().mockResolvedValue(null),
  save: vi.fn().mockResolvedValue(null),
  // 多选文件
  openMultiple: vi.fn().mockResolvedValue([]),
};

/**
 * Mock 通知系统
 */
export const mockNotification = {
  send: vi.fn(),
  requestPermission: vi.fn().mockResolvedValue(true),
  isPermissionGranted: vi.fn().mockResolvedValue(true),
};

/**
 * 创建预设的 Mock 数据工厂
 */
export const mockDataFactory = {
  // Mock 用户数据
  user: (overrides = {}) => ({
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    avatar: null,
    createdAt: new Date().toISOString(),
    ...overrides,
  }),

  // Mock 工作区数据
  workspace: (overrides = {}) => ({
    id: 'workspace-1',
    name: 'Test Workspace',
    description: 'A test workspace',
    ownerId: '1',
    members: [],
    createdAt: new Date().toISOString(),
    ...overrides,
  }),

  // Mock 会议数据
  meeting: (overrides = {}) => ({
    id: 'meeting-1',
    title: 'Test Meeting',
    description: 'A test meeting',
    workspaceId: 'workspace-1',
    createdBy: '1',
    startTime: new Date().toISOString(),
    duration: 60,
    participants: [],
    ...overrides,
  }),
};

/**
 * 清理所有 Tauri Mocks
 */
export const clearTauriMocks = () => {
  vi.clearAllMocks();
};
