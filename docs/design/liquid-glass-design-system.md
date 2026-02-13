# Coworker 桌面应用设计规范
# iOS 26 Liquid Glass 设计系统

> 基于 Apple Liquid Glass 设计语言的桌面应用设计规范
> 版本: 1.0.0
> 更新日期: 2026-02-13

---

## 目录

1. [设计原则](#设计原则)
2. [色彩系统](#色彩系统)
3. [字体规范](#字体规范)
4. [毛玻璃效果](#毛玻璃效果)
5. [组件样式](#组件样式)
6. [布局与间距](#布局与间距)
7. [界面设计](#界面设计)
8. [交互规范](#交互规范)
9. [无障碍设计](#无障碍设计)
10. [技术实现](#技术实现)

---

## 设计原则

### Liquid Glass 核心特征

基于 Apple iOS 26 Liquid Glass 设计系统，coworker 遵循以下核心原则：

#### 1. 毛玻璃/液体玻璃效果
- 半透明、模糊背景的控件层
- 内容透过控制层隐约可见
- 创造深度感和层次感

#### 2. 控件层次分明
- **内容层**：主要信息展示区域
- **控制层**：半透明的工具栏、按钮
- 品牌色透过控件层显示

#### 3. 边缘到边缘内容
- 最大化内容显示区域
- 消除不必要的边框和分割线
- 工具栏悬浮于内容之上

#### 4. 底部工具栏
- 主要控件从顶部移到底部
- 更符合人体工程学
- 便于单手操作

#### 5. 更大、更舒适的交互目标
- 增大点击区域
- 增加组件间距
- 提升操作舒适度

---

## 色彩系统

### 主题色 (Brand Colors)

```css
/* 亮色模式 */
--brand-primary: #5E5CE6;        /* Coworker 紫色 - iOS 风格 */
--brand-secondary: #0A84FF;      /* 强调蓝 */
--brand-accent: #30D158;         /* 成功绿 */

/* 暗色模式 */
--brand-primary-dark: #747AFF;
--brand-secondary-dark: #409CFF;
--brand-accent-dark: #32D74B;
```

### 语义色 (Semantic Colors)

```css
/* 功能色 - 亮色模式 */
--color-success: #30D158;
--color-warning: #FF9F0A;
--color-error: #FF453A;
--color-info: #64D2FF;

/* 功能色 - 暗色模式 */
--color-success-dark: #32D74B;
--color-warning-dark: #FFD60A;
--color-error-dark: #FF6961;
--color-info-dark: #6AC0FF;
```

### 背景色 (Background Colors)

```css
/* 亮色模式 */
--bg-primary: rgba(255, 255, 255, 0.85);      /* 主背景 - 半透明白 */
--bg-secondary: rgba(242, 242, 247, 0.75);   /* 次级背景 */
--bg-tertiary: rgba(229, 229, 234, 0.65);     /* 三级背景 */
--bg-elevated: rgba(255, 255, 255, 0.95);     /* 浮层背景 */

/* 暗色模式 */
--bg-primary-dark: rgba(30, 30, 30, 0.85);
--bg-secondary-dark: rgba(44, 44, 46, 0.75);
--bg-tertiary-dark: rgba(58, 58, 60, 0.65);
--bg-elevated-dark: rgba(44, 44, 46, 0.95);
```

### 文本色 (Text Colors)

```css
/* 亮色模式 */
--text-primary: rgba(0, 0, 0, 0.85);         /* 主要文本 */
--text-secondary: rgba(60, 60, 67, 0.70);     /* 次要文本 */
--text-tertiary: rgba(60, 60, 67, 0.45);     /* 三级文本 */
--text-placeholder: rgba(60, 60, 67, 0.30);  /* 占位符 */

/* 暗色模式 */
--text-primary-dark: rgba(255, 255, 255, 0.90);
--text-secondary-dark: rgba(235, 235, 245, 0.60);
--text-tertiary-dark: rgba(235, 235, 245, 0.40);
--text-placeholder-dark: rgba(235, 235, 245, 0.25);
```

### AI 对话专用色

```css
/* 用户消息 */
--user-message-bg: #5E5CE6;
--user-message-text: #FFFFFF;

/* AI 消息 */
--ai-message-bg: rgba(242, 242, 247, 0.85);
--ai-message-text: rgba(0, 0, 0, 0.85);

/* 代码块 */
--code-bg: rgba(44, 44, 46, 0.95);
--code-header: rgba(58, 58, 60, 0.90);
```

---

## 字体规范

### 字体族

```css
/* 系统字体栈 - 优先使用 Apple 系统字体 */
--font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
               "SF Pro Display", "Segoe UI", "Helvetica Neue", Arial,
               "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;

/* 代码字体 */
--font-family-mono: "SF Mono", "Menlo", "Monaco", "Courier New", monospace;
```

### 字号系统

```css
/* 显示字体 */
--font-size-large-title: 34px;      /* 大标题 - 稀少使用 */
--font-size-title1: 28px;           /* 一级标题 */
--font-size-title2: 22px;           /* 二级标题 */
--font-size-title3: 20px;           /* 三级标题 */

/* 正文字体 */
--font-size-headline: 17px;         /* 强调文本/小标题 */
--font-size-body: 15px;             /* 正文 */
--font-size-callout: 14px;          /* 辅助文本 */
--font-size-subheadline: 13px;      /* 次级文本 */
--font-size-footnote: 12px;         /* 注释 */
--font-size-caption1: 11px;         /* 说明 */
--font-size-caption2: 10px;         /* 小说明 */

/* 代码字体 */
--font-size-code: 13px;             /* 代码正文 */
```

### 字重

```css
--font-weight-regular: 400;         /* 常规 */
--font-weight-medium: 500;          /* 中等 - 推荐 */
--font-weight-semibold: 600;        /* 半粗 */
--font-weight-bold: 700;            /* 粗体 */
```

### 行高

```css
--line-height-tight: 1.2;           /* 紧凑 - 标题 */
--line-height-normal: 1.4;          /* 正常 - 正文 */
--line-height-relaxed: 1.6;         /* 宽松 - 长文本 */
```

---

## 毛玻璃效果

### 核心 CSS 实现

```css
/* Liquid Glass 基础效果 */
.liquid-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 高强度毛玻璃 - 工具栏 */
.liquid-glass-strong {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(60px) saturate(200%);
  -webkit-backdrop-filter: blur(60px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

/* 轻度毛玻璃 - 卡片 */
.liquid-glass-light {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

/* 暗色模式毛玻璃 */
.liquid-glass-dark {
  background: rgba(30, 30, 30, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 毛玻璃强度等级

| 等级 | 用途 | 模糊度 | 饱和度 | 不透明度 |
|------|------|--------|--------|----------|
| Light | 次要卡片、预览 | 20px | 150% | 65% |
| Medium | 默认控件 | 40px | 180% | 75% |
| Strong | 工具栏、导航 | 60px | 200% | 85% |
| Heavy | 模态对话框 | 80px | 200% | 90% |

### 视觉增强

```css
/* 顶部光泽效果 */
.liquid-glass-shine {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.75) 50%,
    rgba(255, 255, 255, 0.6) 100%
  );
}

/* 内阴影 - 增加深度感 */
.liquid-glass-inset {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

/* 外阴影 - 悬浮感 */
.liquid-glass-float {
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
}
```

---

## 组件样式

### 按钮 (Button)

#### 主按钮 (Primary Button)

```css
.btn-primary {
  background: var(--brand-primary);
  color: white;
  padding: 11px 20px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #6E6CE6;
  transform: scale(1.02);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

#### 次要按钮 (Secondary Button - Liquid Glass)

```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  color: var(--brand-primary);
  padding: 11px 20px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid rgba(94, 92, 230, 0.2);
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(94, 92, 230, 0.4);
}
```

#### 文本按钮 (Text Button)

```css
.btn-text {
  background: transparent;
  color: var(--brand-primary);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.btn-text:hover {
  background: rgba(94, 92, 230, 0.1);
}
```

### 输入框 (Input)

```css
.input {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 15px;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.input::placeholder {
  color: var(--text-placeholder);
}

.input:focus {
  outline: none;
  border-color: var(--brand-primary);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 0 4px rgba(94, 92, 230, 0.15);
}
```

### 卡片 (Card)

```css
.card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.card-elevated {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

### 工具栏 (Toolbar)

```css
.toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(60px) saturate(200%);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: 8px 16px;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  z-index: 100;
}

/* 顶部工具栏变体 */
.toolbar-top {
  position: sticky;
  top: 0;
  bottom: auto;
  border-top: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
```

### 侧边栏 (Sidebar)

```css
.sidebar {
  background: rgba(242, 242, 247, 0.85);
  backdrop-filter: blur(60px);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  width: 260px;
  height: 100%;
}

.sidebar-item {
  padding: 10px 14px;
  border-radius: 10px;
  margin: 2px 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sidebar-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.sidebar-item-active {
  background: rgba(94, 92, 230, 0.15);
  color: var(--brand-primary);
}
```

### 弹出菜单 (Popover/Menu)

```css
.popover {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(60px) saturate(200%);
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  padding: 6px;
  min-width: 200px;
}

.popover-item {
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
}

.popover-item:hover {
  background: rgba(0, 0, 0, 0.05);
}
```

### 滑块 (Slider)

```css
.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
```

### 开关 (Toggle/Switch)

```css
.switch {
  position: relative;
  width: 51px;
  height: 31px;
  background: rgba(120, 120, 128, 0.16);
  border-radius: 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.switch-active {
  background: var(--brand-primary);
}

-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.switch-active .switch-knob {
  transform: translateX(20px);
}
```

### 标签页 (Tabs)

```css
.tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

.tab {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab-active {
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
```

### 代码块 (Code Block)

```css
.code-block {
  background: rgba(44, 44, 46, 0.95);
  border-radius: 12px;
  overflow: hidden;
  font-family: var(--font-family-mono);
  font-size: 13px;
  line-height: 1.5;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(58, 58, 60, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.code-content {
  padding: 14px;
  overflow-x: auto;
}

/* 语法高亮配色 */
.token-keyword { color: #FF6961; }
.token-string { color: #32D74B; }
.token-function { color: #747AFF; }
.token-comment { color: #8E8E93; }
.token-number { color: #FF9F0A; }
```

### 进度条 (Progress Bar)

```css
.progress-bar {
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--brand-primary);
  border-radius: 3px;
  transition: width 0.3s ease;
}
```

### 徽章 (Badge)

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background: var(--brand-primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
}

.badge-secondary {
  background: rgba(120, 120, 128, 0.2);
  color: var(--text-primary);
}
```

---

## 布局与间距

### 间距系统

```css
/* 8px 基础间距系统 */
--spacing-2: 2px;    /* 细微间距 */
--spacing-4: 4px;   /* 紧凑间距 */
--spacing-6: 6px;   /* 小间距 */
--spacing-8: 8px;   /* 默认小间距 */
--spacing-10: 10px; /* 中小间距 */
--spacing-12: 12px; /* 中间距 */
--spacing-14: 14px; /* 标准间距 */
--spacing-16: 16px; /* 基础间距 */
--spacing-20: 20px; /* 大间距 */
--spacing-24: 24px; /* 较大间距 */
--spacing-32: 32px; /* 大间距 */
--spacing-40: 40px; /* 超大间距 */
--spacing-48: 48px; /* 特大间距 */
```

### 边距规范

| 区域 | 边距值 | 说明 |
|------|--------|------|
| 页面外边距 | 20px | 内容与窗口边缘距离 |
| 卡片内边距 | 16px | 卡片内容填充 |
| 列表项内边距 | 12px 14px | 列表项左右填充 |
| 按钮内边距 | 11px 20px | 主按钮填充 |
| 输入框内边距 | 11px 14px | 输入框填充 |

### 圆角规范

```css
--radius-small: 8px;    /* 小元素：标签、徽章 */
--radius-medium: 10px;  /* 中等元素：列表项 */
--radius-large: 12px;   /* 大元素：输入框 */
--radius-xl: 14px;      /* 超大元素：按钮 */
--radius-2xl: 16px;     /* 卡片圆角 */
--radius-3xl: 20px;     /* 大卡片 */
--radius-full: 9999px;  /* 圆形 */
```

### 阴影规范

```css
--shadow-xs: 0 1px 3px rgba(0, 0, 0, 0.05);
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 12px 48px rgba(0, 0, 0, 0.15);
--shadow-2xl: 0 20px 64px rgba(0, 0, 0, 0.18);
```

---

## 界面设计

### 主界面布局

```
┌─────────────────────────────────────────────────────────┐
│                     标题栏 (透明)                        │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│              │                                          │
│   侧边栏     │            主内容区                      │
│   (260px)    │                                          │
│              │                                          │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│                   底部工具栏 (Liquid Glass)             │
└─────────────────────────────────────────────────────────┘
```

**布局特点：**
- 侧边栏：固定宽度 260px，毛玻璃背景
- 主内容区：自适应宽度，边缘到边缘内容
- 底部工具栏：Liquid Glass 效果，悬浮于内容之上
- 标题栏：透明或半透明，融入窗口

### AI 对话界面

```
┌─────────────────────────────────────────────────────────┐
│  ◀ 返回    AI 对话                    ⋯                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ 👤 用户                                      │     │
│  │ 如何实现快速排序？                             │     │
│  │                                        14:30 │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│  ┌───────────────────────────────────────────────┐     │
│  │ 🤖 Coworker                                   │     │
│  │ 快速排序是一种高效的排序算法...                │     │
│  │                                               │     │
│  │ ```python                                     │     │
│  │ def quicksort(arr):                           │     │
│  │     # ...                                     │     │
│  │ ```                                           │     │
│  │                                        14:30  │     │
│  └───────────────────────────────────────────────┘     │
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [输入问题...]                    📎 📎 发送           │
└─────────────────────────────────────────────────────────┘
```

**设计要点：**
- 用户消息：右对齐，品牌色背景
- AI 消息：左对齐，毛玻璃卡片背景
- 代码块：暗色背景，语法高亮
- 输入框：底部固定，支持多行输入

### 代码编辑器界面

```
┌─────────────────────────────────────────────────────────┐
│  main.py  ▼        │    文件浏览器          ⚙️         │
├──────────┬──────────┼────────────────────────────────────┤
│          │          │                                    │
│  1       │def hello │                                    │
│  2       │    world │                                    │
│  3       │          │                                    │
│  4       │          │                                    │
│  5       │          │                                    │
├──────────┴──────────┴────────────────────────────────────┤
│  terminal │  问题 │  终端                   │  main:12  │
└─────────────────────────────────────────────────────────┘
```

**设计要点：**
- 侧边文件浏览器：毛玻璃背景
- 行号区：半透明背景
- 代码区：等宽字体，语法高亮
- 底部标签页：多标签切换

### 文件管理界面

```
┌─────────────────────────────────────────────────────────┐
│  📁 项目文件                                  🔍 搜索    │
├─────────────────────────────────────────────────────────┤
│  📂 src                          2026-02-13      │     │
│  📂 components                                14:30      │
│  📂 utils                                                │
│  ├─ App.tsx                                              │
│  ├─ main.tsx                                             │
│  └─ index.css                                            │
├─────────────────────────────────────────────────────────┤
│  📄 新建文件  📁 新建文件夹  📋 粘贴                   │
└─────────────────────────────────────────────────────────┘
```

### 设置界面

```
┌─────────────────────────────────────────────────────────┐
│  ⚙️ 设置                                    完成       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  外观                                                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  深色模式                              ○        │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  AI 设置                                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │  模型选择                                ▼       │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  温度设置                    ─────●─────         │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  关于                                                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Coworker v1.0.0                                │   │
│  │  基于 iOS 26 Liquid Glass 设计                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 交互规范

### 触摸/点击目标尺寸

| 元素类型 | 最小尺寸 | 推荐尺寸 |
|----------|----------|----------|
| 按钮 | 44x44px | 48x48px |
| 列表项 | 高度 44px | 高度 48px |
| 开关 | 51x31px | 51x31px |
| 复选框 | 22x22px | 24x24px |
| 图标按钮 | 44x44px | 48x48px |

### 动画时长

```css
--duration-instant: 100ms;     /* 即时反馈 */
--duration-fast: 200ms;         /* 快速动画 - 按钮悬停 */
--duration-normal: 300ms;       /* 正常动画 - 页面切换 */
--duration-slow: 500ms;         /* 慢速动画 - 模态弹出 */
--duration-slower: 800ms;       /* 更慢动画 - 复杂过渡 */
```

### 缓动函数

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);        /* 减速 - 默认 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);         /* 加速 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);   /* 加速减速 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* 弹跳 */
```

### 悬停状态

- 按钮：轻微放大 (1.02x)，背景色加深
- 卡片：轻微上移，阴影增强
- 列表项：背景色变化

### 按下/激活状态

- 按钮：轻微缩小 (0.98x)，即时反馈
- 图标：透明度降低或颜色加深

### 焦点状态

- 输入框：边框变色，外发光效果
- 按钮：外发光环

### 加载状态

```css
/* 骨架屏 */
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.05) 25%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 无障碍设计

### 对比度要求

- 文本与背景对比度 ≥ 4.5:1 (正常文字)
- 文本与背景对比度 ≥ 3:1 (大文字)
- 交互元素与背景对比度 ≥ 3:1

### 键盘导航

- 所有交互元素可通过 Tab 键访问
- 焦点指示器清晰可见
- 支持 Enter/Space 键激活

### 屏幕阅读器

- 语义化 HTML 标签
- ARIA 标签完善
- 状态变化有语音提示

### 动画减弱

- 尊重系统 `prefers-reduced-motion` 设置
- 提供关闭动画选项

### 色盲友好

- 不仅依赖颜色传达信息
- 使用图标/文字配合颜色
- 测试常见色盲类型

---

## 技术实现

### Tauri + React 配置

#### 1. 窗口透明度配置 (tauri.conf.json)

```json
{
  "tauri": {
    "windows": [{
      "transparent": true,
      "titleBarStyle": "Overlay",
      "hiddenTitle": true,
      "fullSizeContentView": true
    }]
  }
}
```

#### 2. 毛玻璃 React 组件

```tsx
import React from 'react';
import './LiquidGlass.css';

interface LiquidGlassProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong' | 'heavy';
  className?: '';
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  intensity = 'medium',
  className = ''
}) => {
  return (
    <div className={`liquid-glass liquid-glass-${intensity} ${className}`}>
      {children}
    </div>
  );
};
```

#### 3. Tauri 毛玻璃兼容方案

由于 Tauri 在 Windows 上 backdrop-filter 支持有限，提供降级方案：

```css
/* 默认使用 backdrop-filter */
.liquid-glass {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(40px) saturate(180%);
}

/* 无 backdrop-filter 支持时降级 */
@supports not (backdrop-filter: blur(1px)) {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.95);
  }
}
```

#### 4. 平台特定处理

```typescript
// 检测平台并应用对应样式
const getGlassStyle = () => {
  if (window.__TAURI__) {
    const platform = window.__TAURI__.os.platform();
    if (platform === 'win32') {
      // Windows: 使用更高不透明度
      return 'liquid-glass-windows';
    } else if (platform === 'darwin') {
      // macOS: 完整毛玻璃效果
      return 'liquid-glass-macos';
    }
  }
  return 'liquid-glass';
};
```

### 推荐依赖

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "@tauri-apps/api": "^2.0.0"
  },
  "devDependencies": {
    "@tauri-apps/cli": "^2.0.0"
  }
}
```

### CSS 变量实现

```css
:root {
  /* 品牌色 */
  --brand-primary: #5E5CE6;
  --brand-secondary: #0A84FF;
  --brand-accent: #30D158;

  /* 文本色 */
  --text-primary: rgba(0, 0, 0, 0.85);
  --text-secondary: rgba(60, 60, 67, 0.70);
  --text-tertiary: rgba(60, 60, 67, 0.45);

  /* 背景色 */
  --bg-primary: rgba(255, 255, 255, 0.85);
  --bg-secondary: rgba(242, 242, 247, 0.75);
  --bg-elevated: rgba(255, 255, 255, 0.95);

  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* 阴影 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);

  /* 动画 */
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}

/* 暗色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: rgba(255, 255, 255, 0.90);
    --text-secondary: rgba(235, 235, 245, 0.60);
    --bg-primary: rgba(30, 30, 30, 0.85);
    --bg-secondary: rgba(44, 44, 46, 0.75);
  }
}
```

---

## 参考资料

### 官方资源

- [Apple Design Gallery - Liquid Glass](https://developer.apple.com/design/new-design-gallery/)
- [Apple Human Interface Guidelines - Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Introducing Liquid Glass - WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)

### 设计工具

- [macOS 26 Figma Components](https://www.figma.com/community/file/1543337041090580818/macos-26)
- [OS26 Liquid Glass Components](https://www.figma.com/community/file/1525217537347391704/os26-liquid-glass-components)

### 技术文章

- [Glassmorphism: What It Is and How to Use It in 2026](https://invernessdesignstudio.com/glassmorphism-what-it-is-and-how-to-use-it-in-2026/)
- [iOS-26 Glass Effect Implementation](https://juejin.cn/post/7596025264455647268)
- [Next-level frosted glass with backdrop-filter](https://www.joshwcomeau.com/css/backdrop-filter/)

### 无障碍

- [Glassmorphism Meets Accessibility](https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/)
- [Liquid Glass Is Cracked, and Usability Suffers in iOS 26](https://www.nngroup.com/articles/liquid-glass/)

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0.0 | 2026-02-13 | 初始版本，基于 iOS 26 Liquid Glass 设计规范 |

---

**文档维护者:** Coworker 设计团队
**最后更新:** 2026-02-13
