# 静态架构与数据流

## 目录

- index.html、styles.css、app.js：前端页面、视觉、阅读交互。
- data/chapters.js：十三篇唯一原文字源，83个整理性段落。
- data/translations/01-04.js、05-08.js、09-10.js、11-13.js：431条新编史义释读。
- data/passages.js：按现代标点分句，按篇章与序号配对原文/释读。
- scripts/validate.mjs：完整性及基础UI契约测试。
- scripts/build.mjs：生成dist/，只发布静态资源。
- .github/workflows/ci.yml 和 pages.yml：CI与GitHub Pages。

## 运行模型

浏览器加载原生ES Modules，渲染十三篇目录；搜索在本地完成，输入内容通过textContent显示。不调用后端，不上传用户阅读行为。书签、主题、字号和上次章节仅保存于浏览器localStorage。

所有句卡默认释读hidden=true，配套独立button、aria-expanded与aria-controls。切篇重新创建句卡，因此释读全部恢复隐藏。切字号只变更CSS变量，不应重置已打开的译意。

## 约束

资源链接必须使用相对路径，因为Pages地址位于仓库子路径theArtOfWar/。请用HTTP本地服务启动，不能从file://直接加载ES Module。动效尊重prefers-reduced-motion。