(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{9208:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9780)}])},1292:function(e,t,n){"use strict";n.d(t,{v:function(){return u}});var a=n(5893),i=n(1664),s=n.n(i),r=n(7294);let l=e=>(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:e.size,height:e.size,fill:e.fill,children:(0,a.jsx)("path",{d:"M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"})});var d=n(7251),o=n(2038),c=n.n(o);let u=e=>{let{user:t}=e,[n,i]=(0,r.useState)(!1),o=()=>{i(!0)},u=()=>{i(!1)},_=async()=>{confirm("ログアウトしますか？")&&await (0,d.k)()};return(0,a.jsx)("div",{className:c().container,children:(0,a.jsxs)("div",{className:c().main,children:[(0,a.jsx)(s(),{href:"http://localhost:3000/",children:(0,a.jsx)("div",{className:c().maintitle,children:"連絡あんてな"})}),(0,a.jsxs)("div",{className:c().users,children:[t?(0,a.jsxs)("div",{className:c().userBtn,onMouseEnter:o,onMouseLeave:u,style:{marginTop:n?"76px":"0"},onClick:()=>{i(!n)},children:[(null==t?void 0:t.photoURL)!==void 0?(0,a.jsx)("img",{className:c().userIcon,src:t.photoURL,height:24,alt:t.displayName}):(0,a.jsx)(l,{size:18,fill:"#555"}),(0,a.jsx)("span",{className:c().userName,children:null==t?void 0:t.displayName}),(0,a.jsx)("span",{className:c().dropdownIcon,children:n?"▲":"▼"})]}):(0,a.jsx)(s(),{href:"/login",children:(0,a.jsxs)("div",{className:c().userBtn,children:[(0,a.jsx)(l,{size:18,fill:"#555"}),(0,a.jsx)("span",{className:c().userName,children:"ログイン/新規作成"})]})}),n&&(0,a.jsxs)("div",{className:c().dropdown,onMouseEnter:o,onMouseLeave:u,children:[(0,a.jsx)(s(),{href:"/mypage",children:(0,a.jsx)("div",{className:c().dropdownItem,children:"マイページ"})}),(0,a.jsx)("div",{className:c().dropdownItem,onClick:_,children:"ログアウト"})]})]})]})})}},9780:function(e,t,n){"use strict";let a;n.r(t),n.d(t,{default:function(){return N}});var i=n(5893),s=n(8583),r=n(1664),l=n.n(r),d=n(7294),o=n(1292),c=n(3376);let u="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var _={randomUUID:u};let m=new Uint8Array(16);function x(){if(!a&&!(a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(m)}let p=[];for(let e=0;e<256;++e)p.push((e+256).toString(16).slice(1));var v=function(e,t,n){if(_.randomUUID&&!t&&!e)return _.randomUUID();e=e||{};let a=e.random||(e.rng||x)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){n=n||0;for(let e=0;e<16;++e)t[n+e]=a[e];return t}return function(e,t=0){return p[e[t+0]]+p[e[t+1]]+p[e[t+2]]+p[e[t+3]]+"-"+p[e[t+4]]+p[e[t+5]]+"-"+p[e[t+6]]+p[e[t+7]]+"-"+p[e[t+8]]+p[e[t+9]]+"-"+p[e[t+10]]+p[e[t+11]]+p[e[t+12]]+p[e[t+13]]+p[e[t+14]]+p[e[t+15]]}(a)},h=n(5371),f=n(2729),j=n.n(f),N=()=>{let[e]=(0,s.KO)(h.L),[t,n]=(0,d.useState)(""),[a,r]=(0,d.useState)(""),[u,_]=(0,d.useState)(""),[m,x]=(0,d.useState)(""),[p,f]=(0,d.useState)(""),[N,g]=(0,d.useState)(""),[w,y]=(0,d.useState)(""),b=window.innerWidth<=448,[I,D]=(0,d.useState)([]);(0,d.useEffect)(()=>{let e=async()=>{let e=JSON.parse(localStorage.getItem("recentEvents"));null!==e&&D(e.slice(-2).reverse())};e()},[]);let S=async()=>{let n=v();await c.x.calendar.post({body:{appoid:n,title:t,startDate:a,endDate:u,details:m,location:p,startTime:N,endTime:w,createdAt:new Date().toISOString(),group:[]}}).then(async()=>{null!==e&&await c.x.append.post({body:{appoid:n}}),window.location.href="http://localhost:3000/event/".concat(n)})},B=e=>{let t=new Date(e),n="".concat(t.getFullYear(),"年").concat(t.getMonth()+1,"月").concat(t.getDate(),"日");return n},C=""!==t.trim()&&""!==a.trim()&&""!==u.trim()&&""!==N.trim()&&""!==w.trim();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.v,{user:e}),(0,i.jsx)("div",{className:j().upinput,children:(0,i.jsxs)("div",{className:j().container,children:[b?(0,i.jsxs)("div",{className:j().labelname,children:["すぐ作れる！",(0,i.jsx)("br",{}),"カンタン連絡共有"]}):(0,i.jsx)("div",{className:j().labelname,children:"すぐ作れる！カンタン連絡共有"}),(0,i.jsxs)("form",{onSubmit:e=>{if(!t||!a||!N||!u||!w){alert("タイトルと時間は必須です。"),e.preventDefault();return}if(new Date(u)<new Date(a)){alert("終了日は開始日以降の日付を選択してください。"),e.preventDefault();return}if(a===u&&N>w){alert("終了時間は開始時間以降の時間を選択してください。"),e.preventDefault();return}e.preventDefault(),S()},children:[(0,i.jsxs)("div",{className:j().inputer,children:[(0,i.jsxs)("div",{className:j().formGroup,children:[(0,i.jsx)("label",{htmlFor:"title",className:j().navigate,children:"1.タイトルを入力"}),(0,i.jsx)("input",{className:j().inputtitle,type:"text",value:t,onChange:e=>n(e.target.value)}),(0,i.jsx)("label",{htmlFor:"details",className:j().navigatememo,children:"メモ書き込む(任意)"}),(0,i.jsx)("textarea",{className:j().memoarea,rows:3,value:m,onChange:e=>x(e.target.value)})]}),(0,i.jsxs)("div",{className:j().formGrouptime,children:[(0,i.jsx)("label",{htmlFor:"startDate",className:j().navigate,children:"2.時間を入力する"}),(0,i.jsx)("label",{htmlFor:"startDate",className:j().navigatestart,children:"開始時間"}),(0,i.jsx)("input",{type:"date",className:j().date,value:a,onChange:e=>r(e.target.value)}),(0,i.jsx)("input",{type:"time",className:j().time,value:N,onChange:e=>g(e.target.value)}),(0,i.jsx)("label",{htmlFor:"startDate",className:j().navigateend,children:"終了時間"}),(0,i.jsx)("input",{type:"date",className:j().date,value:u,onChange:e=>_(e.target.value)}),(0,i.jsx)("input",{type:"time",className:j().time,value:w,onChange:e=>y(e.target.value)})]}),(0,i.jsxs)("div",{className:j().formGroup,children:[(0,i.jsx)("label",{htmlFor:"location",className:j().navigate,children:"場所を書き込む(任意)"}),(0,i.jsx)("input",{type:"text",className:j().inputtitle,value:p,onChange:e=>f(e.target.value)})]})]}),(0,i.jsx)("div",{children:(0,i.jsx)("div",{className:j().attention,children:"※タイトルと時間を入力しなければイベント生成は出来ません"})}),(0,i.jsx)("button",{className:j().submitButton,type:"submit",onClick:S,disabled:!C,children:"イ ベ ン ト 生 成"})]})]})}),(0,i.jsx)("div",{className:j().old2,children:(0,i.jsxs)("div",{className:j().oldmain,children:[(0,i.jsx)("div",{className:j().oldtitle,children:"最近このブラウザで関与したイベント"}),(0,i.jsx)("div",{className:j().oldevent,children:I.map(e=>{let t=JSON.parse(e);return(0,i.jsx)(l(),{className:j().eventCard,href:"/event/".concat(t.appoid),children:(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:j().eventTitle,children:t.title}),(0,i.jsx)("br",{}),"場所: ",""===t.location?"未設定":t.location,(0,i.jsx)("br",{}),B(t.startDate),t.startTime," - ",B(t.endDate),t.endTime,(0,i.jsx)("br",{})]},t.appoid)},t.appoid)})}),(0,i.jsx)(l(),{className:j().oldlink,href:"/involved",children:(0,i.jsxs)("div",{children:[">","閲覧履歴をすべて見る"]})})]})})]})}},7251:function(e,t,n){"use strict";n.d(t,{_:function(){return r},k:function(){return l}});var a=n(4857),i=n(328),s=n(3377);let r=async()=>{let e=new a.GH;e.addScope("read:user"),await (0,a.rh)((0,i.l)(),e).catch(s.F)},l=async()=>{await (0,i.l)().signOut()}},2038:function(e){e.exports={container:"BasicHeader_container__ASIaK",main:"BasicHeader_main__Vqufr",maintitle:"BasicHeader_maintitle__lyQkx",users:"BasicHeader_users__lGfKJ",userBtn:"BasicHeader_userBtn__wlK48",userIcon:"BasicHeader_userIcon__UecGa",userName:"BasicHeader_userName__KiR1h",dropdownIcon:"BasicHeader_dropdownIcon__CEuaf",dropdown:"BasicHeader_dropdown__H_eKc",dropdownItem:"BasicHeader_dropdownItem__7uCuz"}},2729:function(e){e.exports={container:"index_container___q52_",upinput:"index_upinput__j6J65",formGroup:"index_formGroup__RIyLY",formGrouptime:"index_formGrouptime__su90o",label:"index_label__4mSN7",input:"index_input__VfcNh",textarea:"index_textarea__OWcVH",submitButton:"index_submitButton__U9TKl",url:"index_url__Y9nXK",message:"index_message__TyiHs",labelname:"index_labelname__3sm4l",attention:"index_attention__C3rrW",navigate:"index_navigate__ki7kI",inputtitle:"index_inputtitle__3qq3S",inputer:"index_inputer__A_DT6",memoarea:"index_memoarea__ceocj",navigatememo:"index_navigatememo__NIjCn",navigatestart:"index_navigatestart__oc_zx",navigateend:"index_navigateend__0jgJu",date:"index_date__fbJho",time:"index_time__hQfVh",oldtitle:"index_oldtitle__qhR0m",eventList:"index_eventList__1g7zh",eventCard:"index_eventCard__Bpqyc",eventInfo:"index_eventInfo__96nHZ",eventTitle:"index_eventTitle__K0LFG",eventDate:"index_eventDate__HvQ4y",eventLocation:"index_eventLocation__Z_riD",oldevent:"index_oldevent__f_7c6",old2:"index_old2__NxfPr",oldlink:"index_oldlink__4sO2J",oldmain:"index_oldmain__I9MJR"}}},function(e){e.O(0,[664,774,888,179],function(){return e(e.s=9208)}),_N_E=e.O()}]);