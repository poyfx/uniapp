(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/positive/positive1"],{"0044":function(e,t,i){"use strict";(function(e,s){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(i("a7aa")),o=r(i("63eb")),a=r(i("0362"));i("4676"),i("71c2");function r(e){return e&&e.__esModule?e:{default:e}}var u=function(){return i.e("components/step/step").then(i.bind(null,"0e21"))},c=function(){return i.e("components/m-button").then(i.bind(null,"1460"))},l=function(){return i.e("components/twoButton/twoButton").then(i.bind(null,"a41a"))},p=function(){return Promise.all([i.e("common/vendor"),i.e("rattenking-dtpicker/rattenking-dtpicker")]).then(i.bind(null,"d6ea"))},h=function(){return Promise.all([i.e("common/vendor"),i.e("components/w-picker/w-picker")]).then(i.bind(null,"2ae5"))},f={data:function(){return{step:{value1:"第一步",value2:"第二步",value3:"第三步",active:"step-active",ago:"step-ago",kong:"",kong1:""},btn:{type:"primary",value:"下一步",disabled:!1,content:"上一步",commit:"提交",stepOne:!0,stepTwo:!1,stepThree:!1},info:["上传身份证正面","上传身份证反面","上传授权委托书："],tellinfo:["正面示例","反面示例","授权书示例"],num:0,count:0,src:n.default,day:"2019-01-01",ifday:!1,times:!0,idCardZ:"",idCardF:"",buyOil:"",register:"",img:[],name:"",inputs:"",mode:"date"}},onLoad:function(t){this.register=e.getStorageSync("register"),this.name=t.name,console.log(s(this.register," at pages\\register\\positive\\positive1.vue:120"))},methods:{all:function(){e.createCanvasContext("myCanvas");if(1==this.btn.stepOne){var t=this;e.chooseImage({count:1,sizeType:["compressed"],success:function(e){t.count=1,t.img.push({name:"id_fphoto",uri:e.tempFilePaths[0]}),t.src=e.tempFiles[0].path}})}else if(1==this.btn.stepTwo){var i=this;e.chooseImage({count:1,success:function(e){console.log(s(e.tempFiles," at pages\\register\\positive\\positive1.vue:144")),i.count=2,i.img.push({name:"id_bphoto",uri:e.tempFilePaths[0]}),i.src=e.tempFiles[0].path}})}else if(1==this.btn.stepThree){var n=this;e.chooseImage({count:1,success:function(e){n.count=3,n.img.push({name:"buy_auth_photo",uri:e.tempFilePaths[0]}),n.src=e.tempFiles[0].path}})}},oneSide:function(){if(1!=this.count)return e.showToast({title:"请上传身份证正面照",icon:"none"});this.btn.stepOne=!1,this.btn.stepTwo=!0,this.num=1,this.src=o.default,this.step.active="step-ago",this.step.kong="step-active"},lastStep:function(){this.btn.stepOne=!0,this.btn.stepTwo=!1,this.num=0,this.count-=1,this.src=n.default,this.active="step-active",this.kong=""},nextStep:function(){if(console.log(s(this.count," at pages\\register\\positive\\positive1.vue:202")),2!=this.count)return e.showToast({title:"请上传身份证反面照",icon:"none"});this.btn.stepTwo=!1,this.btn.stepThree=!0,this.btn.Dates=!0,this.num=2,this.src=a.default,this.step.active="step-ago",this.step.kong="step-ago",this.step.kong1="step-active"},threeStepLast:function(){this.btn.stepThree=!1,this.btn.stepTwo=!0,this.num=1,this.count-=1,this.src=o.default,this.step.active="step-ago",this.step.kong="step-active"},threeStepNext:function(){if("register"==this.name){console.log(s(this.register.role," at pages\\register\\positive\\positive1.vue:233"));var t=this.img.map(function(e,t){return{name:e.name,uri:e.uri}});if(3!=this.count)return e.showToast({title:"请上传购油授权书",icon:"none"});if(1==this.ifday)e.uploadFile({url:"http://dev.pjy.name:8180/api/bizcust/base/registCusmter",files:t,fileType:"image",filePath:"",name:"file",formData:{username:this.register.userPhoneNum,passwd:this.register.newPwd2,role:this.register.role,customer_id:this.register.companyId,manager_id:this.register.customerId,realname:this.register.userName,id_card:this.register.userId,phone:this.register.userPhoneNum,city:this.register.userCity,buy_auth_exp:this.day},success:function(t){var i=JSON.parse(t.data);console.log(s(i," at pages\\register\\positive\\positive1.vue:268")),200==t.statusCode&&(10109==i.errorCode?(e.showToast({title:i.message}),e.removeStorage({key:"register"}),e.navigateTo({url:"../../login/login?val="+i.value})):e.showToast({title:i.message,icon:"none"}))}});else if(0==this.ifday)return console.log(s(this.ifday," at pages\\register\\positive\\positive1.vue:294")),e.showToast({title:"请选择授权有效期",icon:"none"})}else{console.log(s(this.register.role," at pages\\register\\positive\\positive1.vue:308"));var i=this.img.map(function(e,t){return{name:e.name,uri:e.uri}});if(3!=this.count)return e.showToast({title:"请上传购油授权书",icon:"none"});if(1==this.ifday)e.uploadFile({url:"http://dev.pjy.name:8180/api/bizcust/user/oil_authorize",files:i,fileType:"image",filePath:"",name:"file",formData:{role:2,buy_auth_exp:this.day},success:function(t){var i=JSON.parse(t.data);console.log(s(i," at pages\\register\\positive\\positive1.vue:331")),200==t.statusCode&&(10109==i.errorCode?(e.showToast({title:i.message}),e.removeStorage({key:"register"}),e.navigateTo({url:"../../../info/info?val="+i.value})):e.showToast({title:i.message,icon:"none"}))}});else if(0==this.ifday)return console.log(s(this.ifday," at pages\\register\\positive\\positive1.vue:356")),e.showToast({title:"请选择授权有效期",icon:"none"})}},changeTimes:function(){this.times=!1,this.$refs.date.show()},onConfirm:function(e){this.day=e.result,this.ifday=!0}},components:{step:u,mButton:c,tButton:l,ruiDatePicker:p,wPicker:h}};t.default=f}).call(this,i("6e42")["default"],i("0de9")["default"])},"09f9":function(e,t,i){"use strict";i.r(t);var s=i("cf13"),n=i("3dd8");for(var o in n)"default"!==o&&function(e){i.d(t,e,function(){return n[e]})}(o);i("1f45");var a=i("2877"),r=Object(a["a"])(n["default"],s["a"],s["b"],!1,null,null,null);t["default"]=r.exports},"1f45":function(e,t,i){"use strict";var s=i("ac64"),n=i.n(s);n.a},"3dd8":function(e,t,i){"use strict";i.r(t);var s=i("0044"),n=i.n(s);for(var o in s)"default"!==o&&function(e){i.d(t,e,function(){return s[e]})}(o);t["default"]=n.a},ac64:function(e,t,i){},cf13:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},n=[];i.d(t,"a",function(){return s}),i.d(t,"b",function(){return n})}},[["4825","common/runtime","common/vendor"]]]);