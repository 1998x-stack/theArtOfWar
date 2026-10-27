import fs from "node:fs";
import {CHAPTERS} from "../data/chapters.js";
import {PASSAGES,PASSAGE_COUNT,passagesOf,splitSentences} from "../data/passages.js";
let failures=0,tests=0;
function check(value,label){tests++;if(!value){failures++;console.error("FAIL "+label)}}
check(CHAPTERS.length===13,"13 chapters");
check(PASSAGES.length===13,"13 sentence collections");
check(PASSAGE_COUNT===431,"431 sentence pairs");
check(new Set(CHAPTERS.map(c=>c.number)).size===13,"unique numbers");
for(let n=1;n<=13;n++){
 const c=CHAPTERS[n-1];
 check(c?.number===n,"number continuity "+n);
 check(typeof c?.title==="string"&&c.title.length>=2,"title "+n);
 check(typeof c?.summary==="string"&&c.summary.length>15,"chapter summary "+n);
 check(Array.isArray(c?.paragraphs)&&c.paragraphs.length>=3,"full original paragraphs "+n);
 const s=passagesOf(c);
 check(s.length>1,"sentence segmentation "+n);
 check(s.every((v,i)=>v.chapter===n&&v.number===i+1&&v.id===String(n).padStart(2,"0")+"-"+String(i+1).padStart(3,"0")),"sentence ids "+n);
 check(s.every(v=>v.interpretation.trim().length>=2&&!/^(待译|TODO|待补)/.test(v.interpretation)),"non-placeholder interpretations "+n);
 const reconstructed=c.paragraphs.map((p,i)=>s.filter(x=>x.paragraph===i+1).map(x=>x.original).join(""));
 check(reconstructed.every((p,i)=>p===c.paragraphs[i]),"exact paragraph preservation "+n);
 check(c.paragraphs.every(p=>splitSentences(p).join("")===p),"source round-trip "+n);
}
check(CHAPTERS[0].paragraphs[0].startsWith("孙子曰：兵者"),"first source line");
check(CHAPTERS.at(-1).paragraphs.at(-1).endsWith("三军之所恃而动也。"),"last source line");
const required=["README.md","SKILL.md",".agents/skills/sunzi-strategic-wisdom/SKILL.md","index.html","app.js","styles.css","data/chapters.js","data/passages.js","data/translations/01-04.js","data/translations/05-08.js","data/translations/09-10.js","data/translations/11-13.js","docs/README.md","docs/TEXTUAL-SOURCES.md",".github/workflows/ci.yml",".github/workflows/pages.yml","assets/favicon.svg","assets/og-cover.svg",".nojekyll"];
required.forEach(p=>check(fs.existsSync(p),"required "+p));
const html=fs.readFileSync("index.html","utf8");
const js=fs.readFileSync("app.js","utf8");
const css=fs.readFileSync("styles.css","utf8");
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(a=>a[1]);
check(new Set(ids).size===ids.length,"unique HTML ids");
for(const id of ["chapter-grid","search","sentences","chapter-nav","chapter-name","theme-switch","collapse-all","bookmark","progress","reveal-progress","font-plus","font-minus","prev","next"]){
 check(ids.includes(id),"HTML id "+id);check(js.includes('"'+id+'"'),"JS binding "+id);
}
check(js.includes("meaning.hidden=true"),"interpretations concealed");
check(js.includes("aria-expanded"),"accessible reveal state");
check(js.includes("toggleSentence(button,meaning)"),"independent reveal");
check(js.includes("renderSentences(c)"),"chapter switch resets reveals");
check(!js.includes("innerHTML"),"no HTML injection");
check(css.includes(".sentence-card{")&&css.includes(".interpretation{"),"vertical reading cards");
console.log("校验项："+tests+"，失败："+failures+"，篇数："+CHAPTERS.length+"，句数："+PASSAGE_COUNT);
if(failures)process.exitCode=1;