var m=(i,a,o)=>new Promise((e,c)=>{var r=t=>{try{l(o.next(t))}catch(d){c(d)}},_=t=>{try{l(o.throw(t))}catch(d){c(d)}},l=t=>t.done?e(t.value):Promise.resolve(t.value).then(r,_);l((o=o.apply(i,a)).next())});import{F as f,H as g}from"./Header.992df9f0.js";import{k as y}from"./KnowledgeResource.6cf5fd8a.js";import{r as v,o as h,c as s,a as u,F as k,d as w,b as p,f as x,g as b,h as n,t as N,i as F}from"./index.97bf13b3.js";const V=p("h1",{"data-aos":"fade-right","data-aos-delay":"100",style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"pt-5 pb-3 text-center"},[x(" Knowledge "),p("span",{style:{color:"green","font-weight":"700"}},"Resources")],-1),B={key:0},K={setup(i){$.ajax({success:function(){$(".breadcrumb-area").attr("style","display:block !important;")}});const a=v([]),o=()=>m(this,null,function*(){try{const e=yield b.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(e.status===200)a.value=e.data;else throw Error("Network response was not ok")}catch(e){console.error("Error:",e)}});return h(()=>{o()}),(e,c)=>(n(),s("div",null,[u(g),V,(n(!0),s(k,null,w(a.value.message,r=>(n(),s("div",{key:r.name,class:"text-content"},[r.kr_content?(n(),s("p",B,N(r.kr_content),1)):F("",!0)]))),128)),u(y,{data:a.value},null,8,["data"]),u(f,{data:a.value},null,8,["data"])]))}};export{K as default};
