(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/info/apply/uploadImg/uploadImg"],{"1aca":function(o,e,t){"use strict";var i=function(){var o=this,e=o.$createElement;o._self._c},a=[];t.d(e,"a",function(){return i}),t.d(e,"b",function(){return a})},"26ed":function(o,e,t){},"2cef":function(o,e,t){"use strict";(function(o,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(t("0362"));function n(o){return o&&o.__esModule?o:{default:o}}var s=function(){return t.e("components/step/step").then(t.bind(null,"0e21"))},u=function(){return Promise.all([t.e("common/vendor"),t.e("components/w-picker/w-picker")]).then(t.bind(null,"2ae5"))},l={data:function(){return{times:!0,day:"1970-01-01",dayIs:!1,src:a.default,inputs:"",img:"",userCode:"",name:"",Token:"",faceimg:{name:"face_photo",uri:""},customer_id:""}},onLoad:function(e){this.faceimg.uri=e.faceimg,this.userCode=e.userCode,this.customer_id=e.customer_id;var t=this;o.getStorage({key:"Token",success:function(o){t.Token=o.data}})},methods:{all:function(){var e=this;o.chooseImage({count:1,sizeType:["compressed"],success:function(o){var t;e.img=[],console.log(i(o," at pages\\info\\apply\\uploadImg\\uploadImg.vue:94")),e.src=o.tempFilePaths[0],t=1==e.userCode?"buy_auth_photo":2==e.userCode?"get_auth_photo":"bill_auth_photo";var a={name:t,uri:o.tempFilePaths[0]};e.img.push(a),console.log(i(e.img," at pages\\info\\apply\\uploadImg\\uploadImg.vue:112"))}})},commit:function(){var e="http://dev.pjy.name:8170/api/bizcust/";if(""!==this.img&&null!==this.img)if(this.dayIs)if(1==this.userCode){var t=this.img.map(function(o,e){return{name:o.name,uri:o.uri}});console.log(i(t," at pages\\info\\apply\\uploadImg\\uploadImg.vue:129")),o.uploadFile({url:e+"user/oil_authorize",files:t,header:{Token:this.Token},formData:{roles:this.userCode,buy_auth_exp:this.day,customer_id:this.customer_id},success:function(e){console.log(i(e," at pages\\info\\apply\\uploadImg\\uploadImg.vue:144"));var t=JSON.parse(e.data);200==e.statusCode&&0==t.errorCode?(o.showToast({title:"申请成功，待管理员确认",icon:"none",position:"bottom"}),setTimeout(function(){o.hideToast(),o.switchTab({url:"../../info"})},1500)):o.showToast({title:t.message,icon:"none",position:"bottom"})},fail:function(o){console.log(i(o," at pages\\info\\apply\\uploadImg\\uploadImg.vue:167"))}})}else if(2==this.userCode){this.img.push(this.faceimg);var a=this.img.map(function(o,e){return{name:o.name,uri:o.uri}});o.uploadFile({url:e+"user/oil_authorize",files:a,name:this.name,header:{Token:this.Token},formData:{roles:this.userCode,get_auth_exp:this.day,customer_id:this.customer_id},success:function(e){console.log(i(e," at pages\\info\\apply\\uploadImg\\uploadImg.vue:191"));var t=JSON.parse(e.data);200==e.statusCode&&0==t.errorCode?(o.showToast({title:"申请成功，待管理员确认",icon:"none",position:"bottom"}),setTimeout(function(){o.hideToast(),o.switchTab({url:"../../info"})},1500)):o.showToast({title:t.message,icon:"none",position:"bottom"})},fail:function(o){console.log(i(o," at pages\\info\\apply\\uploadImg\\uploadImg.vue:214"))}})}else{this.img.push(this.faceimg);var n=this.img.map(function(o,e){return{name:o.name,uri:o.uri}});n.forEach(function(o){console.log(i(o," at pages\\info\\apply\\uploadImg\\uploadImg.vue:226"))}),console.log(i(n," at pages\\info\\apply\\uploadImg\\uploadImg.vue:228")),o.uploadFile({url:e+"user/oil_authorize",files:n,name:this.name,header:{Token:this.Token},formData:{roles:this.userCode,bill_auth_exp:this.day,customer_id:this.customer_id},success:function(e){var t=JSON.parse(e.data);console.log(i(t," at pages\\info\\apply\\uploadImg\\uploadImg.vue:243")),200==e.statusCode&&0==t.errorCode?(o.showToast({title:"申请成功，待管理员确认",icon:"none",position:"bottom"}),setTimeout(function(){o.hideToast(),o.switchTab({url:"../../info"})},1500)):o.showToast({title:t.message,icon:"none",position:"bottom"})},fail:function(o){console.log(i(o," at pages\\info\\apply\\uploadImg\\uploadImg.vue:266"))}})}else o.showToast({title:"请选择授权书的有效时间",icon:"none",position:"bottom"});else o.showToast({title:"上传图片不能为空",icon:"none",position:"bottom"})},changeTimes:function(){this.times=!1,this.$refs.date.show()},onConfirm:function(o){this.day=o.result,this.dayIs=!0}},components:{wPicker:u,step:s}};e.default=l}).call(this,t("6e42")["default"],t("0de9")["default"])},"4e53":function(o,e,t){"use strict";var i=t("26ed"),a=t.n(i);a.a},"63f9":function(o,e,t){"use strict";t.r(e);var i=t("2cef"),a=t.n(i);for(var n in i)"default"!==n&&function(o){t.d(e,o,function(){return i[o]})}(n);e["default"]=a.a},bfc0:function(o,e,t){"use strict";t.r(e);var i=t("1aca"),a=t("63f9");for(var n in a)"default"!==n&&function(o){t.d(e,o,function(){return a[o]})}(n);t("4e53");var s=t("2877"),u=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports},d8bc:function(o,e,t){"use strict";(function(o){t("8790"),t("921b");i(t("66fd"));var e=i(t("bfc0"));function i(o){return o&&o.__esModule?o:{default:o}}o(e.default)}).call(this,t("6e42")["createPage"])}},[["d8bc","common/runtime","common/vendor"]]]);