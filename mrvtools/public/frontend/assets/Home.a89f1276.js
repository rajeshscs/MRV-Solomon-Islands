var g=(n,t,r)=>new Promise((u,i)=>{var _=a=>{try{s(r.next(a))}catch(l){i(l)}},o=a=>{try{s(r.throw(a))}catch(l){i(l)}},s=a=>a.done?u(a.value):Promise.resolve(a.value).then(_,o);s((r=r.apply(n,t)).next())});import{_ as x}from"./pattern.23cb1e7d.js";import{F as k,H as I}from"./Header.718da2b1.js";import{r as v,o as b,a as w,c,b as m,d as e,F as f,e as E,n as h,f as N,g as y,h as p,i as C}from"./index.dddc419e.js";import{k as M}from"./KnowledgeResource.1799731c.js";import{P as V}from"./ProjectComponent.f4cf4ba0.js";const B=v([]),z=()=>g(void 0,null,function*(){try{const n=yield w.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(n.status===200)B.value=n.data;else throw new Error("Network response was not ok")}catch(n){console.error("Error:",n)}});b(()=>{z()});const F={id:"carouselExampleIndicators",class:"carousel slide","data-bs-ride":"carousel"},H={class:"carousel-inner"},P={class:"card mx-0 image-overlay cus-card",style:{height:"50rem"}},j=["src"],D=N('<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"><i style="font-size:35px;" class="bi bi-chevron-left bi-2x"></i><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"><i style="font-size:35px;" class="bi bi-chevron-right bi-2x"></i><span class="visually-hidden">Next</span></button>',2),G={"data-aos":"fade-right","data-aos-delay":"50",class:"about-area report-section about-2 fix wow fadeInUp","data-wow-delay":"0.3s",id:"reports"},R={class:"container-fluid report-top-ground"},K=e("div",{class:"pattern-background"},[e("img",{src:x,style:{height:"100%",width:"100%"}})],-1),L=e("h1",{style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"p-5 text-center"},[y(" National "),e("span",{style:{color:"green","font-weight":"700"}},"GHG"),y(" Inventory ")],-1),O={class:"container-fluid",style:{"padding-bottom":"25px"}},S={class:"parent_pops"},T=["src"],U=["src"],q=["src"],A=e("hr",{style:{"border-color":"1px #8f8f8f"}},null,-1),J=e("h1",{"data-aos":"fade-right","data-aos-delay":"100",style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"pt-5 pb-3 text-center"},[y(" Knowledge "),e("span",{style:{color:"green","font-weight":"700"}},"Resources")],-1),Q=e("br",null,null,-1),W=e("span",{class:"close"},"\xD7",-1),X=e("img",{class:"modal-content",id:"img01"},null,-1),Y=[W,X],le={setup(n){const t=v([]),r=v(!1),u=()=>g(this,null,function*(){try{const d=yield w.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(d.status===200)t.value=d.data;else throw new Error("Network response was not ok")}catch(d){console.error("Error:",d)}var o=t._rawValue.message.parent_data,s=o.heading,a=t._rawValue.message.child_table_data;for(var l of a)l.image?console.log("item",l.image):console.log("no item found");console.log("response",o),console.log("response",s)}),i=o=>{const s=document.getElementById("myModal"),a=document.getElementById("img01");s.style.display="block",$(".modal-content").attr("style","display:block;"),a.src=o,r.value=!0},_=()=>{const o=document.getElementById("myModal");o.style.display="none",r.value=!1};return b(()=>{u()}),$.ajax({success:()=>{$(".breadcrumb-area").attr("style","display:none !important;")}}),(o,s)=>(p(),c(f,null,[m(I),e("div",F,[e("div",H,[(p(!0),c(f,null,E(t.value.message.parent_data.carousel_image,(a,l)=>(p(),c("div",{key:l,class:h(["carousel-item",{active:l===0}])},[e("div",P,[a.image?(p(),c("img",{key:0,src:a.image,class:"d-block w-100 h-100 carousel_image",alt:"..."},null,8,j)):C("",!0)])],2))),128))]),D]),e("div",null,[m(V,{data:t.value},null,8,["data"]),e("div",null,[e("div",G,[e("div",R,[K,L,e("div",O,[e("div",S,[e("a",{class:"pop",onClick:s[0]||(s[0]=a=>i(t.value.message.parent_data.report_image))},[e("img",{src:t.value.message.parent_data.report_image,id:"myImg",class:"rep_image"},null,8,T)]),e("a",{class:"pop",onClick:s[1]||(s[1]=a=>i(t.value.message.parent_data.report_image1))},[e("img",{src:t.value.message.parent_data.report_image1,id:"myImg",class:"rep_image"},null,8,U)]),e("a",{class:"pop",onClick:s[2]||(s[2]=a=>i(t.value.message.parent_data.report_image2))},[e("img",{src:t.value.message.parent_data.report_image2,id:"myImg",class:"rep_image"},null,8,q)])])])])])]),e("div",null,[A,J,m(M,{data:t.value},null,8,["data"]),Q])]),e("div",{id:"myModal",class:h({"full-page-modal":r.value}),onClick:_},Y,2),m(k,{data:t.value},null,8,["data"])],64))}};export{le as default};
