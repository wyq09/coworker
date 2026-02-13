import { test, expect } from '@playwright/test';

/**
 * Tauri 桌面应用专用 E2E 测试
 *
 * 这些测试需要在实际运行的应用中进行
 * 使用方法：
 * 1. 先启动 Tauri 应用: npm run tauri:dev
 * 2. 运行测试: npm run test:e2e
 */

test.describe('Tauri 应用窗口测试', () => {
  test.beforeEach(async ({ page }) => {
    // 等待应用完全启动
    page.goto('http://localhost:1420');
    await page.waitForLoadState('domcontentloaded');
  });

  test('应用窗口应该有正确的尺寸', async ({ page }) => {
    // 获取窗口尺寸
    const dimensions = await page.evaluate(() => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    });

    // 验证窗口尺寸合理
    expect(dimensions.width).toBeGreaterThan(800);
    expect(dimensions.height).toBeGreaterThan(600);
  });

  test('应该能够访问 Tauri API', async ({ page }) => {
    // 检查 __TAURI__ 对象是否存在
    const hasTauriAPI = await page.evaluate(() => {
      return typeof window.__TAURI__ !== 'undefined';
    });

    if (hasTauriAPI) {
      // 测试基本的 Tauri API 调用
      const appVersion = await page.evaluate(async () => {
        try {
          const { getVersion } = await import('@tauri-apps/api/app');
          return await getVersion();
        } catch {
          return null;
        }
      });

      console.log('App version:', appVersion);
    }
  });

  test('应该能够使用 Tauri 事件系统', async ({ page }) => {
    const hasTauriAPI = await page.evaluate(() => {
      return typeof window.__TAURI__ !== 'undefined';
    });

    if (hasTauriAPI) {
      // 监听自定义事件
      const eventReceived = await page.evaluate(async () => {
        try {
          const { listen } = await import('@tauri-apps/api/event');
          let received = false;

          const unlisten = await listen('test-event', () => {
            received = true;
          });

          // 发送测试事件
          const { emit } = await import('@tauri-apps/api/event');
          await emit('test-event', { data: 'test' });

          // 等待事件处理
          await new Promise((resolve) => setTimeout(resolve, 100));

          unlisten();
          return received;
        } catch {
          return false;
        }
      });

      expect(eventReceived).toBe(true);
    }
  });
});

test.describe('文件系统访问测试', () => {
  test('应该能够使用文件对话框', async ({ page }) => {
    await page.goto('http://localhost:1420');

    // 这个测试需要应用中有文件选择功能
    // 根据实际应用调整选择器和验证逻辑

    // 示例: 点击文件选择按钮
    // const fileButton = page.locator('button:has-text("选择文件")');
    // if (await fileButton.isVisible()) {
    //   // 注意: Playwright 在桌面应用中处理文件对话框可能有限制
    //   // 可能需要使用 Tauri 的 mock 功能
    // }
  });
});

test.describe('本地存储测试', () => {
  test('应该能够使用本地存储', async ({ page }) => {
    await page.goto('http://localhost:1420');

    // 设置测试数据
    await page.evaluate(() => {
      localStorage.setItem('test-key', 'test-value');
    });

    // 刷新页面
    await page.reload();

    // 验证数据持久化
    const storedValue = await page.evaluate(() => {
      return localStorage.getItem('test-key');
    });

    expect(storedValue).toBe('test-value');

    // 清理
    await page.evaluate(() => {
      localStorage.removeItem('test-key');
    });
  });
});

test.describe('应用生命周期测试', () => {
  test('应该正确处理窗口焦点', async ({ page }) => {
    await page.goto('http://localhost:1420');

    // 模拟窗口失焦和聚焦
    await page.evaluate(() => {
      window.dispatchEvent(new Event('blur'));
    });

    await page.waitForTimeout(100);

    await page.evaluate(() => {
      window.dispatchEvent(new Event('focus'));
    });

    // 验证应用仍然响应
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
