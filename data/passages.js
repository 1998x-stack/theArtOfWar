import {CHAPTERS} from "./chapters.js";
import {PART_ONE} from "./translations/01-04.js";
import {PART_TWO} from "./translations/05-08.js";
import {PART_THREE} from "./translations/09-10.js";
import {PART_FOUR} from "./translations/11-13.js";

const NOTES=Object.freeze({...PART_ONE,...PART_TWO,...PART_THREE,...PART_FOUR});

/** 编辑性分句：句号、问号、叹号及分号；古籍底本并无现代标点。 */
export function splitSentences(source){
  if(typeof source!=="string") throw new TypeError("古文必须为字符串");
  const parts=source.match(/[^。！？；]+[。！？；][”’]?|[^。！？；]+$/gu)||[];
  if(parts.join("")!==source) throw Error("分句丢字："+source.slice(0,12));
  return parts;
}
export function passagesOf(ch){
  if(!ch?.paragraphs || !Array.isArray(ch.paragraphs))throw Error("缺少原文段落");
  const lines=ch.paragraphs.flatMap((paragraph,p)=>splitSentences(paragraph).map(original=>({original,paragraph:p+1})));
  const notes=NOTES[ch.number];
  if(!Array.isArray(notes)||notes.length!==lines.length)throw Error("第"+ch.number+"篇原译数量不符");
  return lines.map((line,i)=>{
    if(typeof notes[i]!=="string"||notes[i].trim().length<2)throw Error("第"+ch.number+"篇第"+(i+1)+"句释读缺失");
    return Object.freeze({
      id:String(ch.number).padStart(2,"0")+"-"+String(i+1).padStart(3,"0"),
      chapter:ch.number,
      number:i+1,
      paragraph:line.paragraph,
      original:line.original,
      interpretation:notes[i]
    });
  });
}
export const PASSAGES=Object.freeze(CHAPTERS.map(passagesOf));
export const PASSAGE_COUNT=PASSAGES.reduce((sum,items)=>sum+items.length,0);
export const byChapter=number=>PASSAGES[Number(number)-1]||[];