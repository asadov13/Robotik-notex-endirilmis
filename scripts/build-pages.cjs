'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),source=path.join(root,'dist'),out=path.join(root,'_site');
const raw=process.env.SITE_BASE_PATH||'';
const base=raw==='/'?'':raw.replace(/\/$/,'');
if(base&&!/^\/[A-Za-z0-9_.%-]+(?:\/[A-Za-z0-9_.%-]+)*$/.test(base))throw Error('Invalid SITE_BASE_PATH');
fs.mkdirSync(out,{recursive:true});
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const file of walk(source)){
 const rel=path.relative(source,file),dest=path.join(out,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});
 if(!/\.(html|css|js)$/.test(file)){fs.copyFileSync(file,dest);continue;}
 let s=fs.readFileSync(file,'utf8');
 if(base){
  s=s.replace(/((?:src|href|poster|action)=["'])\/(?!\/)/g,'$1'+base+'/');
  s=s.replace(/(url\(\s*["']?)\/(?!\/)/g,'$1'+base+'/');
  s=s.replace(/(import\(\s*["'])\/(?!\/)/g,'$1'+base+'/');
  s=s.replace(/(cta\([^\n]*?,\s*["'])\/(?=[^"']*["']\))/g,'$1'+base+'/');
  if(rel==='app.js'||rel==='intro.js')s=s.replaceAll('location.pathname',`(location.pathname.slice(${base.length}) || '/')`);
 }
 fs.writeFileSync(dest,s);
}
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('Built '+out+'; base path: '+(base||'/'));