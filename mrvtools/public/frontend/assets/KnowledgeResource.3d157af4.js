var _=(m,t,o)=>new Promise((e,c)=>{var r=a=>{try{l(o.next(a))}catch(d){c(d)}},p=a=>{try{l(o.throw(a))}catch(d){c(d)}},l=a=>a.done?e(a.value):Promise.resolve(a.value).then(r,p);l((o=o.apply(m,t)).next())});import{F as f}from"./Footer.1546602e.js";import{H as g}from"./Header.d19f4155.js";import{k as v}from"./KnowledgeResource.09e290c0.js";import{r as y,o as h,c as s,b as u,F as k,e as b,d as i,g as w,a as x,h as n,t as N,i as F}from"./index.4e324507.js";const R=i("section",{class:"breadcrumb-area with-overlay"},null,-1),V=i("h1",{"data-aos":"fade-right","data-aos-delay":"100",style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"pt-5 pb-3 text-center"},[w(" Knowledge "),i("span",{style:{color:"green","font-weight":"700"}},"Resources")],-1),B={key:0},z={setup(m){const t=y([]),o=()=>_(this,null,function*(){try{const e=yield x.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(e.status===200)console.log("Response ==== ",e.data),t.value=e.data;else throw Error("Network response was not ok")}catch(e){console.error("Error:",e)}$.ajax({success:function(){$(".breadcrumb-area").attr("style",`display:block !important; background:url(${t.value.message.parent_data.breadcrumb_image});`)}})});return h(()=>{o()}),(e,c)=>(n(),s("div",null,[u(g),R,V,(n(!0),s(k,null,b(t.value.message,r=>(n(),s("div",{key:r.name,class:"text-content"},[r.kr_content?(n(),s("p",B,N(r.kr_content),1)):F("",!0)]))),128)),u(v,{data:t.value},null,8,["data"]),u(f,{data:t.value},null,8,["data"])]))}};export{z as default};
