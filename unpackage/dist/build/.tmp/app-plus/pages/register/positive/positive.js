(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/positive/positive"],{1176:function(t,e,s){"use strict";var i=s("cd3b"),n=s.n(i);n.a},3767:function(t,e,s){"use strict";s.r(e);var i=s("b544"),n=s.n(i);for(var o in i)"default"!==o&&function(t){s.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},"5c4f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},n=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n})},a72e:function(t,e,s){"use strict";s.r(e);var i=s("5c4f"),n=s("3767");for(var o in n)"default"!==o&&function(t){s.d(e,t,function(){return n[t]})}(o);s("1176");var a=s("2877"),r=Object(a["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},b544:function(t,e,s){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(s("a7aa")),o=r(s("63eb")),a=r(s("0362"));s("71c2");function r(t){return t&&t.__esModule?t:{default:t}}var u=function(){return s.e("components/step/step").then(s.bind(null,"0e21"))},c=function(){return s.e("components/m-button").then(s.bind(null,"1460"))},p=function(){return s.e("components/twoButton/twoButton").then(s.bind(null,"a41a"))},h=function(){return Promise.all([s.e("common/vendor"),s.e("rattenking-dtpicker/rattenking-dtpicker")]).then(s.bind(null,"d6ea"))},l=function(){return Promise.all([s.e("common/vendor"),s.e("components/w-picker/w-picker")]).then(s.bind(null,"2ae5"))},g={data:function(){return{step:{value1:"第一步",value2:"第二步",value3:"第三步",value4:"第四步",active:"step-active",ago:"step-ago",kong:"",kong1:"",kong2:""},btn:{type:"primary",value:"下一步",disabled:!1,content:"上一步",commit:"提交",stepOne:!0,stepTwo:!1,stepThree:!1,stepFour:!1,Dates:!1,dates:!1},info:["上传身份证正面","上传身份证反面","上传授权委托书：","上传授权委托书："],tellinfo:["正面示例","反面示例","授权书示例"],num:0,count:0,src:n.default,ifday:!1,ifdays:!1,times:!0,timess:!0,idCardZ:"",idCardF:"",buyOil:"",takeOil:"",register:"",img:[],mode:"date",day:"2019-01-01",days:"2019-01-01"}},onLoad:function(){this.register=t.getStorageSync("register"),console.log(i(this.register," at pages\\register\\positive\\positive.vue:157"))},methods:{all:function(){if(1==this.btn.stepOne){var e=this;t.chooseImage({count:1,success:function(t){e.count=1,console.log(i(t," at pages\\register\\positive\\positive.vue:168")),e.idCardZ=t.tempFilePaths,e.src=t.tempFiles[0].path,e.img.push({name:"id_fphoto",uri:t.tempFilePaths[0]})}})}else if(1==this.btn.stepTwo){var s=this;t.chooseImage({count:1,success:function(t){console.log(i(t.tempFiles," at pages\\register\\positive\\positive.vue:185")),s.count=2,s.idCardF=t.tempFilePaths,s.src=t.tempFiles[0].path,s.img.push({name:"id_bphoto",uri:t.tempFilePaths[0]})}})}else if(1==this.btn.stepThree){var n=this;t.chooseImage({count:1,success:function(t){console.log(i(t.tempFiles," at pages\\register\\positive\\positive.vue:200")),n.count=3,n.buyOil=t.tempFilePaths,n.src=t.tempFiles[0].path,n.img.push({name:"buy_auth_photo",uri:t.tempFilePaths[0]})}})}else if(1==this.btn.stepFour){var o=this;t.chooseImage({count:1,success:function(t){console.log(i(t.tempFiles," at pages\\register\\positive\\positive.vue:215")),o.count=4,o.takeOil=t.tempFilePaths,o.src=t.tempFiles[0].path,o.img.push({name:"get_auth_photo",uri:t.tempFilePaths[0]})}})}},oneSide:function(){if(console.log(i(this.register.role," at pages\\register\\positive\\positive.vue:232")),console.log(i(this.count," at pages\\register\\positive\\positive.vue:233")),1!=this.count)return t.showToast({title:"请上传身份证正面照",icon:"none"});this.btn.stepOne=!1,this.btn.stepTwo=!0,this.num=1,this.src=o.default,this.step.active="step-ago",this.step.kong="step-active"},lastStep:function(){this.btn.stepOne=!0,this.btn.stepTwo=!1,this.num=0,this.count-=1,this.src=n.default,this.step.active="step-active",this.step.kong=""},nextStep:function(){if(console.log(i(this.count," at pages\\register\\positive\\positive.vue:262")),2!=this.count)return t.showToast({title:"请上传身份证反面照",icon:"none"});this.btn.stepTwo=!1,this.btn.stepThree=!0,this.btn.Dates=!0,this.num=2,this.src=a.default,this.step.active="step-ago",this.step.kong="step-ago",this.step.kong1="step-active"},threeStepLast:function(){this.btn.stepThree=!1,this.btn.stepTwo=!0,this.btn.Dates=!1,this.num=1,this.count-=1,this.src=o.default,this.step.active="step-ago",this.step.kong="step-active",this.step.kong1=""},threeStepNext:function(){if(console.log(i(this.register.role," at pages\\register\\positive\\positive.vue:294")),console.log(i(this.count," at pages\\register\\positive\\positive.vue:295")),3!=this.count)return t.showToast({title:"请上传购油授权书",icon:"none"});if(1==this.ifday)this.btn.stepThree=!1,this.btn.stepFour=!0,this.btn.Dates=!1,this.btn.dates=!0,this.num=2,this.src=a.default,this.step.kong="step-ago",this.step.kong1="step-ago",this.step.kong2="step-active";else if(0==this.ifday)return t.showToast({title:"请选择授权有效期",icon:"none"})},fourStepLast:function(){this.btn.stepFour=!1,this.btn.stepThree=!0,this.btn.Dates=!0,this.btn.dates=!1,this.num=2,this.count-=1,this.src=a.default,this.step.kong="step-ago",this.step.kong1="step-active",this.step.kong2=""},fourStepNext:function(){var e=this.img.map(function(t,e){return{name:t.name,uri:t.uri}});if(4!=this.count)return t.showToast({title:"请上传提油授权书",icon:"none"});if(1==this.ifdays)t.uploadFile({url:"http://dev.pjy.name:8180/api/bizcust/base/registCusmter",files:e,formData:{username:this.register.userPhoneNum,passwd:this.register.newPwd2,role:this.register.role,customer_id:this.register.companyId,manager_id:this.register.customerId,realname:this.register.userName,id_card:this.register.userId,phone:this.register.userPhoneNum,city:this.register.userCity,buy_auth_exp:this.day,get_auth_exp:this.days},success:function(e){var s=JSON.parse(e.data);console.log(i(s," at pages\\register\\positive\\positive.vue:366")),200==e.statusCode&&(10109==s.errorCode?(t.showToast({title:s.message}),t.removeStorage({key:"register"}),t.navigateTo({url:"../../login/login?val="+s.value})):t.showToast({title:s.message,icon:"none"}))}});else if(0==this.ifdays)return t.showToast({title:"请选择授权有效期",icon:"none"})},changeTimes:function(){this.times=!1,this.$refs.date.show()},changeTime:function(){this.timess=!1,this.$refs.date1.show()},onConfirm:function(t){console.log(i(t," at pages\\register\\positive\\positive.vue:412")),this.day=t.result,this.ifday=!0},onConfirms:function(t){this.days=t.result,this.ifdays=!0}},components:{step:u,mButton:c,tButton:p,ruiDatePicker:h,wPicker:l}};e.default=g}).call(this,s("6e42")["default"],s("0de9")["default"])},cd3b:function(t,e,s){}},[["e4b8","common/runtime","common/vendor"]]]);