var L=(e,d,p)=>new Promise((v,h)=>{var k=_=>{try{s(p.next(_))}catch(y){h(y)}},a=_=>{try{s(p.throw(_))}catch(y){h(y)}},s=_=>_.done?v(_.value):Promise.resolve(_.value).then(k,a);s((p=p.apply(e,d)).next())});import{_ as S,j as C,h as c,c as r,b as t,F as f,d as x,f as o,t as b,i as g,a as l,w as n,e as T,p as N,k as R,r as V,o as j,l as z,g as D,n as i}from"./index.804e2277.js";var I="/assets/mrvtools/frontend/assets/sig-coa.e277ce4c.png";const E={props:{data:{type:Array,required:!0}}},u=e=>(N("data-v-e8175842"),e=e(),R(),e),O=u(()=>t("br",null,null,-1)),F={"data-aos":"","data-aos-delay":"50",class:"footer p-0 bg",style:{color:"aliceblue","background-color":"#001000 !important"}},M={class:"container-fluid px-5 text-start"},H={class:"row column-both"},P={class:"inner-row"},q=T('<div class="column-one" data-v-e8175842><div class="col-lg-3 col-md-3 col-sm-6" data-v-e8175842><div class="site-logo" style="padding:12px;" data-v-e8175842><img src="'+I+'" alt="Logo" loading="lazy" class="img-fluid" data-v-e8175842></div><p class="text-left text-start" data-v-e8175842></p></div></div>',1),B={class:"column-two"},K={class:"col-lg-3 col-md-3 col-sm-6",style:{width:"auto"}},U=u(()=>t("h3",{class:""},"Contact Information",-1)),G={class:"media",style:{"max-width":"256px"}},J={key:0},Q=u(()=>t("i",{class:"mr-3 bi bi-geo-alt b text-start"},null,-1)),W={class:"media"},X={key:0},Y=u(()=>t("i",{class:"mr-3 bi bi-envelope"},null,-1)),Z={key:0,class:"media"},tt=u(()=>t("i",{class:"mr-3 bi bi-telephone"},null,-1)),et={style:{"margin-left":"22px"}},st={class:"col-lg-3 col-md-3 col-sm-6"},ot=u(()=>t("h3",{class:""},"Present Pages",-1)),at={class:"list-unstyled mx-4"},lt=u(()=>t("i",{class:"mr-3 bi bi-chevron-right",style:{"font-weight":"900 !important"}},null,-1)),nt={class:"col-lg-3 col-md-3 col-sm-6"},it=u(()=>t("h3",{class:""},"Our Partners",-1)),ct={class:"row m-0"},rt={key:0,class:"col-6 col-sm-5 mb-4 partner-img"},dt=["src"],_t={key:1,class:"col-6 col-sm-5 mb-4 partner-img"},ut=["src"],pt={key:2,class:"col-6 col-sm-5 mb-4 partner-img"},ht=["src"],gt={key:3,class:"col-6 col-sm-5 mb-4 partner-img"},mt=["src"],vt=u(()=>t("hr",null,null,-1)),bt=u(()=>t("div",{class:"copyright text-center pt-4"},[o(" Copyright \xA9 2022 "),t("a",{href:"#",class:"text-light"},[t("strong",null,"mrvtools.com")]),o(" All Rights Reserved ")],-1)),ft=u(()=>t("br",null,null,-1));function kt(e,d,p,v,h,k){const a=C("router-link");return c(),r(f,null,[O,t("footer",F,[t("div",M,[t("div",H,[t("div",P,[q,t("div",B,[t("div",K,[U,(c(!0),r(f,null,x(p.data.message,s=>(c(),r("div",{key:s.name,style:{padding:"1rem 2rem"}},[t("div",G,[s.address?(c(),r("p",J,[Q,o(b(s.address),1)])):g("",!0)]),t("div",W,[s.email?(c(),r("p",X,[Y,o(b(s.email),1)])):g("",!0)]),s.contact_number1||s.contact_number2||s.contact_number3?(c(),r("div",Z,[t("p",null,[tt,o(b(s.contact_number1)+", "+b(s.contact_number2)+",",1)]),t("p",et,b(s.contact_number3),1)])):g("",!0)]))),128))]),t("div",st,[ot,t("ul",at,[(c(),r(f,null,x({Home:"home",About:"about",Project:"project","Climate Change Division":"climate-change-division",Reports:"reports",Support:"support","Knowledge Resource":"knowledgeresource"},(s,_)=>t("li",{key:s},[l(a,{to:"/"+s,class:"custom-link text-start"},{default:n(()=>[lt,o(" "+b(_),1)]),_:2},1032,["to"])])),64))])]),t("div",nt,[it,t("div",ct,[(c(!0),r(f,null,x(p.data.message,(s,_)=>(c(),r("div",{key:_,class:"partners"},[s.partner1?(c(),r("div",rt,[t("img",{src:s.partner1,alt:"",class:"img-fluid partner-logo"},null,8,dt)])):g("",!0),s.partner2?(c(),r("div",_t,[t("img",{src:s.partner2,alt:"",class:"bg-white img-fluid partner-logo"},null,8,ut)])):g("",!0),s.partner3?(c(),r("div",pt,[t("img",{src:s.partner3,alt:"",class:"img-fluid partner-logo"},null,8,ht)])):g("",!0),s.partner4?(c(),r("div",gt,[t("img",{src:s.partner4,alt:"",class:"bg-white img-fluid partner-logo"},null,8,mt)])):g("",!0)]))),128))])])])])])]),vt,bt,ft])],64)}var de=S(E,[["render",kt],["__scopeId","data-v-e8175842"]]);const w=V([]),$t=()=>L(void 0,null,function*(){try{const h=yield D.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(h.status===200)w.value=h.data;else throw new Error("Network response was not ok")}catch(h){console.error("Error:",h)}var e=w._rawValue.message.parent_data,d=e.heading,p=w._rawValue.message.child_table_data;for(var v of p)v.image?console.log("item",v.image):console.log("no item found");console.log("response",e),console.log("response",d)});j(()=>{$t()});function A(e){const d=document.querySelector(".custom-link.active");d&&d.classList.remove("active"),e.target.classList.add("active")}j(()=>{document.querySelectorAll(".custom-link").forEach(d=>{d.addEventListener("click",A)})});z(()=>{document.querySelectorAll(".custom-link").forEach(d=>{d.removeEventListener("click",A)})});$(function(){$(document).scroll(function(){var e=$(".navbar-fixed-top");e.toggleClass("scrolled",$(this).scrollTop()>e.height())}),$(document).scroll(function(){var e=$(".custom-link");e.toggleClass("scrolled",$(this).scrollTop()>e.height())})});const yt={},m=e=>(N("data-v-2dd66c2c"),e=e(),R(),e),xt={style:{display:"flex",position:"sticky",top:"0px",height:"88px","justify-content":"space-between","z-index":"99999",gap:"6","background-color":"rgb(255, 255, 255)",padding:"0 10px"}},wt={style:{display:"flex",gap:"8px"}},Ct={class:"site-logo"},Lt=m(()=>t("img",{style:{color:"white"},src:I,alt:"Logo",loading:"lazy",class:"img-fluid p-2"},null,-1)),St=m(()=>t("h2",{style:{color:"rgb(0, 0, 0)","font-weight":"700","font-size":"20px","font-family":"Inter",display:"flex","line-height":"1.5","align-items":"center","justify-content":"center","margin-left":"12px","/* flex-direction":"column"},class:"heading"},[o(" SOLOMON ISLANDS iMRV TOOL "),t("span",{style:{color:"green",margin:"0 0 0 7px"}},"FOR CLIMATE ACTIONS")],-1)),Nt={class:"mob-parent-nav"},Rt={class:"navbar cus-navbar desk-nav navbar-expand-lg bg navbar-light p-0"},jt=m(()=>t("button",{style:{border:"none !important"},class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",null,[t("i",{class:"bi bi-list toggle-btn",style:{color:"rgb(39, 39, 39) !important"}})])],-1)),It={class:"collapse navbar-collapse",id:"navbarNav"},At={class:"navbar-nav w-100 mr-2"},Tt={class:"nav-item dropdown"},Vt=m(()=>t("a",{style:{"text-decoration":"none"},class:"nav-link dropdown-toggle text-lg",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},[t("i",{class:"bi bi-list",style:{"font-size":"20px",display:"flex"}},[t("p",{style:{"font-size":"16px","text-transform":"uppercase","font-style":"normal",margin:"0px 5px"}},"Menu "),t("i",{class:"bi bi-caret-down-fill",style:{"font-size":"13px","margin-top":"2px"}})])],-1)),zt={class:"dropdown-menu","aria-labelledby":"navbarDropdown"},Dt=o("Home"),Et=o("About MRV Tool"),Ot=o("Project"),Ft=o("Climate Change Division"),Mt=o("Reports"),Ht=o("Support"),Pt=o("Knowledge Resource"),qt={class:"navbar cus-navbar mobile-nav navbar-expand-lg bg navbar-light p-0"},Bt=m(()=>t("button",{style:{border:"none !important"},class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#mobileNav","aria-controls":"mobileNav","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",null,[t("i",{class:"bi bi-list toggle-btn",style:{color:"rgb(39, 39, 39) !important"}})])],-1)),Kt={class:"collapse navbar-collapse",id:"mobileNav"},Ut={class:"navbar-nav w-100"},Gt={class:"nav-item"},Jt=o("Home"),Qt={class:"nav-item"},Wt=o("About MRV Tool"),Xt={class:"nav-item"},Yt=o("Project"),Zt=o("Climate Change Division"),te=o("Reports"),ee=o("Support"),se={class:"nav-item"},oe=o("Knowledge Resource"),ae=m(()=>t("div",{style:{display:"flex","align-items":"center"}},[t("a",{href:"/login#login"},[t("button",{class:"btn custom-btn btn-md"},"Login")])],-1)),le={class:"header"},ne=m(()=>t("section",{class:"breadcrumb-area with-overlay"},null,-1));function ie(e,d,p,v,h,k){const a=C("router-link"),s=C("router-view");return c(),r(f,null,[t("div",xt,[t("div",wt,[t("div",Ct,[l(a,{to:"/home"},{default:n(()=>[Lt]),_:1})]),St]),t("div",Nt,[t("nav",Rt,[jt,t("div",It,[t("ul",At,[t("li",Tt,[Vt,t("ul",zt,[t("li",null,[l(a,{to:"/home",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/home"}])},{default:n(()=>[Dt]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/about",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/about"}])},{default:n(()=>[Et]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/project",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/project"}])},{default:n(()=>[Ot]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/climate-change-division",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/climate-change-division"}])},{default:n(()=>[Ft]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/reports",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/reports"}])},{default:n(()=>[Mt]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/support",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/support"}])},{default:n(()=>[Ht]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/knowledgeresource",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/knowledgeresource"}])},{default:n(()=>[Pt]),_:1},8,["class"])])])])])])]),t("nav",qt,[Bt,t("div",Kt,[t("ul",Ut,[t("li",Gt,[l(a,{to:"/home",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/home"}])},{default:n(()=>[Jt]),_:1},8,["class"])]),t("li",Qt,[l(a,{to:"/about",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/about"}])},{default:n(()=>[Wt]),_:1},8,["class"])]),t("li",Xt,[l(a,{to:"/project",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/project"}])},{default:n(()=>[Yt]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/climate-change-division",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/climate-change-division"}])},{default:n(()=>[Zt]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/reports",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/reports"}])},{default:n(()=>[te]),_:1},8,["class"])]),t("li",null,[l(a,{to:"/support",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/support"}])},{default:n(()=>[ee]),_:1},8,["class"])]),t("li",se,[l(a,{to:"/knowledgeresource",class:i(["custom-link text-lg",{"active-link":e.$route.path==="/knowledgeresource"}])},{default:n(()=>[oe]),_:1},8,["class"])])])])]),ae])]),t("header",le,[ne,l(s)])],64)}var _e=S(yt,[["render",ie],["__scopeId","data-v-2dd66c2c"]]);export{de as F,_e as H};
