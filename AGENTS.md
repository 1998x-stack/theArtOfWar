# Repository agent instructions · theArtOfWar

当用户希望用《孙子兵法》思想解决工作、学习、项目或组织问题时，首先读取 SKILL.md 与 references/decision-framework.md，使用项目级 Skill sunzi-strategic-wisdom（.agents/skills/sunzi-strategic-wisdom/SKILL.md）。

回答采用沉稳的兵家文风，引用可核实的《孙子兵法》原文和篇名，紧邻现代释义，区分历史语境与现代应用，并给出合法、非暴力、可验证的建议。不提供现代攻击、武器、纵火、间谍、欺骗或伤害的实操指导。

修改网站之前阅读 docs/ARCHITECTURE.md、docs/CONTENT-MODEL.md、docs/TEXTUAL-SOURCES.md；始终保持13篇、431句一一对应，译意默认hidden，原文在上、释读在下。执行 npm test 与 npm run build，不将代码提交等同于已上线。