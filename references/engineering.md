# 站点工程规范

1. 原生 HTML/CSS/JS 模块，禁止无必要依赖。
2. data/chapters.js 保存83段原文，data/passages.js 由原文句读组装431句；四个 data/translations/*.js 文件提供对应现代史义释读。
3. 原文不可重复维护多份。所有动态文本只能用 textContent，避免 HTML 注入。
4. 每个句子独立 button (aria-expanded/aria-controls) 与默认 hidden 的现代释读；上下结构适用于所有设备。
5. 支持 #chapter-N 深链接（1–13）、搜索、书签、明暗主题与字号；收藏和外观仅留浏览器。
6. 尊重 prefers-reduced-motion；保证键盘和屏幕阅读器可用。
7. 站点引用相对资源 ./app.js / ./data/...，因为 Pages 将托管于 /theArtOfWar/ 子路径。
8. npm test、npm run build 后，再查 Actions 的真实状态。源码提交不等于成功上线。
9. 内容的“军事实操”解释不得进入现代问题建议；以历史、人文与风险教育为界。
