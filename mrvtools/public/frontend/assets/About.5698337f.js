var p=(_,s,n)=>new Promise((c,t)=>{var l=o=>{try{r(n.next(o))}catch(d){t(d)}},e=o=>{try{r(n.throw(o))}catch(d){t(d)}},r=o=>o.done?c(o.value):Promise.resolve(o.value).then(l,e);r((n=n.apply(_,s)).next())});import{F as f,H as g}from"./Header.c019c292.js";import{r as h,o as v,c as i,b as m,d as a,F as b,e as w,g as y,a as x,j as V,h as u,t as k,i as N}from"./index.ed9d4a59.js";const F=a("section",{class:"breadcrumb-area with-overlay"},null,-1),E={class:"counter-area fix area-padding",id:"about"},B={class:"container-fluid","data-aos":"fade-right","data-aos-delay":"100"},D={class:"row","data-aos":"fade-right","data-aos-delay":"100"},I=a("h2",{style:{color:"#000","font-weight":"700","font-size":"3rem","font-family":"Inter"},class:"p-5 text-center"},[y(" About"),a("span",{style:{color:"green","font-weight":"700"}}," MRV Tools")],-1),T={class:"col-md-12 col-sm-12 col-xs-12 wow fadeInLeft","data-wow-delay":"0.3s"},j={key:0,class:"about-desctiption",style:{padding:"0px 25px"}},C=a("br",null,null,-1),H=a("br",null,null,-1),A={setup(_){const s=h([]),n=()=>p(this,null,function*(){try{const e=yield x.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(e.status===200)s.value=e.data;else throw new Error("Network response was not ok");setTimeout(()=>{var r=$(".about-desctiption");if(r.length){var o=r.html();if(o){var d=o.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g,"");r.html(d)}else console.error("No HTML content found in #desctiption-1 element.")}else console.error("Element with ID #desctiption-1 not found.")},100),$.ajax({success:function(){$(".breadcrumb-area").attr("style",`display:block !important; background:url(${s.value.message.parent_data.breadcrumb_image});`)}}),console.log("extractedValue ------- ",extractedValue)}catch(e){console.error("Error:",e)}var c=s._rawValue.message.child_table_data2;for(var t of c)t.image?console.log("item",t.image):console.log("no item found");var l=s._rawValue.message.parent_data;for(var t of l)t.contact_number?console.log("item",t.contact_number):console.log("no item found");console.log("response",l),console.log("response",c)});return v(()=>{n()}),(c,t)=>{const l=V("router-view");return u(),i("div",null,[m(g),F,a("div",E,[a("div",B,[a("div",D,[I,a("div",T,[(u(!0),i(b,null,w(s.value.message,e=>(u(),i("div",{key:e.name},[e.description_1?(u(),i("div",j,k(e.description_1),1)):N("",!0)]))),128))])])])]),C,H,m(l),m(f,{data:s.value},null,8,["data"])])}}};export{A as default};
