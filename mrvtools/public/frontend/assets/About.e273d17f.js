var g=(d,a,l)=>new Promise((_,t)=>{var c=s=>{try{h(l.next(s))}catch(f){t(f)}},o=s=>{try{h(l.throw(s))}catch(f){t(f)}},h=s=>s.done?_(s.value):Promise.resolve(s.value).then(c,o);h((l=l.apply(d,a)).next())});import{F as m}from"./Footer.90dc30bb.js";import{H as w}from"./Header.576d1550.js";import{_ as y,f as b,g as k,c as r,b as v,a as e,F as x,h as F,j as I,r as V,o as n,t as i,k as u,p as N,e as S}from"./index.d2878761.js";const p=d=>(N("data-v-2d7d3ad4"),d=d(),S(),d),B={class:"counter-area fix area-padding",id:"about"},E={class:"container-fluid","data-aos":"fade-right","data-aos-delay":"100"},A={class:"row","data-aos":"fade-right","data-aos-delay":"100"},C={class:"col-md-12 col-sm-12 col-xs-12 wow fadeInLeft","data-wow-delay":"0.3s"},D={key:0},H={style:{color:"#000","font-weight":"700"},class:"text-start"},L={key:1},j=p(()=>e("br",null,null,-1)),M={key:2},q={style:{color:"#000","font-weight":"700"},class:"text-start"},z={key:3},G=p(()=>e("br",null,null,-1)),J=p(()=>e("br",null,null,-1)),K=p(()=>e("br",null,null,-1)),O={setup(d){const a=b([]),l=()=>g(this,null,function*(){try{const o=yield I.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(o.status===200)a.value=o.data;else throw new Error("Network response was not ok")}catch(o){console.error("Error:",o)}var _=a._rawValue.message.child_table_data2;for(var t of _)t.image?console.log("item",t.image):console.log("no item found");var c=a._rawValue.message.parent_data;for(var t of c)t.contact_number?console.log("item",t.contact_number):console.log("no item found");console.log("response",c),console.log("response",_)});return k(()=>{l()}),(_,t)=>{const c=V("router-view");return n(),r("div",null,[v(w),e("div",B,[e("div",E,[e("div",A,[e("div",C,[(n(!0),r(x,null,F(a.value.message,o=>(n(),r("div",{key:o.name},[o.about_heading_1?(n(),r("div",D,[e("h3",H,i(o.about_heading_1),1)])):u("",!0),o.description_1?(n(),r("p",L,i(o.description_1),1)):u("",!0),j,o.about_heading_2?(n(),r("div",M,[e("h3",q,i(o.about_heading_2),1)])):u("",!0),o.description_2?(n(),r("p",z,i(o.description_2),1)):u("",!0),G]))),128))])])])]),J,K,v(c),v(m,{data:a.value},null,8,["data"])])}}};var U=y(O,[["__scopeId","data-v-2d7d3ad4"]]);export{U as default};
