import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Playwright 配置用于 Coworker 桌面应用的 E2E 测试
 *
 * 注意: Tauri 应用需要特殊配置
 * 使用 @tauri-apps/plugin-playwright 获得更好的支持
 */
export default defineConfig({
  // 测试文件位置
  testDir: './tests/e2e',

  // 完全并行运行每个测试文件
  fullyParallel: false,

  // 在 CI 中失败时不重试
  // 对于桌面应用测试，重试可能会有帮助
  retries: process.env.CI ? 2 : 0,

  // 在 CI 中使用并行工作线程
  // 对于桌面应用，建议设为 1
  workers: 1,

  // 测试超时时间（桌面应用可能需要更长的启动时间）
  timeout: 60 * 1000,

  // 每个测试的超时
  expect: {
    timeout: 10 * 1000,
  },

  // 失败时生成报告
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  // 共享设置
  use: {
    // 基础 URL
    // 对于 Tauri 应用，使用 localhost:dev 端口
    baseURL: 'http://localhost:1420',

    // 收集失败测试的追踪信息
    trace: 'on-first-retry',

    // 截图配置
    screenshot: 'only-on-failure',

    // 视频配置
    video: 'retain-on-failure',

    // 操作超时
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

  // 配置多个项目
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Firefox 暂时不支持，因为 Tauri WebView 基于 Chromium
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // WebKit 暂时不支持
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // 在测试前运行开发服务器
  webServer: {
    command: 'npm run tauri:dev',
    url: 'http://localhost:1420',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // 输出目录
  outputDir: 'test-results/artifacts',
});
