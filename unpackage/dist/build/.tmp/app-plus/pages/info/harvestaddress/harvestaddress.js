(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/harvestaddress/harvestaddress"],{"25a5":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.info,function(e,n){var a=String(e.is_default);return{$orig:t.__get_orig(e),m0:a}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},3896:function(t,e,n){"use strict";n.r(e);var a=n("25a5"),o=n("81f8");for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);var r=n("2877"),i=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=i.exports},"81f8":function(t,e,n){"use strict";n.r(e);var a=n("967a"),o=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);e["default"]=o.a},"967a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{info:[],range:0}},onLoad:function(){this.getAddressInfo()},methods:{getAddressInfo:function(){var e=this;this.test.post("user/getAddrList").then(function(n){200==n.statusCode&&0==n.data.errorCode?e.info=n.data.value:t.showModal({title:"提示",content:n.data.message,success:function(e){e.confirm,t.reLaunch({url:"../../login/login"})}})}).catch(function(t){console.log(t," at pages\\info\\harvestaddress\\harvestaddress.vue:71")})},sure:function(e){var n=this;t.showModal({title:"提示",content:"确认选择该地址为默认地址？",success:function(a){if(a.confirm){for(var o=0;o<n.info.length;o++)if(n.info[o].is_default==e.target.value){n.range=o,console.log(n.info[o].id," at pages\\info\\harvestaddress\\harvestaddress.vue:84"),n.test.post("user/setDefaultAddr",{addr_id:n.info[o].id}).then(function(e){console.log(e," at pages\\info\\harvestaddress\\harvestaddress.vue:88"),200==e.statusCode&&0==e.data.errorCode&&t.showToast({title:"设置成功"})});break}}else a.cancel&&(n.info="",n.getAddressInfo())}})},newadd:function(){t.navigateTo({url:"newAddress/newAddress"})},edit:function(){},delate:function(){}}};e.default=n}).call(this,n("6e42")["default"])}},[["da71","common/runtime","common/vendor"]]]);