import {CHAPTERS,byNumber} from "./data/chapters.js";
import {byChapter,PASSAGE_COUNT} from "./data/passages.js";

const $=id=>document.getElementById(id);
const store={
 get(k,f){try{return JSON.parse(localStorage.getItem("sunzi:"+k))??f}catch{return f}},
 set(k,v){try{localStorage.setItem("sunzi:"+k,JSON.stringify(v))}catch{/* Optional browser persistence */}}
};
const hashNumber=()=>Number(location.hash.match(/^#chapter-(\d+)$/)?.[1]);
const savedChapter=store.get("last",1);
const valid=n=>Number.isInteger(n)&&n>=1&&n<=13;
const state={
 current:valid(hashNumber())?hashNumber():valid(savedChapter)?savedChapter:1,
 query:"",size:Math.min(28,Math.max(16,Number(store.get("size",20))||20)),
 bookmarks:Array.isArray(store.get("bookmarks",[]))?store.get("bookmarks",[]):[]
};
const numerals=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三"];
const chapterLabel=n=>"第"+numerals[n-1]+"篇";
function element(tag,cls,value){const node=document.createElement(tag);if(cls)node.className=cls;if(value!==undefined)node.textContent=value;return node}
const reduced=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
let toastTimer;
function toast(value){const n=$("toast");n.textContent=value;n.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>n.classList.remove("visible"),2000)}
function themeSet(theme){
 document.documentElement.dataset.theme=theme;store.set("theme",theme);
 $("theme-switch").setAttribute("aria-label",theme==="dark"?"切换宣纸浅色模式":"切换深墨色模式");
 document.querySelector('meta[name="theme-color"]').content=theme==="dark"?"#101a1b":"#f2eee4";
}
themeSet(store.get("theme","dark")==="light"?"light":"dark");
$("theme-switch").addEventListener("click",()=>themeSet(document.documentElement.dataset.theme==="dark"?"light":"dark"));
function renderCards(){
 const q=state.query.trim().toLocaleLowerCase("zh-CN");
 const matches=CHAPTERS.filter(c=>[c.title,c.summary,c.theme,...c.paragraphs,...byChapter(c.number).map(s=>s.interpretation)].join(" ").toLocaleLowerCase("zh-CN").includes(q));
 $("results-count").textContent=matches.length+" / 13 篇";
 $("no-results").hidden=!!matches.length;
 const fragment=document.createDocumentFragment();
 for(const c of matches){
  const card=element("button","chapter-card");card.type="button";
  card.setAttribute("aria-label","阅读"+chapterLabel(c.number)+c.title);
  const top=element("div","top");
  top.append(element("span",null,String(c.number).padStart(2,"0")+" / 13"),element("span","arrow",state.bookmarks.includes(c.number)?"★":"↗"));
  card.append(top,element("strong",null,c.title),element("p",null,c.summary),element("small",null,byChapter(c.number).length+" 个阅读单元"));
  card.addEventListener("click",()=>navigate(c.number,true));
  fragment.append(card);
 }
 $("chapter-grid").replaceChildren(fragment);
}
function renderNav(){
 const fragment=document.createDocumentFragment();
 for(const c of CHAPTERS){
  const button=element("button","nav-button"+(c.number===state.current?" active":""));button.type="button";
  if(c.number===state.current)button.setAttribute("aria-current","location");
  button.append(element("small",null,String(c.number).padStart(2,"0")),element("span",null,c.title));
  button.addEventListener("click",()=>navigate(c.number,false));
  fragment.append(button);
 }
 $("chapter-nav").replaceChildren(fragment);
 $("nav-progress").textContent=String(state.current).padStart(2,"0")+" / 13";
}
function updateProgress(){
 const buttons=$("sentences").querySelectorAll(".reveal");
 const open=$("sentences").querySelectorAll('.reveal[aria-expanded="true"]').length;
 $("reveal-progress").textContent="已释读 "+open+" / "+buttons.length+" 句";
}
function toggleSentence(button,target){
 const open=button.getAttribute("aria-expanded")==="true";
 button.setAttribute("aria-expanded",String(!open));
 target.hidden=open;
 button.querySelector(".reveal-label").textContent=open?"点击见义":"收起释义";
 button.querySelector(".stamp").textContent=open?"释":"收";
 button.closest(".sentence-card").classList.toggle("is-open",!open);
 updateProgress();
}
function renderSentences(c){
 const fragment=document.createDocumentFragment();
 for(const line of byChapter(c.number)){
  const article=element("article","sentence-card");article.setAttribute("role","listitem");
  article.dataset.id=line.id;
  const top=element("div","sentence-meta");
  top.append(element("span",null,"句 "+String(line.number).padStart(3,"0")),element("span",null,"古籍原文 / ORIGINAL"));
  const original=element("p","classical",line.original);
  const button=element("button","reveal");button.type="button";
  button.setAttribute("aria-expanded","false");
  button.setAttribute("aria-controls","meaning-"+line.id);
  button.setAttribute("aria-label","揭晓第"+line.number+"句释义");
  button.append(element("span","reveal-label","点击见义"),element("span","stamp","释"));
  const meaning=element("div","interpretation");meaning.id="meaning-"+line.id;meaning.hidden=true;
  meaning.append(element("span","tag","现代白话 · 历史释读"),element("p",null,line.interpretation));
  button.addEventListener("click",()=>toggleSentence(button,meaning));
  article.append(top,original,button,meaning);fragment.append(article);
 }
 $("sentences").replaceChildren(fragment);updateProgress();
}
function renderChapter(){
 const c=byNumber(state.current);if(!c)return;
 $("chapter-type").textContent=chapterLabel(c.number)+" · "+c.theme;
 $("chapter-name").textContent=c.title;
 $("chapter-summary").textContent=c.summary;
 $("chapter-watermark").textContent=String(c.number).padStart(2,"0");
 $("sentence-total").textContent=byChapter(c.number).length+" 句 / 全书"+PASSAGE_COUNT+"句";
 $("chapter-theme").textContent=c.theme;
 const saved=state.bookmarks.includes(c.number);
 $("bookmark").setAttribute("aria-pressed",String(saved));
 $("bookmark").textContent=saved?"★ 已收藏":"☆ 收藏本篇";
 $("prev").disabled=c.number===1;$("next").disabled=c.number===13;
 $("prev-title").textContent=c.number>1?byNumber(c.number-1).title:"已是首篇";
 $("next-title").textContent=c.number<13?byNumber(c.number+1).title:"已是末篇";
 document.documentElement.style.setProperty("--reading-size",state.size+"px");
 renderSentences(c);renderNav();store.set("last",c.number);
}
function navigate(n,scroll){
 if(!valid(n))return;
 state.current=n;renderChapter();
 history.replaceState(null,"","#chapter-"+n);
 if(scroll)$("reader").scrollIntoView({behavior:reduced()?"instant":"smooth",block:"start"});
}
$("search").addEventListener("input",e=>{state.query=e.target.value;renderCards()});
$("collapse-all").addEventListener("click",()=>{
 $("sentences").querySelectorAll('.reveal[aria-expanded="true"]').forEach(button=>{
  toggleSentence(button,document.getElementById(button.getAttribute("aria-controls")));
 });
});
$("font-plus").addEventListener("click",()=>{state.size=Math.min(28,state.size+2);store.set("size",state.size);document.documentElement.style.setProperty("--reading-size",state.size+"px")});
$("font-minus").addEventListener("click",()=>{state.size=Math.max(16,state.size-2);store.set("size",state.size);document.documentElement.style.setProperty("--reading-size",state.size+"px")});
$("prev").addEventListener("click",()=>navigate(state.current-1,false));
$("next").addEventListener("click",()=>navigate(state.current+1,false));
$("bookmark").addEventListener("click",()=>{
 const n=state.current;
 state.bookmarks=state.bookmarks.includes(n)?state.bookmarks.filter(v=>v!==n):[...state.bookmarks,n];
 store.set("bookmarks",state.bookmarks);renderCards();renderChapter();
 toast(state.bookmarks.includes(n)?"已收藏本篇":"已取消收藏");
});
$("copy-link").addEventListener("click",async()=>{
 const url=new URL("#chapter-"+state.current,location.href).href;
 try{await navigator.clipboard.writeText(url);toast("链接已复制")}catch{toast("请复制浏览器地址栏的链接")}
});
window.addEventListener("hashchange",()=>{if(valid(hashNumber())){state.current=hashNumber();renderChapter()}});
window.addEventListener("keydown",e=>{
 if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){e.preventDefault();$("search").focus()}
});
let ticking=false;
function updateScroll(){const total=document.documentElement.scrollHeight-innerHeight;$("progress").style.width=(total?100*scrollY/total:0)+"%";ticking=false}
window.addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}},{passive:true});
if("IntersectionObserver"in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");observer.unobserve(e.target)}}),{threshold:.1});
 document.querySelectorAll(".rise").forEach(el=>observer.observe(el));
}else document.querySelectorAll(".rise").forEach(el=>el.classList.add("on"));
renderCards();renderChapter();updateScroll();
if(valid(hashNumber()))requestAnimationFrame(()=>$("reader").scrollIntoView({behavior:"instant"}));
