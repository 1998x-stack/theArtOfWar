# 十三篇与431句的内容数据契约

data/chapters.js是唯一原文数据源。每篇的number为1至13，title是现代阅读标题，theme与summary为本项目新编导航文案；paragraphs为源文段落数组，共83段。

data/translations目录中的四个ES Module各导出一组篇号对应的释读数组，总共431项。每项有独立史义解释，不用同一整章摘要机械重复充当每一句翻译。

data/passages.js对原文现代标点「。！？；」切分，生成字段：id、chapter、number、paragraph、original、interpretation，篇号和句序可以稳定识别，如03-024。

自动检查数组长度一致、原文逐段回拼无损、句序连续以及解释非空；若调整原文标点导致句号迁移，须同时更新句序、译意、测试和历史记录。

释读不等于逐字训诂，也不是现代危险行为的行动指南。后续版本会增加出土本/传世本异文、来源版本、词义注释和校订状态。