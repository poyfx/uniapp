(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/info"],{"2bc9":function(e,n,t){},"435d":function(e,n,t){"use strict";(function(e){t("8790"),t("921b");o(t("66fd"));var n=o(t("9f3c"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},"6a05":function(e,n,t){"use strict";(function(e,o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t("2f62");function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){u(e,n,t[n])})}return e}function u(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=function(){return t.e("components/m-info-text/m-info-text").then(t.bind(null,"1655"))},r=function(){return t.e("components/m-info-img/m-info-img").then(t.bind(null,"8eb7"))},c={data:function(){return{info:{text1:"姓名",userphone:"手机号",company:"",usercity:"所在城市",city:"合肥",customer:"客户经理",customerName:"李勇",apply:"申请权限",oilNum:"待提油量",address:"收货地址",editPsd:"修改密码",disabled:!0,type:"text",username:"",phoneNum:""},integral:"0",autoplay:!1,indicatorDots:!0,interval:2e3,duration:500,circular:!0,cac:{},customer_id:""}},onShow:function(){var n=e.getStorageSync("Token");null!=n&&""!=n&&void 0!=n||e.showModal({title:"提示",content:"用户信息已失效，请重新登录",success:function(n){n.confirm,e.reLaunch({url:"../login/login"})}}),this.getuserinfo()},onLoad:function(e){console.log(o(e," at pages\\info\\info.vue:150"))},methods:i({},(0,a.mapActions)(["handelOut"]),{getuserinfo:function(){var n=this;e.getStorage({key:"userInfo",success:function(e){console.log(o(e," at pages\\info\\info.vue:174")),n.cac=e.data.managers,n.customer_id=e.data.user.roles[0].customer_id,console.log(o(n.cac.length," at pages\\info\\info.vue:177")),n.cac.length<2?n.indicatorDots=!1:n.indicatorDots=!0,n.info.username=e.data.user.realname,n.info.phoneNum=e.data.user.username,n.info.city=e.data.user.city,n.info.company=e.data.user.customer_name,n.info.customerName=e.data.user.manager_name}})},toStayOil:function(){e.navigateTo({url:"./stayOil/stayOil"})},toApply:function(){e.navigateTo({url:"apply/apply?customer_id="+this.customer_id})},editAddress:function(){e.navigateTo({url:"harvestaddress/harvestaddress"})},toEditPsd:function(){e.navigateTo({url:"modify/modify"})},testing:function(){switch(e.getSystemInfoSync().platform){case"android":console.log(o("运行Android上"," at pages\\info\\info.vue:217"));var n=plus.runtime.appid,t=plus.runtime.version;console.log(o(plus.runtime.appid,plus.runtime.version," at pages\\info\\info.vue:226")),this.test.get("base/getVersion",{appid:n,version:t,type:"android"}).then(function(n){console.log(o(n," at pages\\info\\info.vue:232"));var t=n.data.value.url;200==n.statusCode&&0===n.data.errorCode&&(1==n.data.value.status?e.showModal({title:"更新提示",content:n.data.value.note,success:function(e){e.confirm&&plus.runtime.openURL(t)}}):e.showToast({title:"当前版本已经是最新版本",icon:"none"}))}).catch(function(e){console.log(o(e," at pages\\info\\info.vue:254"))});break;case"ios":console.log(o("运行iOS上"," at pages\\info\\info.vue:258"));n=plus.runtime.appid,t=plus.runtime.version;console.log(o(plus.runtime.appid,plus.runtime.version," at pages\\info\\info.vue:267")),this.test.get("base/getVersion",{appid:n,version:t,type:"ios"}).then(function(n){var t=n.data.value.url;200==n.statusCode&&0===n.data.errorCode&&1==n.data.value.status&&e.showModal({title:"更新提示",content:n.data.value.note,success:function(e){e.confirm&&plus.runtime.openURL(t)}})}).catch(function(e){console.log(o(e," at pages\\info\\info.vue:289"))});break;default:console.log(o("运行在开发者工具上"," at pages\\info\\info.vue:293"));break}},outsafe:function(){var n=this;console.log(o(this.hasLogin," at pages\\info\\info.vue:300")),this.hasLogin?e.showModal({title:"提示",content:"退出当前账号",success:function(t){if(t.confirm)n.test.post("user/logout").then(function(t){console.log(o(t," at pages\\info\\info.vue:308")),0==t.data.errorCode&&t.statusCode?(n.handelOut(),e.navigateTo({url:"../login/login"})):e.showModal({title:"提示",content:t.data.message,success:function(n){n.confirm,e.reLaunch({url:"../login/login"})}})}).catch(function(e){console.log(o(e," at pages\\info\\info.vue:332"))});else if(t.cancel)return}}):e.navigateTo({url:"../login/login"})},toFeedback:function(){e.navigateTo({url:"feedback/feedback"})}}),computed:i({},(0,a.mapState)(["hasLogin","userInfo"])),components:{infoText:s,infoImg:r}};n.default=c}).call(this,t("6e42")["default"],t("0de9")["default"])},"8bd2":function(e,n,t){"use strict";t.r(n);var o=t("6a05"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a},"9f3c":function(e,n,t){"use strict";t.r(n);var o=t("fee6"),a=t("8bd2");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("c6fb");var u=t("2877"),s=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},c6fb:function(e,n,t){"use strict";var o=t("2bc9"),a=t.n(o);a.a},fee6:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})}},[["435d","common/runtime","common/vendor"]]]);