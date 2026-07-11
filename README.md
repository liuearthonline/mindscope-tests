# MindScope · 心智图谱

一个本地优先的中文人格、心理倾向、职业兴趣与认知能力自我探索平台。它支持真实答题、动态评分、图表结果、本地历史、收藏、类型图谱和 GitHub Pages/Vercel 静态部署。

## 功能

- 首页、全部测试、分类筛选、详情页、沉浸式答题页、结果页、历史记录、收藏、类型图谱、方法与来源、隐私、免责声明和 404。
- 10 个首版完整测试：16 型人格倾向、大五人格、九型人格、RIASEC 职业兴趣、成人依恋、DISC、荣格八功能、DnD 阵营、抽象矩阵推理、综合认知能力。
- 题量版本真正筛选不同题目；答题进度和结果保存于浏览器 localStorage。
- 响应式图表、深浅色切换、键盘数字键、矩阵 SVG 题、非正式估算 IQ 与导出 PNG。

## 本地运行

```bash
npm install
npm run dev
```

## 构建与检查

```bash
npm run audit:tests
npm run test
npm run build
```

## GitHub Pages

仓库名默认按 `mindscope-tests` 配置，GitHub Actions 会在 push 到 `main` 后构建并发布。若仓库名称不同，修改 `vite.config.ts` 的 `base` 为 `/<仓库名>/`。应用使用 HashRouter，因此刷新子路由不会 404。

## Vercel

直接导入仓库，Framework 选择 Vite，Build Command 为 `npm run build`，Output Directory 为 `dist`，无需后端环境变量。

## 来源与限制

大五使用 IPIP 公有领域条目的少量翻译/改编；其余首版测试为平台原创题目或仅参考公开理论结构。平台不提供医学、心理诊断、正式 IQ、教育筛选或职业筛选结论。详见 `docs/source-audit.md`、`docs/methodology.md`。