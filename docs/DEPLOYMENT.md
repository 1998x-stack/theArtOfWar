# GitHub Pages 部署运行手册

## 本地验证

~~~bash
npm test
npm run build
npm run serve
~~~

访问 http://localhost:4173 。需Node.js 20+、Python3。

## 第一次启用

管理员进入 [仓库Pages设置](https://github.com/1998x-stack/theArtOfWar/settings/pages)，在 Build and deployment → Source 选择 **GitHub Actions**。

选择后重新运行 [Pages Workflow](https://github.com/1998x-stack/theArtOfWar/actions/workflows/pages.yml)，或向main提交一个新更改。

发布流程为 push main → npm test → npm run build → configure-pages → upload-pages-artifact → deploy-pages。预定站点网址：https://1998x-stack.github.io/theArtOfWar/ 。

如果 configure-pages 发生 Not Found，首先确认仓库已启用GitHub Pages并选择GitHub Actions。单纯添加enablement: true不能保证自动开启：官方Action对于自动启用另有令牌权限要求。

完成条件：CI成功、Pages部署成功、公开网址可访问且所有ES Module资源加载成功。仅上传工作流不能称网站已经上线。

## 故障与回滚

- 内容校验失败：查13篇、431句长度、段落拼接、必需资源。
- 前端资源404：检查dist/和相对路径。
- 页面无译文：检查data/translations/文件复制及模块导入。
- Pages 404：先检查Settings与实际部署作业。
- 回滚：优先revert最近提交，让main自动重新发布，不强制覆盖历史。

[GitHub官方Pages指南](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。