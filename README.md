# 孙子兵法 · The Art of War

> **兵者，国之大事，死生之地，存亡之道，不可不察也。** ——《始计篇》

《孙子兵法》十三篇数字阅读网站与 AI Skill。以沉稳的兵家思想，帮助理解**审慎决策、风险与代价、组织协作、信息与变化**；不把古代战争经验转换成现代危险行为指南。

**[预定网站地址（Pages 尚需启用）](https://1998x-stack.github.io/theArtOfWar/)** · **[Skill 规范](./SKILL.md)** · **[完整文档](./docs/README.md)** · **[构建状态](https://github.com/1998x-stack/theArtOfWar/actions)**

## 主要能力

| 模块 | 能力 |
| --- | --- |
| 原典阅读 | **13篇古文、431句独立史义释读**。一句原文在上，一句释读在下，译意初始遮挡，点击单句才揭晓 |
| 内容导航 | 全文检索、篇目直达、上一/下一篇、书签与本地阅读状态 |
| 东方审美 | 深墨 / 宣纸主题、青铜色视觉、山水层叠、缓慢动效与响应式阅读 |
| AI Skill | [sunzi-strategic-wisdom](./SKILL.md)：原文引证 + 篇名 + 释义 + 适用边界 + 非暴力的现实行动 |
| 工程质量 | 原生 ES Modules，无第三方运行时依赖；13篇/431句无损校验、CI、静态构建与 Pages |

**内容定位：** 经文采用简体、现代标点的通行阅读整理版，现代文字是本项目独立编写的**历史语境释读**而非严格逐字校勘译本。关于出土简本与各传本的差异，请阅读 [版本与来源](./docs/TEXTUAL-SOURCES.md)。

## 将 Skill 直接用于 Codex / OpenCode

### A. 复制以下提示词（无需额外安装）

在已克隆的项目目录中，将这段文本直接发送给 Codex 或 OpenCode：

~~~text
请完整阅读当前仓库 SKILL.md 和 references/decision-framework.md，并根据需要查看 data/chapters.js。
从现在起按 sunzi-strategic-wisdom Skill 分析我的现实问题：
1. 先弄清目标、约束、已知/未知条件、代价与不可逆风险。
2. 借《孙子兵法》的慎战、庙算、知己知彼、全胜与应变思想，采用沉稳、凝练但通俗易懂的兵家语气回答。
3. 引用恰切且真实的《孙子兵法》原文短句，标注篇名，并紧接现代中文释义。
4. 说明古代军事思想与当下生活、工作不能直接照搬的边界。
5. 提供1至3项具体、合法、非暴力、可验证的下一步；不指导攻击、武器、火攻、间谍、欺骗或伤害行为。
6. 不得编造引文，也不得把自写古风语句当作孙子原文。
我的问题：________
~~~

### B. 启用 Codex / OpenCode 项目级 Skill（推荐）

Skill 标准入口位于 [`.agents/skills/sunzi-strategic-wisdom/SKILL.md`](./.agents/skills/sunzi-strategic-wisdom/SKILL.md)，两个客户端均支持自动发现：

~~~bash
git clone https://github.com/1998x-stack/theArtOfWar.git
cd theArtOfWar
codex
# 或启动
opencode
~~~

**Codex 明确调用：**

~~~text
$sunzi-strategic-wisdom 请从《孙子兵法》的慎战思想出发，分析我该不该贸然推进这个项目。
~~~

**OpenCode 明确调用：**

~~~text
请加载 sunzi-strategic-wisdom Skill，并完整阅读根目录 SKILL.md。结合我的现实问题进行审慎分析：________
~~~

### C. 跨仓库全局使用

~~~bash
git clone https://github.com/1998x-stack/theArtOfWar.git "$HOME/sunzi-reading-skill"
mkdir -p "$HOME/.agents/skills"
ln -s "$HOME/sunzi-reading-skill/.agents/skills/sunzi-strategic-wisdom" \
  "$HOME/.agents/skills/sunzi-strategic-wisdom"
~~~

若目标已存在，请勿覆盖。Codex 与 OpenCode 均支持 `~/.agents/skills/`。若客户端未及时发现，可重新启动。

[Codex Skills 官方文档](https://learn.chatgpt.com/docs/build-skills) · [OpenCode Skills 官方文档](https://docs.opencode.ai/docs/skills/)

## 本地开发

~~~bash
git clone https://github.com/1998x-stack/theArtOfWar.git
cd theArtOfWar
npm test
npm run build
npm run serve
# 打开 http://localhost:4173
~~~

要求 Node.js 20+；本地服务使用 Python 3。浏览器原生模块需 HTTP 环境，不能直接以 `file://` 打开。

| 路径 | 内容 |
| --- | --- |
| `data/chapters.js` | 十三篇全文、编辑性段落、篇目说明 |
| `data/passages.js`、`data/translations/` | 431句及独立史义释读、稳定句 ID |
| `index.html`、`styles.css`、`app.js` | 网页、视觉设计、交互 |
| `SKILL.md`、`.agents/skills/`、`references/` | AI Skill、客户端发现与专项参考 |
| `docs/`、`scripts/`、`.github/workflows/` | 专业文档、数据验证、自动发布 |

## 文本伦理与许可

原作古文为公有领域；本仓库的电子阅读文本为现代简体、标点整理版，历史释读不保证学术定本精度。自动测试证明结构完整、分句与原文无损对应，**不能代替古文字形、校勘与译法的人工审阅**。涉及古代战争或情报的段落仅作为历史文献阅读，不提供现代实操指导。

代码 [MIT](./LICENSE)；本项目新编现代释读与导读 [CC BY 4.0](./CONTENT-LICENSE.md)；引用第三方整理源时请核验原站许可并标明出处。

[设计系统](./docs/DESIGN-SYSTEM.md) · [内容模型](./docs/CONTENT-MODEL.md) · [测试验收](./docs/QA.md) · [部署指南](./docs/DEPLOYMENT.md) · [路线图](./docs/ROADMAP.md)

---

**知彼知己者，百战不殆。** ——《谋攻篇》