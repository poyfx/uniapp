(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/start"],{"0406":function(t,e,n){},"311a":function(t,e,n){"use strict";var o=n("0406"),a=n.n(o);a.a},4294:function(t,e,n){"use strict";n.r(e);var o=n("ddaa"),a=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e["default"]=a.a},c2ed:function(t,e,n){"use strict";n.r(e);var o=n("cd18"),a=n("4294");for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);n("311a");var r=n("2877"),c=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,"24a37c78",null);e["default"]=c.exports},cd18:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},ddaa:function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("0052")),u=n("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){i(t,e,n[e])})}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s={name:"Start",data:function(){return{name:"安徽石油商户中心",src:a.default}},onShow:function(){if(console.log(t(this.hasLogin," at pages\\index\\start.vue:29")),0==this.hasLogin)var e=setTimeout(function(){o.navigateTo({url:"../login/login",success:function(){clearTimeout(e)}})},2e3);else{var n=setTimeout(function(){o.switchTab({url:"index",success:function(){clearTimeout(n)}})},2e3);this.getNewInfo()}},methods:{getNewInfo:function(){this.test.post("user/get_base_data",{Token:this.Token}).then(function(t){o.setStorage({key:"userInfo",data:t.data.value})}).catch(function(e){console.log(t(e," at pages\\index\\start.vue:72"))})}},computed:c({},(0,u.mapState)(["hasLogin","userInfo","roles","Token"]))};e.default=s}).call(this,n("0de9")["default"],n("6e42")["default"])}},[["4bd2","common/runtime","common/vendor"]]]);