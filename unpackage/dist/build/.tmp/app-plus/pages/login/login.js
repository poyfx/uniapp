(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"45e4":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},"5fcf":function(n,t,e){"use strict";e.r(t);var o=e("cdda"),i=e.n(o);for(var s in o)"default"!==s&&function(n){e.d(t,n,function(){return o[n]})}(s);t["default"]=i.a},9391:function(n,t,e){"use strict";var o=e("f8c6"),i=e.n(o);i.a},a566:function(n,t,e){"use strict";e.r(t);var o=e("45e4"),i=e("5fcf");for(var s in i)"default"!==s&&function(n){e.d(t,n,function(){return i[n]})}(s);e("9391");var u=e("2877"),a=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,"68730b40",null);t["default"]=a.exports},cdda:function(n,t,e){"use strict";(function(n,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e("2f62");s(e("1c46")),e("18d9");function s(n){return n&&n.__esModule?n:{default:n}}function u(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},o=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.forEach(function(t){a(n,t,e[t])})}return n}function a(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var r=function(){return e.e("components/m-input").then(e.bind(null,"f7ed"))},c=function(){return e.e("components/input-password").then(e.bind(null,"c959"))},l=function(){return e.e("components/m-button").then(e.bind(null,"1460"))},d=u({data:function(){return{placeholder:"用户名/手机号",placeholderPws:"请输入密码",btnType:"primary",btnDisabled:!1,btnValue:"登录",consumer:{username:"",password:""},status:"",clientId:""}},onLoad:function(n){this.status=n.val,this.showToasts(),this.getclientId()},computed:u({},(0,i.mapState)(["hasLogin","userInfo"])),methods:u({},(0,i.mapActions)(["handeLogin"]),{getclientId:function(){var t=plus.push.getClientInfo();console.log(n(JSON.stringify(t)," at pages\\login\\login.vue:72")),this.clientId=t.clientid,o.setStorage({key:"clientid",data:this.clientId}),plus.push.addEventListener("click",function(n){alert("You clicked: "+n.content)},!1)},handleLogin:function(){var t=this;if(this.getclientId(),""==this.consumer.username||null==this.consumer.username)return o.showToast({icon:"none",title:"账号不能为空"});if(""==this.consumer.password||null==this.consumer.password)return o.showToast({icon:"none",title:"密码不能为空"});this.test.post("base/login",{username:this.consumer.username,passwd:this.consumer.password,client_id:this.clientId}).then(function(e){console.log(n(e," at pages\\login\\login.vue:101"));var i=e.data,s=i.value;0==i.errorCode&&200==e.statusCode?(console.log(n(e," at pages\\login\\login.vue:105")),o.setStorage({key:"Token",data:e.data.value.token}),t.handeLogin(s),o.switchTab({url:"../index/index"})):o.showToast({title:i.message,icon:"none"})}).catch(function(t){console.log(n(t," at pages\\login\\login.vue:121")),o.showToast({title:t.errMsg,icon:"none"})})},showToasts:function(){1==this.status&&o.showToast({title:"注册已提交，审核成功后即可登录使用",position:"bottom",icon:"none"})}})},(0,i.mapMutations)(["login"]),{components:{mInput:r,pwsInput:c,mButton:l}});t.default=d}).call(this,e("0de9")["default"],e("6e42")["default"])},d64b:function(n,t,e){"use strict";(function(n){e("8790"),e("921b");o(e("66fd"));var t=o(e("a566"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},f8c6:function(n,t,e){}},[["d64b","common/runtime","common/vendor"]]]);