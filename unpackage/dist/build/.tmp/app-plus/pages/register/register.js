(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{4077:function(e,t,o){"use strict";var s=o("e87e"),n=o.n(s);n.a},"81ae":function(e,t,o){"use strict";o.r(t);var s=o("df91"),n=o.n(s);for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);t["default"]=n.a},df91:function(e,t,o){"use strict";(function(e){function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){return o.e("components/m-info-text/m-info-text").then(o.bind(null,"1655"))},i=function(){return o.e("components/m-info-img/m-info-img").then(o.bind(null,"8eb7"))},a=function(){return o.e("components/setPassword/setPassword").then(o.bind(null,"4453"))},u=function(){return o.e("components/m-button").then(o.bind(null,"1460"))},r={data:function(){return{text:s({user:"角色",userName:"姓名",userId:"身份证",company:"公司",phoneNum:"手机",city:"所在城市",customerName:"客户经理",disabled:!0,userP:"请选择角色",companyP:"选择公司",userNameP:"姓名",userIdP:"身份证号码",phoneNumP:"电话号码",cityP:"所在城市",customerNameP:"请选择客户经理"},"disabled",!0),pws:{textValue:"登录密码",newTextValue:"确认密码",placeholder:"请输入密码",newPlaceholder:"请在此输入密码"},info:{user:"",role:"",company:"",companyId:"",userName:"",userId:"",userPhoneNum:"",userCity:"",customer:"",customerId:"",newPwd1:"",newPwd2:""},btn:{type:"primary",value:"下一步"},showCompany:!1,showCoutomer:!1,users:!1,value:"",datas:[],inputValue:"",Cpage:1,page:1,pageSize:10,Cmore:!0,more:!0}},methods:{chooseUser:function(){this.users=!this.users},userNameBlur:function(e){console.log(e," at pages\\register\\register.vue:152")},goPositive:function(){var t=this,o=this.info;return console.log(o.userName," at pages\\register\\register.vue:158"),""===o.user||null===o.user?e.showToast({title:"请选择角色",icon:"none"}):""===o.company||null===o.company?e.showToast({title:"请选择公司",icon:"none"}):""===o.userName||null===o.userName?e.showToast({title:"姓名不能为空",icon:"none"}):""===o.userId||null===o.userId?e.showToast({title:"身份证号码不能为空",icon:"none"}):18!=o.userId.length?e.showToast({title:"请填写18位身份证号码",icon:"none"}):""===o.userPhoneNum||null===o.userPhoneNum?e.showToast({title:"手机号码不能为空",icon:"none"}):/^1[3456789]\d{9}$/.test(o.userPhoneNum)?""===o.userCity||null===o.userCity?e.showToast({title:"所在城市不能为空",icon:"none"}):""===o.customer||null===o.customer?e.showToast({title:"请选择客户经理",icon:"none"}):""===o.newPwd1||null===o.newPwd1?e.showToast({title:"密码不能为空",icon:"none"}):(console.log(o.newPwd1.length,o.userId.length," at pages\\register\\register.vue:174"),o.newPwd1.length>=6?o.newPwd1!==o.newPwd2?e.showToast({title:"两次密码不一致"}):(console.log(o.user," at pages\\register\\register.vue:177"),void("购油人"==o.user?(this.info.role=1,e.navigateTo({url:"positive/positive1",success:function(o){e.setStorage({key:"register",data:t.info})}})):"购油人和提油人"==o.user?(this.info.role=3,e.navigateTo({url:"positive/positive",success:function(o){e.setStorage({key:"register",data:t.info})}})):"提油人"==o.user&&(this.info.role=2,e.navigateTo({url:"positive/positive2",success:function(o){e.setStorage({key:"register",data:t.info})}})))):e.showToast({title:"密码最小不能少于6位",icon:"none"})):e.showToast({title:"请填写正确的手机号码",icon:"none"})},oilByCompany:function(){this.getCompanyInfo(),this.showCompany=!this.showCompany},chooseCompany:function(e,t){this.info.companyId=t,this.info.company=this.datas[e].addr,this.showCompany=!this.showCompany},searchCompany:function(){this.Cpage=1,""!==this.inputValue&&null!==this.inputValue?this.getCompanyInfo():""==this.inputValue&&null==this.inputValue&&this.getCompanyInfo()},getCompanyInfo:function(){var t=this;console.log(this.Cpage,this.pageSize," at pages\\register\\register.vue:340"),this.test.post("base/listCustCompany",{search:this.inputValue,page:this.Cpage,pageSize:this.pageSize}).then(function(o){console.log(o," at pages\\register\\register.vue:346"),200==o.statusCode&&0==o.data.errorCode&&(console.log(o.data.value.length," at pages\\register\\register.vue:348"),t.datas=o.data.value,o.data.value.length<10&&o.data.value.length>0&&(t.Cmore=!1,e.showToast({title:"没有更多了",icon:"none"})))}).catch(function(e){console.log(e," at pages\\register\\register.vue:361")})},buyAndCarry:function(e){console.log(e," at pages\\register\\register.vue:368"),this.info.user=e.target.id,this.users=!this.users},chooseUsersShow:function(){this.users=!this.users},chooseCustomer:function(e){this.getCustomerInfo(),this.showCoutomer=!this.showCoutomer},chooseCustomers:function(e,t){this.info.customerId=t,this.info.customer=this.datas[e].realname,this.showCoutomer=!this.showCoutomer},searchCustomer:function(){this.page=1,""!==this.value&&null!==this.value?this.getCustomerInfo():""==this.inputValue&&null==this.inputValue&&this.getCompanyInf()},getCustomerInfo:function(){var t=this;console.log(this.page,this.pageSize," at pages\\register\\register.vue:419"),this.test.post("base/listCustManager",{search:this.value,page:this.page,pageSize:this.pageSize}).then(function(o){console.log(o," at pages\\register\\register.vue:425"),200==o.statusCode&&0==o.data.errorCode&&(t.datas=o.data.value,o.data.value.length<10&&o.data.value.length>0?t.more=!1:0==o.data.value.length&&(t.more=!1,e.showToast({title:"没有更多了",icon:"none"})))}).catch(function(e){console.log(e," at pages\\register\\register.vue:440")})},Smore:function(){this.page+=1,this.getCustomerInfo()},mores:function(){this.Cpage+=1,this.getCompanyInfo()}},components:{infoText:n,infoImg:i,setPassword:a,mButton:u}};t.default=r}).call(this,o("6e42")["default"])},e73f:function(e,t,o){"use strict";o.r(t);var s=o("f1ac"),n=o("81ae");for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);o("4077");var a=o("2877"),u=Object(a["a"])(n["default"],s["a"],s["b"],!1,null,"078a7fb9",null);t["default"]=u.exports},e87e:function(e,t,o){},f1ac:function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement,s=(e._self._c,o("79f9"));e._isMounted||(e.e0=function(t){e.showCompany=!e.showCompany},e.e1=function(t){e.showCoutomer=!e.showCoutomer}),e.$mp.data=Object.assign({},{$root:{m0:s}})},n=[];o.d(t,"a",function(){return s}),o.d(t,"b",function(){return n})}},[["64bf","common/runtime","common/vendor"]]]);