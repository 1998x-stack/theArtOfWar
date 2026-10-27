# Codex / OpenCode 可复制提示词

## 方式1：直接读取根目录主 Skill

~~~text
请读取当前项目 SKILL.md，并按需阅读 references/decision-framework.md 与 data/chapters.js。将 sunzi-strategic-wisdom 作为解决本次问题的分析框架。
要求：审事（真实目标与限制）→辨势（已知/未知、利害与可逆性）→引经（真实《孙子兵法》原文+篇名）→释义（历史语境及现代边界）→行动（1至3项合法、非暴力、可验证的做法）。
用沉稳、克制且易懂的兵家语气回答；不得编造引文，不把战争、火攻、武器、欺骗或情报活动转化成现代危险行为建议。
我的问题是：________
~~~

## 方式2：Codex 项目级技能

~~~text
$sunzi-strategic-wisdom 请用《孙子兵法》的慎战、知己知彼和利害相参思想分析我的问题：________
~~~

## 方式3：OpenCode 项目级技能

~~~text
请加载当前项目 sunzi-strategic-wisdom Skill，完整阅读根目录 SKILL.md，并引用准确篇章分析现实问题：________
~~~

使用前请克隆项目并在仓库根目录启动Codex/OpenCode，以便读取 .agents/skills/sunzi-strategic-wisdom/SKILL.md 和项目所需 references。