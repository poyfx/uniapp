(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/start"],{4294:function(e,t,n){"use strict";n.r(t);var o=n("ddaa"),a=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=a.a},"4faa":function(e,t,n){},"737f":function(e,t,n){"use strict";var o=n("4faa"),a=n.n(o);a.a},"73f8":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},c2ed:function(e,t,n){"use strict";n.r(t);var o=n("73f8"),a=n("4294");for(var u in a)"default"!==u&&function(e){n.d(t,e,function(){return a[e]})}(u);n("737f");var r=n("2877"),c=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,"2dfa9449",null);t["default"]=c.exports},ddaa:function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("0052")),u=n("2f62");function r(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){i(e,t,n[t])})}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f={name:"Start",data:function(){return{name:"安徽石油商户中心",src:a.default}},onShow:function(){if(console.log(e(this.hasLogin," at pages\\index\\start.vue:29")),""==this.Token)var t=setTimeout(function(){o.navigateTo({url:"../login/login",success:function(){clearTimeout(t)}})},2e3);else var n=setTimeout(function(){o.switchTab({url:"index",success:function(){clearTimeout(n)}})},2e3);this.getNewInfo()},methods:{getNewInfo:function(){this.test.post("user/get_base_data",{Token:this.Token}).then(function(t){console.log(e(t," at pages\\index\\start.vue:59")),o.setStorageSync("userInfo",t.data.value)}).catch(function(t){console.log(e(t," at pages\\index\\start.vue:67"))})}},computed:c({},(0,u.mapState)(["hasLogin","userInfo","roles","Token"]))};t.default=f}).call(this,n("0de9")["default"],n("6e42")["default"])}},[["4bd2","common/runtime","common/vendor"]]]);