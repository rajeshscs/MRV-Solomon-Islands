var f=(v,t,i)=>new Promise((c,d)=>{var s=n=>{try{r(i.next(n))}catch(m){d(m)}},l=n=>{try{r(i.throw(n))}catch(m){d(m)}},r=n=>n.done?c(n.value):Promise.resolve(n.value).then(s,l);r((i=i.apply(v,t)).next())});import{_ as h}from"./pattern.23cb1e7d.js";import{F as b,H as w}from"./Header.c52ab630.js";import{k as x}from"./KnowledgeResource.2d782305.js";import{P as k}from"./ProjectComponent.5ca942c5.js";import{r as N,o as I,c as a,a as u,b as e,F as g,d as y,e as V,f as p,g as E,h as o,n as z,i as _}from"./index.6892bca8.js";const F={id:"carouselExampleIndicators",class:"carousel slide","data-bs-ride":"carousel"},H={class:"carousel-inner"},B={class:"card mx-0 image-overlay cus-card",style:{height:"50rem"}},C=["src"],P=V('<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"><i style="font-size:35px;" class="bi bi-chevron-left bi-2x"></i><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"><i style="font-size:35px;" class="bi bi-chevron-right bi-2x"></i><span class="visually-hidden">Next</span></button>',2),G={"data-aos":"fade-right","data-aos-delay":"50",class:"about-area report-section about-2 fix wow fadeInUp","data-wow-delay":"0.3s",id:"reports"},R=e("hr",{style:{"border-color":"#8f8f8f"}},null,-1),T=e("h1",{style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"p-5 text-center"},[p(" National "),e("span",{style:{color:"green","font-weight":"700"}},"GHG"),p(" Inventory ")],-1),j={class:"container-fluid"},D={key:0,class:"img p-1"},K=e("div",{class:"pattern-background"},[e("img",{src:h,style:{height:"100%"}})],-1),L=["src"],M={key:1,class:"img p-1"},S=e("div",{class:"pattern-background"},[e("img",{src:h,style:{height:"100%"}})],-1),U=["src"],q={key:2,class:"img p-1"},A=e("div",{class:"pattern-background"},[e("img",{src:h,style:{height:"100%"}})],-1),J=["src"],O=e("hr",{style:{"border-color":"1px #8f8f8f"}},null,-1),Q=e("h1",{"data-aos":"fade-right","data-aos-delay":"100",style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"pt-5 pb-3 text-center"},[p(" Knowledge "),e("span",{style:{color:"green","font-weight":"700"}},"Resources")],-1),W=e("br",null,null,-1),ae={setup(v){const t=N([]),i=()=>f(this,null,function*(){try{const r=yield E.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(r.status===200)t.value=r.data;else throw new Error("Network response was not ok")}catch(r){console.error("Error:",r)}var c=t._rawValue.message.parent_data,d=c.heading,s=t._rawValue.message.child_table_data;for(var l of s)l.image?console.log("item",l.image):console.log("no item found");console.log("response",c),console.log("response",d)});return I(()=>{i()}),setTimeout(()=>{$(".breadcrumb-area").attr("style","display:none !important;")},1e3),(c,d)=>(o(),a(g,null,[u(w),e("div",F,[e("div",H,[(o(!0),a(g,null,y(t.value.message.parent_data.carousel_image,(s,l)=>(o(),a("div",{key:l,class:z(["carousel-item",{active:l===0}])},[e("div",B,[s.image?(o(),a("img",{key:0,src:s.image,class:"d-block w-100 h-100 carousel_image",alt:"..."},null,8,C)):_("",!0)])],2))),128))]),P]),e("div",null,[u(k,{data:t.value},null,8,["data"]),e("div",null,[e("div",G,[R,T,e("div",j,[(o(!0),a(g,null,y(t.value.message,s=>(o(),a("div",{class:"row",key:s.name},[s.report_image?(o(),a("div",D,[K,e("div",null,[e("img",{src:s.report_image,class:"report-image"},null,8,L)])])):_("",!0),s.report_image1?(o(),a("div",M,[S,e("div",null,[e("img",{src:s.report_image1,class:"report-image report-image1"},null,8,U)])])):_("",!0),s.report_image2?(o(),a("div",q,[A,e("div",null,[e("img",{src:s.report_image2,class:"report-image report-image2"},null,8,J)])])):_("",!0)]))),128))])])]),e("div",null,[O,Q,u(x,{data:t.value},null,8,["data"]),W])]),u(b,{data:t.value},null,8,["data"])],64))}};export{ae as default};
