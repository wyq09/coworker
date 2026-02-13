/**
 * 测试辅助函数
 * 常用的测试工具函数
 */

import { RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * 等待元素出现
 */
export const waitForElement = async (
  getBy: (...args: any[]) => HTMLElement,
  selector: string,
  timeout = 3000
) => {
  return waitFor(
    () => {
      const element = getBy(selector);
      if (element) return element;
      throw new Error(`Element ${selector} not found`);
    },
    { timeout }
  );
};

/**
 * 等待元素消失
 */
export const waitForElementToBeRemoved = async (
  queryBy: (...args: any[]) => HTMLElement | null,
  selector: string,
  timeout = 3000
) => {
  return waitFor(
    () => {
      const element = queryBy(selector);
      if (!element) return;
      throw new Error(`Element ${selector} still exists`);
    },
    { timeout }
  );
};

/**
 * 输入文本并验证
 */
export const typeText = async (
  input: HTMLElement,
  text: string,
  options?: { delay?: number }
) => {
  const user = userEvent.setup(options);
  await user.clear(input);
  await user.type(input, text);
  return input;
};

/**
 * 点击并等待回调
 */
export const clickAndWait = async (
  element: HTMLElement,
  callback: () => void | Promise<void>
) => {
  const user = userEvent.setup();
  await user.click(element);
  await waitFor(() => expect(callback).toHaveBeenCalled());
};

/**
 * 模拟文件选择
 */
export const selectFile = (input: HTMLInputElement, file: File) => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  input.files = dataTransfer.files;

  // 触发 change 事件
  const event = new Event('change', { bubbles: true });
  input.dispatchEvent(event);
};

/**
 * 创建 Mock 文件
 */
export const createMockFile = (
  name: string,
  size: number,
  type: string
): File => {
  const file = new File(['mock content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

/**
 * 等待异步操作完成
 */
export const waitForAsync = async (
  fn: () => void | Promise<void>,
  timeout = 3000
) => {
  return waitFor(fn, { timeout });
};

/**
 * 模拟延迟
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 模拟 API 请求延迟
 */
export const mockApiDelay = async (ms = 100) => {
  await delay(ms);
};

/**
 * 检查元素是否可见
 */
export const isElementVisible = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.offsetParent !== null
  );
};

/**
 * 检查元素是否有特定类名
 */
export const hasClass = (element: HTMLElement, className: string): boolean => {
  return element.classList.contains(className);
};

/**
 * 获取元素的文本内容（去除空白）
 */
export const getCleanText = (element: HTMLElement): string => {
  return element.textContent?.trim() || '';
};

/**
 * 模拟键盘事件
 */
export const pressKey = async (key: string, element?: HTMLElement) => {
  const user = userEvent.setup();
  if (element) {
    element.focus();
    await user.keyboard(key);
  } else {
    await user.keyboard(key);
  }
};

/**
 * 模拟 Tab 键导航
 */
export const pressTab = async (count = 1) => {
  for (let i = 0; i < count; i++) {
    await pressKey('{Tab}');
  }
};

/**
 * 模拟 Enter 键
 */
export const pressEnter = async () => {
  await pressKey('{Enter}');
};

/**
 * 模拟 Escape 键
 */
export const pressEscape = async () => {
  await pressKey('{Escape}');
};

/**
 * 获取表单数据
 */
export const getFormData = (form: HTMLFormElement): Record<string, string> => {
  const formData = new FormData(form);
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });
  return data;
};

/**
 * 填写表单
 */
export const fillForm = async (
  form: HTMLFormElement,
  data: Record<string, string>
) => {
  const user = userEvent.setup();

  for (const [name, value] of Object.entries(data)) {
    const input = form.elements.namedItem(name) as HTMLInputElement;
    if (input) {
      await user.clear(input);
      await user.type(input, value);
    }
  }
};

/**
 * 创建可取消的 Promise
 */
export const createCancellablePromise = <T>(
  promise: Promise<T>,
  signal?: AbortSignal
): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new Error('Promise was cancelled'));
      return;
    }

    const abortHandler = () => {
      reject(new Error('Promise was cancelled'));
    };

    signal?.addEventListener('abort', abortHandler);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => {
        signal?.removeEventListener('abort', abortHandler);
      });
  });
};

/**
 * 创建可重试的 Promise
 */
export const createRetryablePromise = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 100
): Promise<T> => {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await delay(delayMs * (i + 1));
      }
    }
  }

  throw lastError;
};

/**
 * Mock Intersection Observer
 */
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

/**
 * Mock Resize Observer
 */
export const mockResizeObserver = () => {
  const mockResizeObserver = vi.fn();
  mockResizeObserver.mockReturnValue({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  });
  window.ResizeObserver = mockResizeObserver;
  return mockResizeObserver;
};
