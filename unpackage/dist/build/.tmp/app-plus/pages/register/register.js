(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"64bf":function(e,t,o){"use strict";(function(e){o("8790"),o("921b");n(o("66fd"));var t=n(o("e73f"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},"81ae":function(e,t,o){"use strict";o.r(t);var n=o("c445"),s=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);t["default"]=s.a},a286:function(e,t,o){},c445:function(e,t,o){"use strict";(function(e,n){function s(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){return o.e("components/m-info-text/m-info-text").then(o.bind(null,"1655"))},a=function(){return o.e("components/m-info-img/m-info-img").then(o.bind(null,"8eb7"))},r=function(){return Promise.all([o.e("common/vendor"),o.e("components/setPassword/setPassword")]).then(o.bind(null,"4453"))},u=function(){return o.e("components/m-button").then(o.bind(null,"1460"))},c=function(){return o.e("components/title").then(o.bind(null,"8886"))},h={data:function(){return{titles:"注册",text:s({userName:"姓名",userId:"身份证",company:"公司",phoneNum:"手机",city:"所在城市",customerName:"客户经理",disabled:!0,companyP:"选择公司",userNameP:"请输入真实姓名",userIdP:"请输入身份证号码",phoneNumP:"电话号码",cityP:"客户经理所在城市",customerNameP:"根据选择的公司进行分配"},"disabled",!0),pws:{textValue:"登录密码",newTextValue:"确认密码",placeholder:"请输入密码",newPlaceholder:"请在此输入密码"},info:{user:"",role:"",company:"",companyId:"",userName:"",userId:"",userPhoneNum:"",userCity:"",customer:"",customerId:"",newPwd1:"",newPwd2:""},btn:{type:"primary",value:"下一步"},items:[{id:"1",value:"购油人",name:"购油人"},{id:"2",value:"提油人",name:"提油人"},{id:"3",value:"发票领取人",name:"发票领取人"}],showCompany:!1,showCoutomer:!1,users:!1,value:"",datas:[],man:[],inputValue:"",Cpage:1,page:1,pageSize:10,Cmore:!1,more:!1,checkUser:"",showCity:!1,cityDatas:[],ciytId:"",scrollTop:0,old:{scrollTop:0},cityValue:!0,phoneHeight:"",scrollheight:""}},onLoad:function(t){var o=this;this.info.userPhoneNum=t.number,e.getSystemInfo({success:function(e){o.phoneHeight=e.windowHeight,o.scrollheight=o.phoneHeight-44-44-25-49}})},methods:{chooseUser:function(){this.users=!this.users},userNameBlur:function(e){},oilByCompany:function(){this.getCompanyInfo(),this.Cmore=!0,this.datas=[],this.inputValue="",this.showCompany=!this.showCompany,e.showLoading({title:"加载中..."})},chooseCompany:function(e,t){this.info.companyId=t,this.info.company=this.datas[e].name,this.showCompany=!this.showCompany,this.getCustmerCity()},searchCompany:function(){this.Cpage=1,""!==this.inputValue&&null!==this.inputValue?(this.datas=[],this.getCompanyInfo()):(this.inputValue="",this.datas=[],this.getCompanyInfo())},getCompanyInfo:function(){var t=this;this.test.post("base/regist/listCustCompany",{search:this.inputValue,page:this.Cpage,pageSize:this.pageSize}).then(function(o){e.hideLoading(),200==o.statusCode&&0==o.data.errorCode&&(o.data.value.forEach(function(e){t.datas.push(e)}),o.data.value.length<10&&o.data.value.length>=1?t.Cmore=!1:o.data.value.length<1&&(t.Cmore=!1,e.showToast({title:"没有更多了",icon:"none",position:"bottom"})))}).catch(function(t){e.hideLoading(),e.showToast({title:"加载失败",icon:"none",position:"bottom"}),console.log(n(t," at pages\\register\\register.vue:387"))})},getCustmerCity:function(){var e=this;this.test.post("base/regist/getCustomerData",{customer_id:this.info.companyId}).then(function(t){e.info.customer=t.data.value.manager_name,e.info.userCity=t.data.value.city,""==e.info.userCity||null==e.info.userCity?e.cityValue=!1:e.cityValue=!0}).catch(function(e){console.log(n(e," at pages\\register\\register.vue:407"))})},buyAndCarry:function(){this.info.user=String(this.checkUser),this.users=!this.users},checkboxChange:function(e){this.checkUser=e.target.value;for(var t=this.items,o=e.detail.value,n=0,s=t.length;n<s;++n){var i=t[n];o.includes(i.value)?this.$set(i,"checked",!0):this.$set(i,"checked",!1)}},chooseUsersShow:function(){this.users=!this.users},getCityInfo:function(){var e=this;this.test.post("base/regist/listUserCity").then(function(t){200==t.statusCode&&0==t.data.errorCode&&t.data.value.forEach(function(t){e.cityDatas.push(t)})}).catch(function(e){console.log(n(e," at pages\\register\\register.vue:447"))})},chooseCitys:function(){this.cityDatas=[],this.showCity=!this.showCity,this.getCityInfo()},chooseCity:function(e,t){this.showCity=!this.showCity,this.info.userCity=this.cityDatas[e].name,this.ciytId=t,this.page=1},Smore:function(){this.page+=1,this.getCustomerInfo(),e.showLoading({title:"加载中..."})},mores:function(){e.showLoading({title:"加载中..."}),this.Cpage+=1,this.getCompanyInfo()},back:function(){e.navigateBack({delta:1})},goPositive:function(){var t=this,o=this.info;return""===o.user||null===o.user?e.showToast({title:"请选择角色",icon:"none",position:"bottom"}):""===o.company||null===o.company?e.showToast({title:"请选择公司",icon:"none",position:"bottom"}):""===o.userCity||null===o.userCity?e.showToast({title:"所在城市不能为空",icon:"none",position:"bottom"}):""===o.userName||null===o.userName?e.showToast({title:"姓名不能为空",icon:"none",position:"bottom"}):""===o.userId||null===o.userId?e.showToast({title:"身份证号码不能为空",icon:"none",position:"bottom"}):18!=o.userId.length?e.showToast({title:"请填写18位身份证号码",icon:"none",position:"bottom"}):""===o.userPhoneNum||null===o.userPhoneNum?e.showToast({title:"手机号码不能为空",icon:"none",position:"bottom"}):/^1[3456789]\d{9}$/.test(o.userPhoneNum)?""===o.newPwd1||null===o.newPwd1?e.showToast({title:"密码不能为空",icon:"none",position:"bottom"}):o.newPwd1.length>=6?o.newPwd1!==o.newPwd2?e.showToast({title:"两次密码不一致",icon:"none",position:"bottom"}):void(1==this.checkUser.length?("购油人"==this.checkUser[0]?this.info.role="1":"提油人"==this.checkUser[0]?this.info.role="2":this.info.role="3",e.setStorage({key:"register",data:this.info,success:function(){"购油人"==t.checkUser[0]?e.navigateTo({url:"positive/positive1?name=register&user="+t.checkUser,success:function(e){}}):e.navigateTo({url:"./uploadFace/uploadFace?name=register&user="+t.checkUser+"&length="+t.checkUser.length})}})):2==this.checkUser.length?(console.log(n(o.user," at pages\\register\\register.vue:634")),"购油人"==this.checkUser[0]&&"提油人"==this.checkUser[1]?this.info.role="1,2":"购油人"==this.checkUser[0]&&"发票领取人"==this.checkUser[1]?this.info.role="1,3":this.info.role="2,3",console.log(n(this.info.role," at pages\\register\\register.vue:642")),e.setStorage({key:"register",data:this.info,success:function(){e.navigateTo({url:"./uploadFace/uploadFace?name=register&user="+t.checkUser+"&length="+t.checkUser.length,success:function(e){}})}})):3==this.checkUser.length&&(console.log(n(o.user," at pages\\register\\register.vue:657")),this.info.role="1,2,3",console.log(n(this.info.role," at pages\\register\\register.vue:659")),e.setStorage({key:"register",data:this.info,success:function(){e.navigateTo({url:"./uploadFace/uploadFace?name=register&user="+t.checkUser+"&length="+t.checkUser.length,success:function(e){}})}}))):e.showToast({title:"密码最小不能少于6位",icon:"none",position:"bottom"}):e.showToast({title:"请填写正确的手机号码",icon:"none",position:"bottom"})}},components:{infoText:i,infoImg:a,setPassword:r,mButton:u,titles:c},computed:{}};t.default=h}).call(this,o("6e42")["default"],o("0de9")["default"])},e73f:function(e,t,o){"use strict";o.r(t);var n=o("feb3"),s=o("81ae");for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);o("ead3");var a=o("2877"),r=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,"94b5046e",null);t["default"]=r.exports},ead3:function(e,t,o){"use strict";var n=o("a286"),s=o.n(n);s.a},feb3:function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,n=(e._self._c,o("79f9"));e._isMounted||(e.e0=function(t){e.showCompany=!e.showCompany},e.e1=function(t){e.showCoutomer=!e.showCoutomer},e.e2=function(t){e.showCity=!e.showCity}),e.$mp.data=Object.assign({},{$root:{m0:n}})},s=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return s})}},[["64bf","common/runtime","common/vendor"]]]);