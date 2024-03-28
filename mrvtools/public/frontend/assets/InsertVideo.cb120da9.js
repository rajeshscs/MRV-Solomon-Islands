var g=(o,e,t)=>new Promise((p,l)=>{var s=i=>{try{a(t.next(i))}catch(d){l(d)}},r=i=>{try{a(t.throw(i))}catch(d){l(d)}},a=i=>i.done?p(i.value):Promise.resolve(i.value).then(s,r);a((t=t.apply(o,e)).next())});import{_ as D,h as c,c as _,d as y,x as F,y as k,z as w,B as C,D as S,j as m,b as u,w as n,g as f,t as N,v as U,i as v,F as E}from"./index.dddc419e.js";class A{constructor(){this.listeners={},this.failed=!1}on(e,t){this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(t)}trigger(e,t){(this.listeners[e]||[]).forEach(l=>{l.call(this,t)})}upload(e,t){return new Promise((p,l)=>{let s=new XMLHttpRequest;s.upload.addEventListener("loadstart",()=>{this.trigger("start")}),s.upload.addEventListener("progress",i=>{i.lengthComputable&&this.trigger("progress",{uploaded:i.loaded,total:i.total})}),s.upload.addEventListener("load",()=>{this.trigger("finish")}),s.addEventListener("error",()=>{this.trigger("error"),l()}),s.onreadystatechange=()=>{if(s.readyState==XMLHttpRequest.DONE){let i;if(s.status===200){let d=null;try{d=JSON.parse(s.responseText)}catch(V){d=s.responseText}let h=d.message||d;p(h)}else if(s.status===403)i=JSON.parse(s.responseText);else{this.failed=!0;try{i=JSON.parse(s.responseText)}catch(d){}}i&&i.exc&&console.error(JSON.parse(i.exc)[0]),l(i)}};const r=t.upload_endpoint||"/api/method/upload_file";s.open("POST",r,!0),s.setRequestHeader("Accept","application/json"),window.csrf_token&&window.csrf_token!=="{{ csrf_token }}"&&s.setRequestHeader("X-Frappe-CSRF-Token",window.csrf_token);let a=new FormData;e&&a.append("file",e,e.name),a.append("is_private",t.private?"1":"0"),a.append("folder",t.folder||"Home"),t.file_url&&a.append("file_url",t.file_url),t.doctype&&a.append("doctype",t.doctype),t.docname&&a.append("docname",t.docname),t.fieldname&&a.append("fieldname",t.fieldname),t.method&&a.append("method",t.method),t.type&&a.append("type",t.type),s.send(a)})}}const O={name:"FileUploader",props:["fileTypes","uploadArgs","validateFile"],data(){return{uploader:null,uploading:!1,uploaded:0,error:null,message:"",total:0,file:null,finishedUploading:!1}},computed:{progress(){let o=Math.floor(this.uploaded/this.total*100);return isNaN(o)?0:o},success(){return this.finishedUploading&&!this.error}},methods:{openFileSelector(){this.$refs.input.click()},onFileAdd(o){return g(this,null,function*(){if(this.error=null,this.file=o.target.files[0],this.file&&this.validateFile)try{let e=yield this.validateFile(this.file);e&&(this.error=e)}catch(e){this.error=e}this.error||this.uploadFile(this.file)})},uploadFile(o){return g(this,null,function*(){this.error=null,this.uploaded=0,this.total=0,this.uploader=new A,this.uploader.on("start",()=>{this.uploading=!0}),this.uploader.on("progress",e=>{this.uploaded=e.uploaded,this.total=e.total}),this.uploader.on("error",()=>{this.uploading=!1,this.error="Error Uploading File"}),this.uploader.on("finish",()=>{this.uploading=!1,this.finishedUploading=!0}),this.uploader.upload(o,this.uploadArgs||{}).then(e=>{this.$emit("success",e)}).catch(e=>{this.uploading=!1;let t="Error Uploading File";e!=null&&e._server_messages?t=JSON.parse(JSON.parse(e._server_messages)[0]).message:e!=null&&e.exc&&(t=JSON.parse(e.exc)[0].split(`
`).slice(-2,-1)[0]),this.error=t,this.$emit("failure",e)})})}}},T=["accept"];function B(o,e,t,p,l,s){return c(),_("div",null,[y("input",{ref:"input",type:"file",accept:t.fileTypes,class:"hidden",onChange:e[0]||(e[0]=(...r)=>s.onFileAdd&&s.onFileAdd(...r))},null,40,T),F(o.$slots,"default",k(w({file:l.file,uploading:l.uploading,progress:s.progress,uploaded:l.uploaded,message:l.message,error:l.error,total:l.total,success:s.success,openFileSelector:s.openFileSelector})))])}var L=D(O,[["render",B]]);const J={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addVideoDialog:{url:"",file:null,show:!1}}},components:{Button:C,Dialog:S,FileUploader:L},methods:{openDialog(){this.addVideoDialog.show=!0},onVideoSelect(o){let e=o.target.files[0];!e||(this.addVideoDialog.file=e)},addVideo(o){this.editor.chain().focus().insertContent(`<video src="${o}"></video>`).run(),this.reset()},reset(){this.addVideoDialog=this.$options.data().addVideoDialog}}},R={class:"flex items-center space-x-2"},H=f(" Remove "),q=["src"],I=f(" Insert Video "),M=f("Cancel");function P(o,e,t,p,l,s){const r=m("Button"),a=m("FileUploader"),i=m("Dialog");return c(),_(E,null,[F(o.$slots,"default",k(w({onClick:s.openDialog}))),u(i,{options:{title:"Add Video"},modelValue:l.addVideoDialog.show,"onUpdate:modelValue":e[2]||(e[2]=d=>l.addVideoDialog.show=d),onAfterLeave:s.reset},{"body-content":n(()=>[u(a,{"file-types":"video/*",onSuccess:e[0]||(e[0]=d=>l.addVideoDialog.url=d.file_url)},{default:n(({file:d,progress:h,uploading:V,openFileSelector:x})=>[y("div",R,[u(r,{onClick:x},{default:n(()=>[f(N(V?`Uploading ${h}%`:l.addVideoDialog.url?"Change Video":"Upload Video"),1)]),_:2},1032,["onClick"]),l.addVideoDialog.url?(c(),U(r,{key:0,onClick:()=>{l.addVideoDialog.url=null,l.addVideoDialog.file=null}},{default:n(()=>[H]),_:2},1032,["onClick"])):v("",!0)])]),_:1}),l.addVideoDialog.url?(c(),_("video",{key:0,src:l.addVideoDialog.url,class:"mt-2 w-full rounded-lg",type:"video/mp4",controls:""},null,8,q)):v("",!0)]),actions:n(()=>[u(r,{variant:"solid",onClick:e[1]||(e[1]=d=>s.addVideo(l.addVideoDialog.url))},{default:n(()=>[I]),_:1}),u(r,{onClick:s.reset},{default:n(()=>[M]),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var z=D(J,[["render",P]]);export{z as default};
