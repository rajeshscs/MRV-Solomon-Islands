var h=(o,s,r)=>new Promise((i,n)=>{var a=t=>{try{p(r.next(t))}catch(g){n(g)}},c=t=>{try{p(r.throw(t))}catch(g){n(g)}},p=t=>t.done?i(t.value):Promise.resolve(t.value).then(a,c);p((r=r.apply(o,s)).next())});import{_ as u}from"./pattern.23cb1e7d.js";import{F as w}from"./Footer.b10c0032.js";import{H as k}from"./Header.7e615c6f.js";import{_ as b,f as v,g as x,c as l,b as f,a as e,F as I,h as V,j as N,o as d,k as m,p as F,e as B,d as y}from"./index.5f5b84b3.js";const _=o=>(F("data-v-6a241afd"),o=o(),B(),o),E={"data-aos":"fade-right","data-aos-delay":"50",class:"about-area report-section about-2 fix wow fadeInUp","data-wow-delay":"0.3s",id:"reports"},H=_(()=>e("h1",{style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"p-5 text-center"},[y(" National "),e("span",{style:{color:"green","font-weight":"700"}},"GHG"),y(" Inventory ")],-1)),S={class:"container-fluid"},G={key:0,class:"img p-1"},L=_(()=>e("div",{class:"pattern-background"},[e("img",{src:u,style:{height:"100%"}})],-1)),R=["src"],j={key:1,class:"img p-1"},z=_(()=>e("div",{class:"pattern-background"},[e("img",{src:u,style:{height:"100%"}})],-1)),C=["src"],D={key:2,class:"img p-1"},M=_(()=>e("div",{class:"pattern-background"},[e("img",{src:u,style:{height:"100%"}})],-1)),P=["src"],T={setup(o){const s=v([]);v([]),console.log(s);const r=()=>h(this,null,function*(){try{const c=yield N.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(c.status===200)s.value=c.data;else throw new Error("Network response was not ok")}catch(c){console.error("Error:",c)}var n=s._rawValue.message.parent_data.contact_number,i=s._rawValue.message.child_table_data,n=s._rawValue.message.parent_data;for(var a of i)a.image?console.log("item",a.image):console.log("no item found");console.log("responsee",n)});return x(()=>{r(),fetchPartnerLogos()}),(i,n)=>(d(),l("div",null,[f(k),e("div",E,[H,e("div",S,[(d(!0),l(I,null,V(s.value.message,a=>(d(),l("div",{class:"row",key:a.name},[a.report_image?(d(),l("div",G,[L,e("div",null,[e("img",{src:a.report_image,class:"report-image"},null,8,R)])])):m("",!0),a.report_image1?(d(),l("div",j,[z,e("div",null,[e("img",{src:a.report_image1,class:"report-image1"},null,8,C)])])):m("",!0),a.report_image2?(d(),l("div",D,[M,e("div",null,[e("img",{src:a.report_image2,class:"report-image2"},null,8,P)])])):m("",!0)]))),128))])]),f(w,{data:s.value},null,8,["data"])]))}};var O=b(T,[["__scopeId","data-v-6a241afd"]]);export{O as default};
