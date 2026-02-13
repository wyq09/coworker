# Coworker Desktop

基于 Tauri + React 开发的 AI 助手桌面应用，采用 iOS 26 Liquid Glass 设计风格。

## 技术栈

### 前端
- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **TailwindCSS 4** - 原子化 CSS 框架
- **Vite** - 构建工具

### 后端
- **Tauri 2** - 桌面应用框架
- **Rust** - 后端逻辑

## 项目结构

```
coworker-desktop/
├── src/                     # React 前端代码
│   ├── components/          # UI 组件
│   │   ├── Button.tsx       # 按钮组件
│   │   ├── Card.tsx         # 卡片组件
│   │   ├── Input.tsx        # 输入框组件
│   │   ├── Modal.tsx        # 模态框组件
│   │   └── index.ts         # 组件导出
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useTheme.ts      # 主题管理
│   │   ├── useLocalStorage.ts # 本地存储
│   │   ├── useDebounce.ts   # 防抖节流
│   │   └── index.ts         # Hooks 导出
│   ├── services/            # API 服务
│   │   └── api.ts          # Tauri 命令封装
│   ├── styles/              # 全局样式
│   │   └── globals.css     # Liquid Glass 样式系统
│   ├── types/               # 类型定义
│   │   └── index.ts        # TypeScript 类型
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── src-tauri/              # Tauri 后端代码
│   ├── src/
│   │   ├── lib.rs          # Rust 后端逻辑
│   │   └── main.rs         # 入口文件
│   ├── Cargo.toml           # Rust 依赖
│   └── tauri.conf.json     # Tauri 配置
├── tailwind.config.js       # TailwindCSS 配置
├── postcss.config.js        # PostCSS 配置
└── package.json            # Node.js 依赖

```

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run tauri:dev
```

### 构建生产版本

```bash
npm run tauri:build
```

## 设计系统

### Liquid Glass 样式

项目采用 iOS 26 Liquid Glass 设计语言，核心特点：

- **玻璃态效果**：半透明背景 + 背景模糊
- **细腻边框**：微妙的透明边框增强质感
- **柔和阴影**：营造层次感
- **流畅动画**：符合人体工程学的过渡效果

### 核心类名

```tsx
// 玻璃效果容器
<div className="glass">...</div>

// 玻璃卡片
<div className="glass-card">...</div>

// 玻璃按钮
<button className="glass-button">...</button>

// 玻璃输入框
<input className="glass-input" />

// 渐变文字
<h1 className="gradient-text">标题</h1>

// 渐变背景
<div className="gradient-bg">...</div>
```

### 颜色系统

- **Primary**: `#6366F1` (Indigo)
- **Secondary**: `#8B5CF6` (Purple)
- **Accent**: `#EC4899` (Pink)

## Tauri 命令

### 已实现的命令

| 命令 | 说明 |
|------|------|
| `greet` | 问候命令（示例） |
| `send_message` | 发送消息 |
| `get_conversations` | 获取会话列表 |
| `create_conversation` | 创建新会话 |
| `delete_conversation` | 删除会话 |
| `get_settings` | 获取用户设置 |
| `update_settings` | 更新用户设置 |
| `export_data` | 导出数据 |
| `import_data` | 导入数据 |

## 配置

### 窗口配置

- **默认尺寸**: 1200 x 800
- **最小尺寸**: 900 x 600
- **可调整大小**: 是

### 应用信息

- **名称**: Coworker
- **版本**: 0.1.0
- **标识符**: com.wyq.coworker

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## License

MIT
