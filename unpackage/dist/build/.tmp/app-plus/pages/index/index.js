(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{1831:function(n,e,t){},"5f90":function(n,e,t){"use strict";(function(n,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return Promise.all([t.e("common/vendor"),t.e("components/banner/banner")]).then(t.bind(null,"0655"))},a=function(){return t.e("components/nav/nav").then(t.bind(null,"123d"))},c={data:function(){return{title:"",tel:"15873222222",myManager:"李勇",datas:[{id:1,name:"#92",price:"$6000/吨"},{id:2,name:"#92",price:"$6000/吨"},{id:3,name:"#92",price:"$6000/吨"},{id:4,name:"#92",price:"$6000/吨"},{id:5,name:"#92",price:"$6000/吨"},{id:6,name:"#92",price:"$6000/吨"},{id:7,name:"#92",price:"$6000/吨"}]}},onLoad:function(){var e=n.isLogin();e||i.showModal({title:"请重新登录",content:"身份已过期，请重新登录",success:function(n){i.navigateTo({url:"../login/login"})}})},methods:{callPhone:function(n){i.showModal({title:"",confirmText:"呼叫",content:"呼叫客户经理-"+this.myManager,success:function(n){if(n.confirm)window.location.href="tel:"+this.tel;else if(n.cancel)return}})}},components:{banner:o,navs:a}};e.default=c}).call(this,t("c8ba"),t("6e42")["default"])},"678e":function(n,e,t){"use strict";t.r(e);var i=t("5f90"),o=t.n(i);for(var a in i)"default"!==a&&function(n){t.d(e,n,function(){return i[n]})}(a);e["default"]=o.a},a4fc:function(n,e,t){"use strict";t.r(e);var i=t("c6e7"),o=t("678e");for(var a in o)"default"!==a&&function(n){t.d(e,n,function(){return o[n]})}(a);t("b040");var c=t("2877"),r=Object(c["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},b040:function(n,e,t){"use strict";var i=t("1831"),o=t.n(i);o.a},c6e7:function(n,e,t){"use strict";var i=function(){var n=this,e=n.$createElement;n._self._c},o=[];t.d(e,"a",function(){return i}),t.d(e,"b",function(){return o})}},[["1fb7","common/runtime","common/vendor"]]]);