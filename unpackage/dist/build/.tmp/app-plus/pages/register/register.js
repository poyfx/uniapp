(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{6756:function(e,t,s){},"81ae":function(e,t,s){"use strict";s.r(t);var o=s("df91"),n=s.n(o);for(var i in o)"default"!==i&&function(e){s.d(t,e,function(){return o[e]})}(i);t["default"]=n.a},"992f":function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,o=(e._self._c,s("79f9"));e._isMounted||(e.e0=function(t){e.showCompany=!e.showCompany},e.e1=function(t){e.showCoutomer=!e.showCoutomer}),e.$mp.data=Object.assign({},{$root:{m0:o}})},n=[];s.d(t,"a",function(){return o}),s.d(t,"b",function(){return n})},b066:function(e,t,s){"use strict";var o=s("6756"),n=s.n(o);n.a},df91:function(e,t,s){"use strict";(function(e,o){function n(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return s.e("components/m-info-text/m-info-text").then(s.bind(null,"1655"))},r=function(){return s.e("components/m-info-img/m-info-img").then(s.bind(null,"8eb7"))},a=function(){return Promise.all([s.e("common/vendor"),s.e("components/setPassword/setPassword")]).then(s.bind(null,"4453"))},u=function(){return s.e("components/m-button").then(s.bind(null,"1460"))},c={data:function(){return{text:n({userName:"姓名",userId:"身份证",company:"公司",phoneNum:"手机",city:"所在城市",customerName:"客户经理",disabled:!0,companyP:"选择公司",userNameP:"姓名",userIdP:"身份证号码",phoneNumP:"电话号码",cityP:"所在城市",customerNameP:"请选择客户经理"},"disabled",!0),pws:{textValue:"登录密码",newTextValue:"确认密码",placeholder:"请输入密码",newPlaceholder:"请在此输入密码"},info:{user:"",role:"",company:"",companyId:"",userName:"",userId:"",userPhoneNum:"",userCity:"",customer:"",customerId:"",newPwd1:"",newPwd2:""},btn:{type:"primary",value:"下一步"},items:[{id:"1",value:"购油人",name:"购油人"},{id:"2",value:"提油人",name:"提油人"},{id:"3",value:"发票领取人",name:"发票领取人"}],showCompany:!1,showCoutomer:!1,users:!1,value:"",datas:[],man:[],inputValue:"",Cpage:1,page:1,pageSize:10,Cmore:!0,more:!0,checkUser:""}},methods:{chooseUser:function(){this.users=!this.users},userNameBlur:function(t){console.log(e(t," at pages\\register\\register.vue:189"))},goPositive:function(){var t=this,s=this.info;return console.log(e(s.userName," at pages\\register\\register.vue:195")),""===s.user||null===s.user?o.showToast({title:"请选择角色",icon:"none"}):""===s.company||null===s.company?o.showToast({title:"请选择公司",icon:"none"}):""===s.userName||null===s.userName?o.showToast({title:"姓名不能为空",icon:"none"}):""===s.userId||null===s.userId?o.showToast({title:"身份证号码不能为空",icon:"none"}):18!=s.userId.length?o.showToast({title:"请填写18位身份证号码",icon:"none"}):""===s.userPhoneNum||null===s.userPhoneNum?o.showToast({title:"手机号码不能为空",icon:"none"}):/^1[3456789]\d{9}$/.test(s.userPhoneNum)?""===s.userCity||null===s.userCity?o.showToast({title:"所在城市不能为空",icon:"none"}):""===s.customer||null===s.customer?o.showToast({title:"请选择客户经理",icon:"none"}):""===s.newPwd1||null===s.newPwd1?o.showToast({title:"密码不能为空",icon:"none"}):(console.log(e(s.newPwd1.length,s.userId.length," at pages\\register\\register.vue:211")),s.newPwd1.length>=6?s.newPwd1!==s.newPwd2?o.showToast({title:"两次密码不一致",icon:"none"}):(console.log(e(this.checkUser," at pages\\register\\register.vue:214")),void(1==this.checkUser.length?(console.log(e(s.user," at pages\\register\\register.vue:216")),"购油人"==this.checkUser[0]?this.info.role="1":"提油人"==this.checkUser[0]?this.info.role="2":this.info.role="3",console.log(e(this.info.role," at pages\\register\\register.vue:224")),o.setStorage({key:"register",data:this.info,success:function(){o.navigateTo({url:"positive/positive1?name=register&user="+t.checkUser,success:function(e){}})}})):2==this.checkUser.length?(console.log(e(s.user," at pages\\register\\register.vue:239")),"购油人"==this.checkUser[0]&&"提油人"==this.checkUser[1]?this.info.role="1,2":"购油人"==this.checkUser[0]&&"发票领取人"==this.checkUser[1]?this.info.role="1,3":this.info.role="2,3",console.log(e(this.info.role," at pages\\register\\register.vue:247")),o.setStorage({key:"register",data:this.info,success:function(){o.navigateTo({url:"positive/positive2?name=register&user="+t.checkUser,success:function(e){}})}})):3==this.checkUser.length&&(console.log(e(s.user," at pages\\register\\register.vue:261")),this.info.role="1,2,3",console.log(e(this.info.role," at pages\\register\\register.vue:263")),o.setStorage({key:"register",data:this.info,success:function(){o.navigateTo({url:"positive/positive?name=register&user="+t.checkUser,success:function(e){}})}})))):o.showToast({title:"密码最小不能少于6位",icon:"none"})):o.showToast({title:"请填写正确的手机号码",icon:"none"})},oilByCompany:function(){this.getCompanyInfo(),this.datas=[],this.showCompany=!this.showCompany},chooseCompany:function(e,t){this.info.companyId=t,this.info.company=this.datas[e].name,this.showCompany=!this.showCompany},searchCompany:function(){this.Cpage=1,""!==this.inputValue&&null!==this.inputValue?this.getCompanyInfo():""==this.inputValue&&null==this.inputValue&&this.getCompanyInfo()},getCompanyInfo:function(){var t=this;console.log(e(this.Cpage,this.pageSize," at pages\\register\\register.vue:383")),this.test.post("base/listCustCompany",{search:this.inputValue,page:this.Cpage,pageSize:this.pageSize}).then(function(s){console.log(e(s," at pages\\register\\register.vue:389")),200==s.statusCode&&0==s.data.errorCode&&(console.log(e(s.data.value.length," at pages\\register\\register.vue:391")),s.data.value.forEach(function(e){t.datas.push(e)}),s.data.value.length<10&&s.data.value.length>0&&(t.Cmore=!1,o.showToast({title:"没有更多了",icon:"none"})))}).catch(function(t){console.log(e(t," at pages\\register\\register.vue:404"))})},buyAndCarry:function(){this.info.user=String(this.checkUser),this.users=!this.users},checkboxChange:function(e){this.checkUser=e.target.value;for(var t=this.items,s=e.detail.value,o=0,n=t.length;o<n;++o){var i=t[o];s.includes(i.value)?this.$set(i,"checked",!0):this.$set(i,"checked",!1)}},chooseUsersShow:function(){this.users=!this.users},chooseCustomer:function(e){this.getCustomerInfo(),this.showCoutomer=!this.showCoutomer,this.man=[]},chooseCustomers:function(e,t){this.info.customerId=t,this.info.customer=this.man[e].realname,this.showCoutomer=!this.showCoutomer},searchCustomer:function(){this.page=1,""!==this.value&&null!==this.value?this.getCustomerInfo():""==this.value&&null==this.value&&this.getCustomerInfo()},getCustomerInfo:function(){var t=this;console.log(e(this.page,this.pageSize," at pages\\register\\register.vue:458")),this.test.post("base/listCustManager",{search:this.value,page:this.page,pageSize:this.pageSize}).then(function(s){console.log(e(s," at pages\\register\\register.vue:464")),200==s.statusCode&&0==s.data.errorCode&&(s.data.value.forEach(function(e){t.man.push(e)}),s.data.value.length<10&&s.data.value.length>0?t.more=!1:0==s.data.value.length&&(t.more=!1,o.showToast({title:"没有更多了",icon:"none"})))}).catch(function(t){console.log(e(t," at pages\\register\\register.vue:484"))})},Smore:function(){this.page+=1,this.getCustomerInfo()},mores:function(){this.Cpage+=1,this.getCompanyInfo()}},components:{infoText:i,infoImg:r,setPassword:a,mButton:u}};t.default=c}).call(this,s("0de9")["default"],s("6e42")["default"])},e73f:function(e,t,s){"use strict";s.r(t);var o=s("992f"),n=s("81ae");for(var i in n)"default"!==i&&function(e){s.d(t,e,function(){return n[e]})}(i);s("b066");var r=s("2877"),a=Object(r["a"])(n["default"],o["a"],o["b"],!1,null,"413311f6",null);t["default"]=a.exports}},[["64bf","common/runtime","common/vendor"]]]);