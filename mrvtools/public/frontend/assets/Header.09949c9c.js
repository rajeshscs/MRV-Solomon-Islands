var C=(e,d,a)=>new Promise((h,m)=>{var k=p=>{try{n(a.next(p))}catch(y){m(y)}},o=p=>{try{n(a.throw(p))}catch(y){m(y)}},n=p=>p.done?h(p.value):Promise.resolve(p.value).then(k,o);n((a=a.apply(e,d)).next())});import{_ as S,j as w,h as _,c as u,d as t,b as l,w as i,g as s,t as v,i as g,F as f,e as L,p as N,k as A,r as T,o as R,l as V,a as z,n as c}from"./index.c2246fe9.js";var j="/assets/mrvtools/frontend/assets/sig-coa.e277ce4c.png";const D={props:{data:{type:Array,required:!0}}},r=e=>(N("data-v-72c6750a"),e=e(),A(),e),E=r(()=>t("br",null,null,-1)),O={"data-aos":"","data-aos-delay":"50",class:"footer p-0 bg",style:{color:"aliceblue","background-color":"#001000 !important"}},F={class:"container-fluid px-5 text-start"},H={class:"row column-both"},M={class:"inner-row"},P={class:"column-one"},q={class:"col-lg-3 col-md-3 col-sm-6 column"},B={class:"site-logo",style:{padding:"12px"}},G=r(()=>t("img",{src:j,alt:"Logo",loading:"lazy",class:"img-fluid"},null,-1)),K=r(()=>t("p",{class:"text-left text-start"},null,-1)),U={class:"column-two"},J={class:"col-lg-3 col-md-3 col-sm-6",style:{width:"auto"}},Q=r(()=>t("h3",{class:""},"Contact Information",-1)),W={class:"media",style:{"max-width":"256px"}},X={key:0},Y=r(()=>t("i",{class:"mr-3 bi bi-geo-alt b text-start"},null,-1)),Z={class:"media"},tt={key:0},et=r(()=>t("i",{class:"mr-3 bi bi-envelope"},null,-1)),st={key:0,class:"media"},ot=r(()=>t("i",{class:"mr-3 bi bi-telephone"},null,-1)),at={style:{"margin-left":"22px"}},lt={class:"col-lg-3 col-md-3 col-sm-6 column"},nt=r(()=>t("h3",{class:""},"Present Pages",-1)),it={class:"list-unstyled mx-4"},ct=r(()=>t("i",{class:"mr-3 bi bi-chevron-right",style:{"font-weight":"900 !important"}},null,-1)),rt={class:"col-lg-3 col-md-3 col-sm-6 column"},dt=r(()=>t("h3",{class:""},"Our Partners",-1)),_t={class:"row m-0"},ut={key:0,class:"col-6 col-sm-5 mb-4 partner-img"},pt=["src"],mt={key:1,class:"col-6 col-sm-5 mb-4 partner-img"},gt=["src"],ht={key:2,class:"col-6 col-sm-5 mb-4 partner-img"},vt=["src"],bt={key:3,class:"col-6 col-sm-5 mb-4 partner-img"},ft=["src"],kt=r(()=>t("br",null,null,-1)),yt=r(()=>t("hr",null,null,-1)),$t=r(()=>t("div",{class:"copyright text-center pt-4"},[s(" Copyright \xA9 2022 "),t("a",{href:"#",class:"text-light"},[t("strong",null,"mrvtools.com")]),s(" All Rights Reserved ")],-1)),xt=r(()=>t("br",null,null,-1));function wt(e,d,a,h,m,k){const o=w("router-link");return _(),u(f,null,[E,t("footer",O,[t("div",F,[t("div",H,[t("div",M,[t("div",P,[t("div",q,[t("div",B,[l(o,{to:"/home"},{default:i(()=>[G]),_:1})]),K])]),t("div",U,[t("div",J,[Q,t("div",W,[a.data.message.parent_data.address?(_(),u("p",X,[Y,s(v(a.data.message.parent_data.address),1)])):g("",!0)]),t("div",Z,[a.data.message.parent_data.email?(_(),u("p",tt,[et,s(v(a.data.message.parent_data.email),1)])):g("",!0)]),a.data.message.parent_data.contact_number1||a.data.message.parent_data.contact_number2||a.data.message.parent_data.contact_number3?(_(),u("div",st,[t("p",null,[ot,s(v(a.data.message.parent_data.contact_number1)+", "+v(a.data.message.parent_data.contact_number2)+",",1)]),t("p",at,v(a.data.message.parent_data.contact_number3),1)])):g("",!0)]),t("div",lt,[nt,t("ul",it,[(_(),u(f,null,L({Home:"home",About:"about",Project:"project","Climate Change Division":"climate-change-division",Reports:"reports",Support:"support","Knowledge Resource":"knowledgeresource"},(n,p)=>t("li",{key:n},[l(o,{to:"/"+n,class:"custom-link text-start"},{default:i(()=>[ct,s(" "+v(p),1)]),_:2},1032,["to"])])),64))])]),t("div",rt,[dt,t("div",_t,[(_(!0),u(f,null,L(a.data.message,(n,p)=>(_(),u("div",{key:p,class:"partners"},[n.partner1?(_(),u("div",ut,[t("img",{src:n.partner1,alt:"",class:"img-fluid partner-logo"},null,8,pt)])):g("",!0),n.partner2?(_(),u("div",mt,[t("img",{src:n.partner2,alt:"",class:"bg-white img-fluid partner-logo"},null,8,gt)])):g("",!0),n.partner3?(_(),u("div",ht,[t("img",{src:n.partner3,alt:"",class:"img-fluid partner-logo"},null,8,vt)])):g("",!0),n.partner4?(_(),u("div",bt,[t("img",{src:n.partner4,alt:"",class:"bg-white img-fluid partner-logo"},null,8,ft)])):g("",!0)]))),128))])])])])])]),kt,yt,$t,xt])],64)}var pe=S(D,[["render",wt],["__scopeId","data-v-72c6750a"]]);const x=T([]),Ct=()=>C(void 0,null,function*(){try{const m=yield z.get("/api/method/mrvtools.mrvtools.doctype.mrvfrontend.mrvfrontend.get_all");if(m.status===200)x.value=m.data;else throw new Error("Network response was not ok")}catch(m){console.error("Error:",m)}var e=x._rawValue.message.parent_data,d=e.heading,a=x._rawValue.message.child_table_data;for(var h of a)h.image?console.log("item",h.image):console.log("no item found");console.log("response",e),console.log("response",d)});R(()=>{Ct()});function I(e){const d=document.querySelector(".custom-link.active");d&&d.classList.remove("active"),e.target.classList.add("active")}R(()=>{document.querySelectorAll(".custom-link").forEach(d=>{d.addEventListener("click",I)})});V(()=>{document.querySelectorAll(".custom-link").forEach(d=>{d.removeEventListener("click",I)})});$(function(){$(document).scroll(function(){var e=$(".navbar-fixed-top");e.toggleClass("scrolled",$(this).scrollTop()>e.height())}),$(document).scroll(function(){var e=$(".custom-link");e.toggleClass("scrolled",$(this).scrollTop()>e.height())})});const Lt={},b=e=>(N("data-v-55965a7a"),e=e(),A(),e),St={style:{display:"flex",position:"sticky",top:"0px",height:"88px","justify-content":"space-between","z-index":"99999",gap:"6","background-color":"rgb(255, 255, 255)",padding:"0 10px"}},Nt={style:{display:"flex",gap:"8px"}},At={class:"site-logo"},Rt=b(()=>t("img",{style:{color:"white"},src:j,alt:"Logo",loading:"lazy",class:"img-fluid p-2"},null,-1)),jt=b(()=>t("h2",{style:{color:"rgb(0, 0, 0)","font-weight":"700","font-size":"20px","font-family":"Inter",display:"flex","line-height":"1.5","align-items":"center","justify-content":"center","margin-left":"12px","/* flex-direction":"column"},class:"heading"},[s(" SOLOMON ISLANDS iMRV TOOL "),t("span",{style:{color:"green",margin:"0 0 0 7px"}},"FOR CLIMATE ACTIONS")],-1)),It={class:"mob-parent-nav"},Tt={class:"navbar cus-navbar desk-nav navbar-expand-lg bg navbar-light p-0"},Vt=b(()=>t("button",{style:{border:"none !important"},class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",null,[t("i",{class:"bi bi-list toggle-btn",style:{color:"rgb(39, 39, 39) !important"}})])],-1)),zt={class:"collapse navbar-collapse",id:"navbarNav"},Dt={class:"navbar-nav w-100 mr-2"},Et={class:"nav-item dropdown"},Ot=b(()=>t("a",{style:{"text-decoration":"none"},class:"nav-link dropdown-toggle text-lg",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},[t("i",{class:"bi bi-list",style:{"font-size":"20px",display:"flex"}},[t("p",{style:{"font-size":"16px","text-transform":"uppercase","font-style":"normal",margin:"0px 5px"}},"Menu "),t("i",{class:"bi bi-caret-down-fill",style:{"font-size":"13px","margin-top":"2px"}})])],-1)),Ft={class:"dropdown-menu","aria-labelledby":"navbarDropdown"},Ht=s("Home"),Mt=s("About Climate Change Division"),Pt=s("About MRV Tool"),qt=s("Project"),Bt=s("GHG Summary"),Gt=s("Support"),Kt=s("Knowledge Resource"),Ut={class:"navbar cus-navbar mobile-nav navbar-expand-lg bg navbar-light p-0"},Jt=b(()=>t("button",{style:{border:"none !important"},class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#mobileNav","aria-controls":"mobileNav","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",null,[t("i",{class:"bi bi-list toggle-btn",style:{color:"rgb(39, 39, 39) !important"}})])],-1)),Qt={class:"collapse navbar-collapse",id:"mobileNav"},Wt={class:"navbar-nav w-100"},Xt={class:"nav-item"},Yt=s("Home"),Zt=s("About Climate Change Division"),te={class:"nav-item"},ee=s("About MRV Tool"),se={class:"nav-item"},oe=s("Project"),ae=s("Reports"),le=s("Support"),ne={class:"nav-item"},ie=s("Knowledge Resource"),ce=b(()=>t("div",{style:{display:"flex","align-items":"center"}},[t("a",{href:"/login#login"},[t("button",{class:"btn custom-btn btn-md"},"Login")])],-1)),re={class:"header"};function de(e,d,a,h,m,k){const o=w("router-link"),n=w("router-view");return _(),u(f,null,[t("div",St,[t("div",Nt,[t("div",At,[l(o,{to:"/home"},{default:i(()=>[Rt]),_:1})]),jt]),t("div",It,[t("nav",Tt,[Vt,t("div",zt,[t("ul",Dt,[t("li",Et,[Ot,t("ul",Ft,[t("li",null,[l(o,{to:"/home",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/home"}])},{default:i(()=>[Ht]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/climate-change-division",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/climate-change-division"}])},{default:i(()=>[Mt]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/about",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/about"}])},{default:i(()=>[Pt]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/project",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/project"}])},{default:i(()=>[qt]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/reports",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/reports"}])},{default:i(()=>[Bt]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/support",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/support"}])},{default:i(()=>[Gt]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/knowledgeresource",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/knowledgeresource"}])},{default:i(()=>[Kt]),_:1},8,["class"])])])])])])]),t("nav",Ut,[Jt,t("div",Qt,[t("ul",Wt,[t("li",Xt,[l(o,{to:"/home",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/home"}])},{default:i(()=>[Yt]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/climate-change-division",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/climate-change-division"}])},{default:i(()=>[Zt]),_:1},8,["class"])]),t("li",te,[l(o,{to:"/about",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/about"}])},{default:i(()=>[ee]),_:1},8,["class"])]),t("li",se,[l(o,{to:"/project",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/project"}])},{default:i(()=>[oe]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/reports",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/reports"}])},{default:i(()=>[ae]),_:1},8,["class"])]),t("li",null,[l(o,{to:"/support",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/support"}])},{default:i(()=>[le]),_:1},8,["class"])]),t("li",ne,[l(o,{to:"/knowledgeresource",class:c(["custom-link text-lg",{"active-link":e.$route.path==="/knowledgeresource"}])},{default:i(()=>[ie]),_:1},8,["class"])])])])]),ce])]),t("header",re,[l(n)])],64)}var me=S(Lt,[["render",de],["__scopeId","data-v-55965a7a"]]);export{pe as F,me as H};
