(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"2cf8":function(e,t,s){},"58b6":function(e,t,s){"use strict";var o=s("2cf8"),i=s.n(o);i.a},"64bf":function(e,t,s){"use strict";(function(e){s("8790"),s("921b");o(s("66fd"));var t=o(s("e73f"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,s("6e42")["createPage"])},"81ae":function(e,t,s){"use strict";s.r(t);var o=s("c445"),i=s.n(o);for(var n in o)"default"!==n&&function(e){s.d(t,e,function(){return o[e]})}(n);t["default"]=i.a},c445:function(e,t,s){"use strict";(function(e,o){function i(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){return s.e("components/m-info-text/m-info-text").then(s.bind(null,"1655"))},a=function(){return s.e("components/m-info-img/m-info-img").then(s.bind(null,"8eb7"))},r=function(){return Promise.all([s.e("common/vendor"),s.e("components/setPassword/setPassword")]).then(s.bind(null,"4453"))},u=function(){return s.e("components/m-button").then(s.bind(null,"1460"))},c=function(){return s.e("components/title").then(s.bind(null,"8886"))},h={data:function(){return{titles:"注册",text:i({userName:"姓名",userId:"身份证",company:"公司",phoneNum:"手机",city:"所在城市",customerName:"客户经理",disabled:!0,companyP:"选择公司",userNameP:"姓名",userIdP:"身份证号码",phoneNumP:"电话号码",cityP:"所在城市",customerNameP:"请选择客户经理"},"disabled",!0),pws:{textValue:"登录密码",newTextValue:"确认密码",placeholder:"请输入密码",newPlaceholder:"请在此输入密码"},info:{user:"",role:"",company:"",companyId:"",userName:"",userId:"",userPhoneNum:"",userCity:"",customer:"",customerId:"",newPwd1:"",newPwd2:""},btn:{type:"primary",value:"下一步"},items:[{id:"1",value:"购油人",name:"购油人"},{id:"2",value:"提油人",name:"提油人"},{id:"3",value:"发票领取人",name:"发票领取人"}],showCompany:!1,showCoutomer:!1,users:!1,value:"",datas:[],man:[],inputValue:"",Cpage:1,page:1,pageSize:10,Cmore:!1,more:!1,checkUser:"",showCity:!1,cityDatas:[],ciytId:"",scrollTop:0,old:{scrollTop:0},barHeight:25}},methods:{chooseUser:function(){this.users=!this.users},userNameBlur:function(t){console.log(e(t," at pages\\register\\register.vue:282"))},oilByCompany:function(){this.getCompanyInfo(),this.Cmore=!0,this.datas=[],this.inputValue="",this.showCompany=!this.showCompany,o.showLoading({title:"加载中..."})},chooseCompany:function(e,t){this.info.companyId=t,this.info.company=this.datas[e].name,this.showCompany=!this.showCompany},searchCompany:function(){this.Cpage=1,""!==this.inputValue&&null!==this.inputValue?(this.datas=[],this.getCompanyInfo()):(this.inputValue="",this.datas=[],this.getCompanyInfo())},getCompanyInfo:function(){var t=this;this.test.post("base/listCustCompany",{search:this.inputValue,page:this.Cpage,pageSize:this.pageSize}).then(function(s){o.hideLoading(),console.log(e(s," at pages\\register\\register.vue:323")),200==s.statusCode&&0==s.data.errorCode&&(console.log(e(s," at pages\\register\\register.vue:325")),s.data.value.forEach(function(e){t.datas.push(e)}),s.data.value.length<10&&s.data.value.length>0&&(t.Cmore=!1,o.showToast({title:"没有更多了",icon:"none"})))}).catch(function(t){o.hideLoading(),o.showToast({title:"加载失败",icon:"none"}),console.log(e(t," at pages\\register\\register.vue:343"))})},buyAndCarry:function(){this.info.user=String(this.checkUser),this.users=!this.users},checkboxChange:function(e){this.checkUser=e.target.value;for(var t=this.items,s=e.detail.value,o=0,i=t.length;o<i;++o){var n=t[o];s.includes(n.value)?this.$set(n,"checked",!0):this.$set(n,"checked",!1)}},chooseUsersShow:function(){this.users=!this.users},getCityInfo:function(){var t=this;this.test.post("base/listUserCity").then(function(s){console.log(e(s," at pages\\register\\register.vue:377")),200==s.statusCode&&0==s.data.errorCode&&s.data.value.forEach(function(e){t.cityDatas.push(e)})}).catch(function(t){console.log(e(t," at pages\\register\\register.vue:384"))})},chooseCitys:function(){this.cityDatas=[],this.showCity=!this.showCity,this.getCityInfo()},chooseCity:function(t,s){var o=this;this.showCity=!this.showCity,this.info.userCity=this.cityDatas[t].name,this.ciytId=s,this.page=1,this.test.post("base/listManagers",{search:this.value,org_id:this.ciytId,size:this.page,pageSize:this.pageSize}).then(function(t){console.log(e(t," at pages\\register\\register.vue:404")),o.info.customer=t.data.value[0].realname,o.info.customerId=t.data.value[0].id}).catch(function(e){})},chooseCustomer:function(e){this.page=1,this.more=!0,this.value="",this.man=[],""!==this.ciytId?(o.showLoading({title:"加载中..."}),this.getCustomerInfo(),this.showCoutomer=!this.showCoutomer):o.showToast({title:"请选择所在城市",icon:"none"})},chooseCustomers:function(e,t){this.info.customerId=t,this.info.customer=this.man[e].realname,this.showCoutomer=!this.showCoutomer},searchCustomer:function(){this.page=1,""!==this.value&&null!==this.value?(this.man=[],this.getCustomerInfo()):(this.page=1,this.value="",this.man=[],this.getCustomerInfo())},getCustomerInfo:function(){var t=this;console.log(e(this.page,this.pageSize," at pages\\register\\register.vue:451")),this.test.post("base/listManagers",{search:this.value,org_id:this.ciytId,size:this.page,pageSize:this.pageSize}).then(function(s){o.hideLoading(),console.log(e(s," at pages\\register\\register.vue:459")),200==s.statusCode&&0==s.data.errorCode&&(console.log(e(s," at pages\\register\\register.vue:462")),s.data.value.forEach(function(e){t.man.push(e)}),s.data.value.length<10?t.more=!1:s.data.value.length<=0&&(t.more=!1,o.showToast({title:"没有更多了",icon:"none"})))}).catch(function(t){o.hideLoading(),o.showToast({title:"加载失败",icon:"none"}),console.log(e(t," at pages\\register\\register.vue:485"))})},Smore:function(){this.page+=1,this.getCustomerInfo(),o.showLoading({title:"加载中..."})},mores:function(){o.showLoading({title:"加载中..."}),this.Cpage+=1,this.getCompanyInfo()},back:function(){o.navigateBack({delta:1})},goPositive:function(){var t=this,s=this.info;return console.log(e(s.userName," at pages\\register\\register.vue:512")),""===s.user||null===s.user?o.showToast({title:"请选择角色",icon:"none"}):""===s.company||null===s.company?o.showToast({title:"请选择公司",icon:"none"}):""===s.userName||null===s.userName?o.showToast({title:"姓名不能为空",icon:"none"}):""===s.userId||null===s.userId?o.showToast({title:"身份证号码不能为空",icon:"none"}):18!=s.userId.length?o.showToast({title:"请填写18位身份证号码",icon:"none"}):""===s.userPhoneNum||null===s.userPhoneNum?o.showToast({title:"手机号码不能为空",icon:"none"}):/^1[3456789]\d{9}$/.test(s.userPhoneNum)?""===s.userCity||null===s.userCity?o.showToast({title:"所在城市不能为空",icon:"none"}):""===s.customer||null===s.customer?o.showToast({title:"请选择客户经理",icon:"none"}):""===s.newPwd1||null===s.newPwd1?o.showToast({title:"密码不能为空",icon:"none"}):(console.log(e(s.newPwd1.length,s.userId.length," at pages\\register\\register.vue:528")),s.newPwd1.length>=6?s.newPwd1!==s.newPwd2?o.showToast({title:"两次密码不一致",icon:"none"}):(console.log(e(this.checkUser," at pages\\register\\register.vue:531")),void(1==this.checkUser.length?(console.log(e(s.user," at pages\\register\\register.vue:533")),"购油人"==this.checkUser[0]?this.info.role="1":"提油人"==this.checkUser[0]?this.info.role="2":this.info.role="3",console.log(e(this.info.role," at pages\\register\\register.vue:541")),o.setStorage({key:"register",data:this.info,success:function(){o.navigateTo({url:"positive/positive1?name=register&user="+t.checkUser,success:function(e){}})}})):2==this.checkUser.length?(console.log(e(s.user," at pages\\register\\register.vue:556")),"购油人"==this.checkUser[0]&&"提油人"==this.checkUser[1]?this.info.role="1,2":"购油人"==this.checkUser[0]&&"发票领取人"==this.checkUser[1]?this.info.role="1,3":this.info.role="2,3",console.log(e(this.info.role," at pages\\register\\register.vue:564")),o.setStorage({key:"register",data:this.info,success:function(){o.navigateTo({url:"positive/positive2?name=register&user="+t.checkUser,success:function(e){}})}})):3==this.checkUser.length&&(console.log(e(s.user," at pages\\register\\register.vue:578")),this.info.role="1,2,3",console.log(e(this.info.role," at pages\\register\\register.vue:580")),o.setStorage({key:"register",data:this.info,success:function(){o.navigateTo({url:"positive/positive?name=register&user="+t.checkUser,success:function(e){}})}})))):o.showToast({title:"密码最小不能少于6位",icon:"none"})):o.showToast({title:"请填写正确的手机号码",icon:"none"})}},components:{infoText:n,infoImg:a,setPassword:r,mButton:u,titles:c}};t.default=h}).call(this,s("0de9")["default"],s("6e42")["default"])},e73f:function(e,t,s){"use strict";s.r(t);var o=s("e9ca"),i=s("81ae");for(var n in i)"default"!==n&&function(e){s.d(t,e,function(){return i[e]})}(n);s("58b6");var a=s("2877"),r=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,"5b3678c4",null);t["default"]=r.exports},e9ca:function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,o=(e._self._c,s("79f9"));e._isMounted||(e.e0=function(t){e.showCompany=!e.showCompany},e.e1=function(t){e.showCoutomer=!e.showCoutomer},e.e2=function(t){e.showCity=!e.showCity}),e.$mp.data=Object.assign({},{$root:{m0:o}})},i=[];s.d(t,"a",function(){return o}),s.d(t,"b",function(){return i})}},[["64bf","common/runtime","common/vendor"]]]);