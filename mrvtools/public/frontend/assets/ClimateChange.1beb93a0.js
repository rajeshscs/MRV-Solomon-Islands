var v=(c,e,_)=>new Promise((m,d)=>{var a=i=>{try{l(_.next(i))}catch(h){d(h)}},n=i=>{try{l(_.throw(i))}catch(h){d(h)}},l=i=>i.done?m(i.value):Promise.resolve(i.value).then(a,n);l((_=_.apply(c,e)).next())});import{F as y}from"./Footer.1546602e.js";import{H as f}from"./Header.d19f4155.js";import{_ as x,r as C,o as b,c as s,b as u,d as t,i as r,t as g,F as w,e as k,a as D,j as I,h as o,p as N,k as V,g as F}from"./index.4e324507.js";const p=c=>(N("data-v-eb3f7760"),c=c(),V(),c),T=p(()=>t("section",{class:"breadcrumb-area with-overlay"},null,-1)),H={class:"counter-area fix area-padding",id:"about"},S={class:"container-fluid",style:{padding:"0 15px"}},B=p(()=>t("div",{class:"section-headline text-center"},[t("h2",{style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"p-5 text-center"},[F("About "),t("span",{style:{color:"green","font-weight":"700"}},"Climate Change Division")])],-1)),E={class:"pr-blw-img-list image-list",style:{"list-style":"none",display:"flex"}},L={class:"par_image"},M={key:0,class:"CCDImages"},j=["src"],z={class:"par_image"},A={key:0,class:"CCDImages"},q=["src"],G={class:"par_image"},J={key:0,class:"CCDImages"},K=["src"],O={key:0,style:{color:"#000 !important"}},P={key:1,class:"CCDContent"},Q={class:"clearfix"},R={key:0,class:"side-image",style:{"list-style":"none",display:"contents",position:"relative"}},U=["src"],W={key:1,class:"CCDContent content2"},X=p(()=>t("hr",{style:{height:"30px",color:"#000","border-top":"1px solid #000"}},null,-1)),Y={class:"climate_image"},Z={key:0,style:{position:"relative",height:"25rem"},class:"ccd_list"},ee=["src"],te=p(()=>t("br",null,null,-1)),ae={key:2,class:"CCDContent content3"},se={setup(c){const e=C([]),_=()=>v(this,null,function*(){try{const a=yield D.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(console.log("response",a),console.log("response.data",a.data.message.parent_data),a.status===200)e.value=a.data;else throw new Error("Network response was not ok")}catch(a){console.error("Error:",a)}setTimeout(()=>{var a=$(".content2"),n=$(".content3");if(n.length){var l=n.html();if(l){var i=l.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g,"");n.html(i)}else console.error("No HTML content found in #desctiption-1 element.")}if(a.length){var l=a.html();if(l){var i=l.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g,"");a.html(i)}else console.error("No HTML content found in #desctiption-1 element.")}},100);var m=e._rawValue.message.CCDImages;for(var d of m)d.image?console.log("item.image",d.image):console.log("no item found")});return b(()=>{_()}),setTimeout(()=>{$(".breadcrumb-area").attr("style",`display:block !important; background:url(${e.value.message.parent_data.breadcrumb_image});`)},1e3),(m,d)=>{const a=I("router-view");return o(),s("div",null,[u(f),T,t("div",H,[t("div",S,[B,t("ul",E,[t("div",L,[e.value.message.parent_data.climate_image1?(o(),s("li",M,[t("img",{src:e.value.message.parent_data.climate_image1,style:{width:"100%",height:"auto"}},null,8,j)])):r("",!0)]),t("div",z,[e.value.message.parent_data.climate_image2?(o(),s("li",A,[t("img",{src:e.value.message.parent_data.climate_image2,style:{width:"100%",height:"auto"}},null,8,q)])):r("",!0)]),t("div",G,[e.value.message.parent_data.climate_image3?(o(),s("li",J,[t("img",{src:e.value.message.parent_data.climate_image3,style:{width:"100%",height:"auto"}},null,8,K)])):r("",!0)])]),e.value.message.parent_data.climate_change_title?(o(),s("h3",O,g(e.value.message.parent_data.climate_change_title),1)):r("",!0),e.value.message.parent_data.climate_change_division_content1?(o(),s("p",P,g(e.value.message.parent_data.climate_change_division_content1),1)):r("",!0),t("div",Q,[e.value.message.parent_data.content_image?(o(),s("li",R,[t("img",{src:e.value.message.parent_data.content_image,class:"col-md-5 float-md-end mb-3 ms-md-3 inner-side-image",alt:"...",style:{"border-radius":"7px",width:"29%",height:"28rem",padding:"0px !important","object-fit":"cover",margin:"0px 0px 37px 22px !important","box-shadow":"rgba(0, 0, 0, 0.41) 0px 0px 6px"}},null,8,U)])):r("",!0),e.value.message.parent_data.climate_change_division_content2?(o(),s("p",W,g(e.value.message.parent_data.climate_change_division_content2),1)):r("",!0)]),X,t("div",Y,[(o(!0),s(w,null,k(e.value.message.parent_data.climate_change_division_images,n=>(o(),s("ul",{key:n.image,class:"climate-image-list",style:{"list-style":"none",display:"flex"}},[n.image?(o(),s("li",Z,[t("img",{src:n.image,style:{width:"100%",height:"auto"},class:"ccd_image"},null,8,ee)])):r("",!0)]))),128))]),te,e.value.message.parent_data.climate_change_division_content3?(o(),s("p",ae,g(e.value.message.parent_data.climate_change_division_content3),1)):r("",!0)])]),u(a),u(y,{data:e.value},null,8,["data"])])}}};var re=x(se,[["__scopeId","data-v-eb3f7760"]]);export{re as default};
