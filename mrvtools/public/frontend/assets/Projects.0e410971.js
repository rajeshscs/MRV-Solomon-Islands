var m=(d,a,o)=>new Promise((s,r)=>{var t=e=>{try{n(o.next(e))}catch(l){r(l)}},i=e=>{try{n(o.throw(e))}catch(l){r(l)}},n=e=>e.done?s(e.value):Promise.resolve(e.value).then(t,i);n((o=o.apply(d,a)).next())});import{F as u}from"./Footer.1546602e.js";import{H as p}from"./Header.d19f4155.js";import{P as f}from"./ProjectComponent.2c9c1fe8.js";import{r as _,o as g,c as v,b as c,F as b,d as h,a as w,h as k}from"./index.4e324507.js";const y=h("section",{class:"breadcrumb-area with-overlay"},null,-1),V={setup(d){const a=_([]),o=()=>m(this,null,function*(){try{const t=yield w.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(t.status===200)a.value=t.data;else throw new Error("Network response was not ok")}catch(t){console.error("Error:",t)}var s=a._rawValue.message.child_table_data;for(var r of s)r.image?console.log("item",r.image):console.log("no item found");$.ajax({success:function(){$(".breadcrumb-area").attr("style",`display:block !important; background:url(${a.value.message.parent_data.breadcrumb_image});`)}})});return g(()=>{o()}),(s,r)=>(k(),v(b,null,[c(p),y,c(f,{data:a.value},null,8,["data"]),c(u,{data:a.value},null,8,["data"])],64))}};export{V as default};
