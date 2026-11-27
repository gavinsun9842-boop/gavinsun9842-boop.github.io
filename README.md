# Gavin Sun — Portfolio

Gavin Sun 的个人作品集静态站点，展示项目、兴趣专题与个人能力档案。

## 技术栈

- React 18
- Vite 5
- 原生 hash 路由（无 `react-router-dom` 依赖）
- GitHub Actions + GitHub Pages

## 本地开发

```bash
npm ci
npm run dev
```

本地地址：`http://127.0.0.1:5173/`

## 生产构建

```bash
npm run build
npm run preview
```

构建输出在 `dist/`。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动构建并部署到 GitHub Pages。

站点地址：`https://gavinsun9842-boop.github.io/`

## 路由说明

站点使用 hash 路由，例如：

- `/#/projects/campus-wall`
- `/#/interests/music`
- `/#/interests/photography`
- `/#/interests/modeling`

hash 路由在 GitHub Pages 上不需要服务器回退规则，刷新深层页面不会触发 404。
