# Coworker Figma 设计指南

> 基于 iOS 26 Liquid Glass 设计风格的 Figma 设计说明

---

## 设计源文件

建议使用以下 Figma 社区资源作为设计起点：

1. **[macOS 26 UI Kit](https://www.figma.com/community/file/1543337041090580818/macos-26)**
   - 完整的 macOS 26 组件库
   - 包含 Liquid Glass 效果
   - 可直接用于桌面应用设计

2. **[OS26 Liquid Glass Components](https://www.figma.com/community/file/1525217537347391704/os26-liquid-glass-components)**
   - 专业的 Liquid Glass 组件
   - 多种毛玻璃强度等级
   - 可复用的 UI 元素

---

## 设计规范摘要

### 尺寸规范

| 元素 | 尺寸 |
|------|------|
| 窗口最小宽度 | 1024px |
| 侧边栏宽度 | 260px |
| 底部工具栏高度 | 60px + 安全区域 |
| 列表项高度 | 44-48px |
| 按钮高度 | 44px |

### 颜色规范

#### 主题色
- 主紫色: `#5E5CE6`
- 强调蓝: `#0A84FF`
- 成功绿: `#30D158`

#### 毛玻璃背景
- 轻度: `rgba(255,255,255,0.65)` + blur 20px
- 中度: `rgba(255,255,255,0.75)` + blur 40px
- 强度: `rgba(255,255,255,0.85)` + blur 60px

### 圆角规范
- 按钮: 14px
- 输入框: 12px
- 卡片: 16px
- 工具栏: 14px (顶部边缘)

### 阴影规范
- 卡片: `0 4px 16px rgba(0,0,0,0.08)`
- 浮层: `0 8px 32px rgba(0,0,0,0.12)`
- 弹窗: `0 12px 48px rgba(0,0,0,0.15)`

---

## Figma 毛玻璃效果设置

### 方法一：使用背景模糊

1. 选择图层
2. 添加效果 → **背景模糊**
3. 设置模糊值: 20-80 (根据强度等级)
4. 设置不透明度: 65%-90%
5. 图层填充: `#FFFFFF` 或 `#1E1E1E` (暗色)
6. 可选: 添加 1px 内描边

### 方法二：使用图层模糊

1. 复制内容图层
2. 对副本添加 **图层模糊**
3. 调整不透明度
4. 放置在原始图层下方

### Figma 效果参数

| 效果类型 | 参数值 |
|----------|--------|
| 背景模糊 | 40 (中度) / 60 (强度) |
| 不透明度 | 75% (中度) / 85% (强度) |
| 填充 | `#FFFFFF` / `#1E1E1E` |
| 描边 | 1px, `rgba(255,255,255,0.3)` |

---

## 页面设计要点

### 主界面
- 边缘到边缘布局
- 半透明侧边栏
- 底部工具栏悬浮
- 内容区域自适应

### AI 对话界面
- 用户消息: 右对齐, 品牌色背景
- AI 消息: 左对齐, 毛玻璃卡片
- 代码块: 暗色背景 + 语法高亮
- 输入框: 底部固定

### 代码编辑器界面
- 行号区: 半透明背景
- 侧边文件浏览器: 毛玻璃效果
- 底部标签页: 支持多标签切换

### 设置界面
- 分组布局
- 每组使用毛玻璃卡片
- 开关/滑块居中对齐

---

## 图标资源

推荐使用以下图标库:

1. **SF Symbols** (Apple 官方)
   - 下载: [Apple Developer](https://developer.apple.com/sf-symbols/)
   - 与 Liquid Glass 风格完美匹配
   - 支持暗色模式

2. **Lucide Icons**
   - 风格简洁现代
   - 开源免费
   - Figma 插件可用

3. **Heroicons**
   - Tailwind CSS 官方图标库
   - 线性风格
   - 适合桌面应用

---

## 字体设置

### Figma 字体选择
```
字体系列: SF Pro Text / SF Pro Display
字号: 15px (正文) / 17px (标题)
字重: Medium (500) / Semibold (600)
行高: 1.4
```

### 中文字体
```
备用字体: PingFang SC, Hiragino Sans GB
备用字体: Microsoft YaHei (Windows)
```

---

## 导出给开发

### 切图命名规范
```
[组件名]_[状态]@[尺寸]@[倍数].[格式]
例: button_primary@44@2x.png
```

### 导出设置
- **格式**: PNG (透明背景)
- **倍数**: 1x, 2x
- **颜色**: sRGB

### Token 文件
导出设计变量 (Design Tokens) 为 JSON:
```json
{
  "colors": {
    "brand-primary": "#5E5CE6",
    "bg-primary": "rgba(255,255,255,0.85)"
  },
  "spacing": {
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  },
  "radius": {
    "sm": "8px",
    "md": "12px",
    "lg": "16px"
  }
}
```

---

## 设计检查清单

### 布局
- [ ] 边缘到边缘内容
- [ ] 底部工具栏
- [ ] 正确的间距 (8px 基础网格)

### 视觉
- [ ] 毛玻璃效果正确应用
- [ ] 阴影效果适中
- [ ] 圆角统一

### 颜色
- [ ] 符合品牌色规范
- [ ] 对比度符合无障碍标准
- [ ] 暗色模式适配

### 交互
- [ ] 悬停状态
- [ ] 激活状态
- [ ] 禁用状态
- [ ] 焦点状态

### 无障碍
- [ ] 文本对比度 ≥ 4.5:1
- [ ] 触摸目标 ≥ 44x44px
- [ ] 支持键盘导航

---

## 参考资源

- [Apple Liquid Glass Gallery](https://developer.apple.com/design/new-design-gallery/)
- [Figma macOS 26 Kit](https://www.figma.com/community/file/1543337041090580818/macos-26)
- [iOS 26 Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
