var d=(l,t,r)=>new Promise((o,a)=>{var m=e=>{try{s(r.next(e))}catch(n){a(n)}},p=e=>{try{s(r.throw(e))}catch(n){a(n)}},s=e=>e.done?o(e.value):Promise.resolve(e.value).then(m,p);s((r=r.apply(l,t)).next())});import{F as u}from"./Footer.5a0b0d1d.js";import{H as f}from"./Header.162647e8.js";import{k as i}from"./KnowledgeResource.6c2a288a.js";import{f as v,g as _,c as k,b as c,j as h,o as w}from"./index.1fcff78d.js";const F={setup(l){const t=v([]),r=()=>d(this,null,function*(){try{const o=yield h.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(o.status===200)t.value=o.data;else throw Error("Network response was not ok")}catch(o){console.error("Error:",o)}});return _(()=>{r()}),(o,a)=>(w(),k("div",null,[c(f),c(i,{data:t.value},null,8,["data"]),c(u,{data:t.value},null,8,["data"])]))}};export{F as default};
