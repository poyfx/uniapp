(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/registerNumber"],{"35a4":function(e,t,o){"use strict";var n=o("9864"),s=o.n(n);s.a},"41ff":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},s=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return s})},"58c6":function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return o.e("components/getCode/getCode").then(o.bind(null,"a953"))},i=function(){return o.e("components/codeNum/codeNum").then(o.bind(null,"3fbc"))},u=function(){return o.e("components/m-button").then(o.bind(null,"1460"))},r={data:function(){return{placeholder:"请输入手机号码",value:"下一步",btnType:"primary",phoneNum:"",show:!0,codeNums:"",mess:"",disabled:!0,count:"60",lock:!0}},methods:{goNext:function(){var t=this;if(""!=this.phoneNum&&null!=this.phoneNum){if(""!=this.codeNums&&null!=this.codeNums)this.test.post("base/regist/confSms",{username:t.phoneNum,pswCode:t.codeNums}).then(function(o){console.log(e(o," at pages\\register\\registerNumber.vue:56")),200==o.statusCode&&0==o.data.errorCode?(n.showToast({title:"验证成功",icon:"none"}),setTimeout(function(){n.hideToast(),n.navigateTo({url:"register?number="+t.phoneNum+"&message="+t.codeNums})},1e3)):n.showToast({title:o.data.message,icon:"none",position:"bottom"})}).catch(function(t){console.log(e(t," at pages\\register\\registerNumber.vue:79"))});else if(""==this.number||null==this.number)return n.showToast({title:"验证码不能为空",icon:"none"})}else if(""==this.phoneNum||null==this.phoneNum)return n.showToast({title:"手机号码不能为空",icon:"none",position:"bottom"})},timeDown:function(e){if(0==e)return this.show=!0,this.disabled=!1,void clearTimeout;this.disabled=!0,this.count=e--;var t=this;setTimeout(function(){t.timeDown(e)},1e3)},getCodes:function(){var t=this,o=this;console.log(e(this.lock," at pages\\register\\registerNumber.vue:114"));var s=1;if(1==o.lock)if(s++,console.log(e(s," at pages\\register\\registerNumber.vue:118")),this.lock=!1,console.log(e(this.phoneNum,this.codeNums," at pages\\register\\registerNumber.vue:120")),""!=this.phoneNum&&null!=this.phoneNum){if(!/^1[3456789]\d{9}$/.test(this.phoneNum))return this.lock=!this.lock,n.showToast({title:"请填写正确的手机号码",icon:"none",position:"bottom"});this.test.post("base/regist/getSms",{username:o.phoneNum}).then(function(s){console.log(e(s," at pages\\register\\registerNumber.vue:134")),console.log(e(s.data.value," at pages\\register\\registerNumber.vue:135")),0==s.data.errorCode&&200==s.statusCode?(t.show=!o.show,n.showToast({title:"短信已发送"}),o.mess=s.data.value,o.timeDown(60),t.lock=!t.lock):(t.lock=!t.lock,n.showToast({title:s.data.message,icon:"none",position:"bottom"}))}).catch(function(t){console.log(e(t," at pages\\register\\registerNumber.vue:155"))})}else if(""==this.phoneNum||null==this.phoneNum)return this.lock=!this.lock,n.showToast({title:"手机号码不能为空",icon:"none",position:"bottom"})}},components:{getCode:s,codeNum:i,mButton:u}};t.default=r}).call(this,o("0de9")["default"],o("6e42")["default"])},"5c07":function(e,t,o){"use strict";o.r(t);var n=o("58c6"),s=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);t["default"]=s.a},8878:function(e,t,o){"use strict";(function(e){o("8790"),o("921b");n(o("66fd"));var t=n(o("a9aa"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},9864:function(e,t,o){},a9aa:function(e,t,o){"use strict";o.r(t);var n=o("41ff"),s=o("5c07");for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);o("35a4");var u=o("2877"),r=Object(u["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports}},[["8878","common/runtime","common/vendor"]]]);