(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/positive/positive1"],{"0044":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(s("a7aa")),n=u(s("63eb")),o=u(s("0362")),a=s("4676"),r=s("71c2");function u(t){return t&&t.__esModule?t:{default:t}}var c=function(){return s.e("components/step/step").then(s.bind(null,"0e21"))},p=function(){return s.e("components/m-button").then(s.bind(null,"1460"))},h=function(){return s.e("components/twoButton/twoButton").then(s.bind(null,"a41a"))},l=function(){return Promise.all([s.e("common/vendor"),s.e("rattenking-dtpicker/rattenking-dtpicker")]).then(s.bind(null,"d6ea"))},g={data:function(){return{step:{value1:"第一步",value2:"第二步",value3:"第三步",active:"step-active",ago:"step-ago",kong:"",kong1:""},btn:{type:"primary",value:"下一步",disabled:!1,content:"上一步",commit:"提交",stepOne:!0,stepTwo:!1,stepThree:!1},info:["上传身份证正面","上传身份证反面","上传授权委托书："],tellinfo:["正面示例","反面示例","授权书示例"],num:0,count:0,src:i.default,day:"2019-01-01",ifday:!1,times:!0,idCardZ:"",idCardF:"",buyOil:"",register:"",img:[]}},onLoad:function(){this.register=t.getStorageSync("register"),this.day=(0,r.formatDate)(new Date)},methods:{all:function(){t.createCanvasContext("myCanvas");if(1==this.btn.stepOne){var e=this;t.chooseImage({count:1,sizeType:["compressed"],success:function(t){e.count=1,console.log(t," at pages\\register\\positive\\positive1.vue:124"),(0,a.pathToBase64)(t.tempFilePaths).then(function(t){console.log(t," at pages\\register\\positive\\positive1.vue:127"),e.idCardZ=t,e.src=t}).catch(function(e){console.log(t," at pages\\register\\positive\\positive1.vue:135")}),e.img.push({name:"file"+e.count,uri:t.tempFilePaths[0]}),e.src=t.tempFiles[0].path}})}else if(1==this.btn.stepTwo){var s=this;t.chooseImage({count:1,success:function(t){console.log(t.tempFiles," at pages\\register\\positive\\positive1.vue:150"),s.count=2,s.img.push({name:"file"+s.count,uri:t.tempFilePaths[0]}),s.src=t.tempFiles[0].path}})}else if(1==this.btn.stepThree){var i=this;t.chooseImage({count:1,success:function(t){console.log(t.tempFiles," at pages\\register\\positive\\positive1.vue:171"),i.count=3,i.img.push({name:"file"+i.count,uri:t.tempFilePaths[0]}),i.src=t.tempFiles[0].path}})}},oneSide:function(){this.btn.stepOne=!1,this.btn.stepTwo=!0,this.num=1,this.src=n.default,this.step.active="step-ago",this.step.kong="step-active"},lastStep:function(){this.btn.stepOne=!0,this.btn.stepTwo=!1,this.num=0,this.count-=1,this.src=i.default,this.active="step-active",this.kong=""},nextStep:function(){console.log(this.count," at pages\\register\\positive\\positive1.vue:235"),this.btn.stepTwo=!1,this.btn.stepThree=!0,this.btn.Dates=!0,this.num=2,this.src=o.default,this.step.active="step-ago",this.step.kong="step-ago",this.step.kong1="step-active"},threeStepLast:function(){this.btn.stepThree=!1,this.btn.stepTwo=!0,this.num=1,this.count-=1,this.src=n.default,this.step.active="step-ago",this.step.kong="step-active"},threeStepNext:function(){console.log(this.img," at pages\\register\\positive\\positive1.vue:273"),console.log(this.idCardZ," at pages\\register\\positive\\positive1.vue:274"),this.test.post("base/registCusmter",{username:this.register.userPhoneNum,passwd:this.register.newPwd2,role:this.register.role,customer_id:this.register.companyId,manager_id:this.register.customerId,realname:this.register.userName,id_card:this.register.userId,phone:this.register.userPhoneNum,city:this.register.userCity}).then(function(t){console.log(t," at pages\\register\\positive\\positive1.vue:334")}).catch(function(t){console.log(t," at pages\\register\\positive\\positive1.vue:336")})},changeTimes:function(){this.times=!1},bindChange:function(t){this.day=t,this.ifday=!0}},components:{step:c,mButton:p,tButton:h,ruiDatePicker:l}};e.default=g}).call(this,s("6e42")["default"])},"09f9":function(t,e,s){"use strict";s.r(e);var i=s("a5fd"),n=s("3dd8");for(var o in n)"default"!==o&&function(t){s.d(e,t,function(){return n[t]})}(o);s("1f45");var a=s("2877"),r=Object(a["a"])(n["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},"1f45":function(t,e,s){"use strict";var i=s("ac64"),n=s.n(i);n.a},"3dd8":function(t,e,s){"use strict";s.r(e);var i=s("0044"),n=s.n(i);for(var o in i)"default"!==o&&function(t){s.d(e,t,function(){return i[t]})}(o);e["default"]=n.a},a5fd:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},n=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n})},ac64:function(t,e,s){}},[["4825","common/runtime","common/vendor"]]]);