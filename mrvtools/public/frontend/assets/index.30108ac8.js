var g=(r,o,t)=>new Promise((n,e)=>{var s=c=>{try{l(t.next(c))}catch(p){e(p)}},i=c=>{try{l(t.throw(c))}catch(p){e(p)}},l=c=>c.done?n(c.value):Promise.resolve(c.value).then(s,i);l((t=t.apply(r,o)).next())});import{c as _,r as v,a as P,b as y,d as R,_ as b,e as I,f as h,g as j,F as A,h as O,o as k,i as w,s as V,j as C,k as D,C as T,I as S,l as N}from"./vendor.68c882b1.js";const $=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}};$();const B="modulepreload",L={},F="/assets/mrvtools/frontend/",a=function(o,t){return!t||t.length===0?o():Promise.all(t.map(n=>{if(n=`${F}${n}`,n in L)return;L[n]=!0;const e=n.endsWith(".css"),s=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${s}`))return;const i=document.createElement("link");if(i.rel=e?"stylesheet":B,e||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),e)return new Promise((l,c)=>{i.addEventListener("load",l),i.addEventListener("error",c)})})).then(()=>o())},E=_({url:"frappe.auth.get_logged_user",cache:"User",onError(r){r&&r.exc_type==="AuthenticationError"&&m.push({name:"LoginPage"})}});function f(){let o=new URLSearchParams(document.cookie.split("; ").join("&")).get("user_id");return o==="Guest"&&(o=null),o}const d=v({login:_({url:"login",makeParams({email:r,password:o}){return{usr:r,pwd:o}},onSuccess(r){E.reload(),d.user=f(),d.login.reset(),m.replace(r.default_route||"/")}}),logout:_({url:"logout",onSuccess(){E.reset(),d.user=f(),m.replace({name:"Login"})}}),user:f(),isLoggedIn:P(()=>!!d.user)}),U=[{path:"/home",name:"Home",component:()=>a(()=>import("./Home.6a375120.js"),["assets/Home.6a375120.js","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])},{name:"Login",path:"/account/login",component:()=>a(()=>import("./Login.4bb9fdf5.js"),["assets/Login.4bb9fdf5.js","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])},{name:"Landing",path:"/landing",component:()=>a(()=>import("./Landing.165d4625.js"),["assets/Landing.165d4625.js","assets/Landing.993459e4.css","assets/Header.d03e39be.js","assets/Header.1262ca06.css","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])},{name:"About",path:"/about",component:()=>a(()=>import("./About.16ab685b.js"),["assets/About.16ab685b.js","assets/Header.d03e39be.js","assets/Header.1262ca06.css","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])},{name:"Project",path:"/project",component:()=>a(()=>import("./Projects.569ce34a.js"),["assets/Projects.569ce34a.js","assets/Header.d03e39be.js","assets/Header.1262ca06.css","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])},{name:"Reports",path:"/reports",component:()=>a(()=>import("./Reports.6e66189f.js"),["assets/Reports.6e66189f.js","assets/Header.d03e39be.js","assets/Header.1262ca06.css","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])},{name:"KnowledgeResource",path:"/knowledgeresource",component:()=>a(()=>import("./KnowledgeResource.88376b2f.js"),["assets/KnowledgeResource.88376b2f.js","assets/Header.d03e39be.js","assets/Header.1262ca06.css","assets/vendor.68c882b1.js","assets/vendor.1875b906.css"])}];let m=y({history:R("/frontend"),routes:U});m.beforeEach((r,o,t)=>g(void 0,null,function*(){let n=d.isLoggedIn;r.name==="Login"&&n?t({name:"Landing"}):r.name!=="Login"&&!n?t({name:"Login"}):t()}));const q={},x=h("head",null,null,-1);function H(r,o){const t=O("router-view");return k(),I(A,null,[x,h("div",null,[j(t)])],64)}var K=b(q,[["render",H]]);let u=w(K);V("resourceFetcher",N);u.use(m);u.use(C);u.component("Button",D);u.component("Card",T);u.component("Input",S);u.mount("#app");export{d as s};
