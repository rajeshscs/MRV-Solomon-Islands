var h=(o,s,r)=>new Promise((d,c)=>{var a=t=>{try{p(r.next(t))}catch(g){c(g)}},n=t=>{try{p(r.throw(t))}catch(g){c(g)}},p=t=>t.done?d(t.value):Promise.resolve(t.value).then(a,n);p((r=r.apply(o,s)).next())});import{_ as m}from"./pattern.23cb1e7d.js";import{F as w,H as k}from"./Header.992df9f0.js";import{_ as b,r as v,o as x,c as l,a as f,b as e,F as I,d as V,g as N,h as i,i as u,p as F,k as B,f as y}from"./index.97bf13b3.js";const _=o=>(F("data-v-3dc76ef3"),o=o(),B(),o),E={"data-aos":"fade-right","data-aos-delay":"50",class:"about-area report-section about-2 fix wow fadeInUp","data-wow-delay":"0.3s",id:"reports"},H=_(()=>e("h1",{style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"p-5 text-center"},[y(" National "),e("span",{style:{color:"green","font-weight":"700"}},"GHG"),y(" Inventory ")],-1)),S={class:"container-fluid"},G={key:0,class:"img p-1"},L=_(()=>e("div",{class:"pattern-background"},[e("img",{src:m,style:{height:"100%"}})],-1)),R=["src"],j={key:1,class:"img p-1"},z=_(()=>e("div",{class:"pattern-background"},[e("img",{src:m,style:{height:"100%"}})],-1)),C=["src"],D={key:2,class:"img p-1"},M=_(()=>e("div",{class:"pattern-background"},[e("img",{src:m,style:{height:"100%"}})],-1)),P=["src"],T={setup(o){$.ajax({success:function(){$(".breadcrumb-area").attr("style","display:block !important;")}});const s=v([]);v([]),console.log(s);const r=()=>h(this,null,function*(){try{const n=yield N.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(n.status===200)s.value=n.data;else throw new Error("Network response was not ok")}catch(n){console.error("Error:",n)}var c=s._rawValue.message.parent_data.contact_number,d=s._rawValue.message.child_table_data,c=s._rawValue.message.parent_data;for(var a of d)a.image?console.log("item",a.image):console.log("no item found");console.log("responsee",c)});return x(()=>{r(),fetchPartnerLogos()}),(d,c)=>(i(),l("div",null,[f(k),e("div",E,[H,e("div",S,[(i(!0),l(I,null,V(s.value.message,a=>(i(),l("div",{class:"row",key:a.name},[a.report_image?(i(),l("div",G,[L,e("div",null,[e("img",{src:a.report_image,class:"report-image"},null,8,R)])])):u("",!0),a.report_image1?(i(),l("div",j,[z,e("div",null,[e("img",{src:a.report_image1,class:"report-image1"},null,8,C)])])):u("",!0),a.report_image2?(i(),l("div",D,[M,e("div",null,[e("img",{src:a.report_image2,class:"report-image2"},null,8,P)])])):u("",!0)]))),128))])]),f(w,{data:s.value},null,8,["data"])]))}};var K=b(T,[["__scopeId","data-v-3dc76ef3"]]);export{K as default};
