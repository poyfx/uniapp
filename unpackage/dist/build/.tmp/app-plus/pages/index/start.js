(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/start"],{"339c":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return u})},4294:function(e,t,n){"use strict";n.r(t);var o=n("ddaa"),u=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=u.a},"5d0e":function(e,t,n){},c2ed:function(e,t,n){"use strict";n.r(t);var o=n("339c"),u=n("4294");for(var a in u)"default"!==a&&function(e){n.d(t,e,function(){return u[e]})}(a);n("e722");var r=n("2877"),i=Object(r["a"])(u["default"],o["a"],o["b"],!1,null,"42ba793c",null);t["default"]=i.exports},ddaa:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(n("0052")),a=n("2f62");function r(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){c(e,t,n[t])})}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s={name:"Start",data:function(){return{name:"安徽石油商户中心",src:u.default,version:""}},onShow:function(){if(this.version=plus.runtime.version,console.log(e(this.hasLogin," at pages\\index\\start.vue:33")),0==this.hasLogin)var t=setTimeout(function(){o.navigateTo({url:"../login/login",success:function(){clearTimeout(t)}})},2e3);else{var n=setTimeout(function(){o.switchTab({url:"index",success:function(){clearTimeout(n)}})},2e3);this.getNewInfo()}},methods:{getNewInfo:function(){this.test.post("user/get_base_data",{Token:this.Token}).then(function(e){o.setStorage({key:"userInfo",data:e.data.value})}).catch(function(t){console.log(e(t," at pages\\index\\start.vue:76"))})}},computed:i({},(0,a.mapState)(["hasLogin","userInfo","roles","Token"]))};t.default=s}).call(this,n("0de9")["default"],n("6e42")["default"])},e722:function(e,t,n){"use strict";var o=n("5d0e"),u=n.n(o);u.a}},[["4bd2","common/runtime","common/vendor"]]]);