import fs from "node:fs";
import path from "node:path";
const root=process.cwd(),dist=path.join(root,"dist");
fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});
for(const file of ["index.html","styles.css","app.js",".nojekyll"])fs.copyFileSync(path.join(root,file),path.join(dist,file));
for(const dir of ["data","assets"])fs.cpSync(path.join(root,dir),path.join(dist,dir),{recursive:true});
for(const file of ["index.html","styles.css","app.js","data/chapters.js","data/passages.js","data/translations/01-04.js","data/translations/05-08.js","data/translations/09-10.js","data/translations/11-13.js","assets/favicon.svg"]){
 if(!fs.existsSync(path.join(dist,file)))throw Error("缺少构建产物："+file);
}
console.log("已构建 dist/ 静态站点");