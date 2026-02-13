import { test, expect } from '@playwright/test';

/**
 * E2E 测试示例文件
 *
 * 注意: 这些测试用于 Web 环境
 * 对于完整的 Tauri 桌面应用测试，需要使用 @tauri-apps/plugin-playwright
 */

test.describe('应用启动测试', () => {
  test('应该加载主页面', async ({ page }) => {
    await page.goto('/');

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 检查页面标题
    await expect(page).toHaveTitle(/Coworker/i);
  });

  test('应该渲染主要 UI 元素', async ({ page }) => {
    await page.goto('/');

    // 等待应用初始化
    await page.waitForSelector('body', { timeout: 10000 });

    // 检查是否有主要内容区域
    const mainContent = page.locator('main, #root, [role="main"]');
    await expect(mainContent.first()).toBeVisible();
  });
});

test.describe('基本交互测试', () => {
  test('应该能够点击按钮', async ({ page }) => {
    await page.goto('/');

    // 查找可点击的按钮
    const button = page.locator('button').first();

    if (await button.isVisible()) {
      await button.click();
      // 验证点击后的状态（具体检查根据实际应用调整）
    }
  });

  test('应该能够输入文本', async ({ page }) => {
    await page.goto('/');

    // 查找输入框
    const input = page.locator('input[type="text"], textarea').first();

    if (await input.isVisible()) {
      await input.fill('Test input');
      await expect(input).toHaveValue('Test input');
    }
  });
});

test.describe('Tauri API 交互测试', () => {
  test('应该能够调用 Tauri 命令', async ({ page }) => {
    await page.goto('/');

    // 监听控制台消息
    const consoleMessages: string[] = [];
    page.on('console', (msg) => {
      consoleMessages.push(msg.text());
    });

    // 触发需要 Tauri API 的操作
    // 具体操作根据实际应用调整

    // 验证控制台没有错误
    await page.waitForTimeout(1000);
    const errors = consoleMessages.filter((msg) =>
      msg.toLowerCase().includes('error')
    );
    expect(errors.length).toBe(0);
  });
});

test.describe('响应式测试', () => {
  test('应该适应不同窗口大小', async ({ page }) => {
    await page.goto('/');

    // 测试桌面尺寸
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();

    // 测试较小窗口
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('body')).toBeVisible();

    // 测试最小尺寸
    await page.setViewportSize({ width: 800, height: 600 });
    await expect(page.locator('body')).toBeVisible();
  });
});
