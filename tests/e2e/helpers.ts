/**
 * E2E 测试辅助函数
 */

import { Page, Locator, expect } from '@playwright/test';

/**
 * 等待应用完全加载
 */
export const waitForAppReady = async (page: Page, timeout = 30000) => {
  await page.waitForLoadState('domcontentloaded', { timeout });
  await page.waitForTimeout(500); // 额外等待确保 JS 执行完成
};

/**
 * 等待并点击元素
 */
export const waitAndClick = async (
  page: Page,
  selector: string,
  timeout = 10000
) => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await element.click();
};

/**
 * 等待并输入文本
 */
export const waitAndType = async (
  page: Page,
  selector: string,
  text: string,
  timeout = 10000
) => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
  await element.fill(text);
};

/**
 * 获取元素文本内容
 */
export const getTextContent = async (
  page: Page,
  selector: string
): Promise<string> => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'attached' });
  return (await element.textContent()) || '';
};

/**
 * 检查元素是否存在
 */
export const elementExists = async (
  page: Page,
  selector: string
): Promise<boolean> => {
  const element = page.locator(selector);
  return await element.count().then((count) => count > 0);
};

/**
 * 等待元素出现
 */
export const waitForElement = async (
  page: Page,
  selector: string,
  timeout = 10000
) => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible', timeout });
};

/**
 * 等待元素消失
 */
export const waitForElementToDisappear = async (
  page: Page,
  selector: string,
  timeout = 10000
) => {
  const element = page.locator(selector);
  await element.waitFor({ state: 'hidden', timeout });
};

/**
 * 截图并保存
 */
export const takeScreenshot = async (
  page: Page,
  name: string,
  fullPage = false
) => {
  await page.screenshot({
    path: `test-results/screenshots/${name}.png`,
    fullPage,
  });
};

/**
 * 登录辅助函数
 */
export const login = async (
  page: Page,
  email: string,
  password: string
) => {
  await waitAndType(page, 'input[name="email"]', email);
  await waitAndType(page, 'input[name="password"]', password);
  await waitAndClick(page, 'button[type="submit"]');

  // 等待登录完成（跳转到首页或显示成功消息）
  await page.waitForURL(/\/(dashboard|home|$)/);
};

/**
 * 导航到指定路径
 */
export const navigateTo = async (page: Page, path: string) => {
  await page.goto(path);
  await waitForAppReady(page);
};

/**
 * 等待加载动画消失
 */
export const waitForLoadingToFinish = async (
  page: Page,
  timeout = 30000
) => {
  const loadingSelector = '[data-testid="loading"], .loading, [role="status"]';

  // 等待加载元素出现然后消失
  try {
    const loading = page.locator(loadingSelector);
    await loading.waitFor({ state: 'attached', timeout: 5000 });
    await loading.waitFor({ state: 'detached', timeout });
  } catch {
    // 如果没有加载元素，直接继续
  }
};

/**
 * 获取 Toast 消息
 */
export const getToastMessage = async (page: Page): Promise<string> => {
  const toast = page.locator('[role="alert"], .toast, .notification');
  await toast.waitFor({ state: 'visible' });
  return (await toast.textContent()) || '';
};

/**
 * 模拟文件上传
 */
export const uploadFile = async (
  page: Page,
  inputSelector: string,
  filePath: string
) => {
  const fileInput = page.locator(inputSelector);
  await fileInput.setInputFiles(filePath);
};

/**
 * 获取本地存储数据
 */
export const getLocalStorage = async (
  page: Page,
  key: string
): Promise<string | null> => {
  return await page.evaluate((k) => localStorage.getItem(k), key);
};

/**
 * 设置本地存储数据
 */
export const setLocalStorage = async (
  page: Page,
  key: string,
  value: string
) => {
  await page.evaluate(
    ({ k, v }) => localStorage.setItem(k, v),
    { k: key, v: value }
  );
};

/**
 * 清除本地存储
 */
export const clearLocalStorage = async (page: Page) => {
  await page.evaluate(() => localStorage.clear());
};

/**
 * 获取会话存储数据
 */
export const getSessionStorage = async (
  page: Page,
  key: string
): Promise<string | null> => {
  return await page.evaluate((k) => sessionStorage.getItem(k), key);
};

/**
 * 模拟键盘输入快捷键
 */
export const pressShortcut = async (page: Page, keys: string[]) => {
  for (const key of keys) {
    await page.keyboard.press(key);
  }
};

/**
 * 拖拽元素
 */
export const dragAndDrop = async (
  page: Page,
  selector: string,
  targetSelector: string
) => {
  const element = page.locator(selector);
  const target = page.locator(targetSelector);

  await element.dragTo(target);
};

/**
 * 切换主题
 */
export const toggleTheme = async (page: Page) => {
  const themeToggle = page.locator(
    '[data-testid="theme-toggle"], .theme-toggle, button[aria-label*="theme"]'
  );

  if (await themeToggle.isVisible()) {
    await themeToggle.click();
  }
};

/**
 * 打开侧边栏/抽屉
 */
export const openSidebar = async (page: Page) => {
  const sidebarToggle = page.locator(
    '[data-testid="sidebar-toggle"], .sidebar-toggle, button[aria-label*="menu"]'
  );

  if (await sidebarToggle.isVisible()) {
    await sidebarToggle.click();
  }
};

/**
 * 关闭模态框/对话框
 */
export const closeModal = async (page: Page) => {
  const closeButton = page.locator(
    '[role="dialog"] button[aria-label="close"], .modal-close, [data-testid="close-modal"]'
  );

  if (await closeButton.isVisible()) {
    await closeButton.click();
  }

  // 或者按 ESC 键
  await page.keyboard.press('Escape');
};
