(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{"357c":function(o,t,e){"use strict";var n=e("e684"),s=e.n(n);s.a},"452c":function(o,t,e){"use strict";var n=function(){var o=this,t=o.$createElement,e=(o._self._c,o.__map(o.info,function(t,e){var n=String(t.is_default);return{$orig:o.__get_orig(t),m0:n}}));o.$mp.data=Object.assign({},{$root:{l0:e}})},s=[];e.d(t,"a",function(){return n}),e.d(t,"b",function(){return s})},"59a3":function(o,t,e){"use strict";e.r(t);var n=e("8aef"),s=e.n(n);for(var i in n)"default"!==i&&function(o){e.d(t,o,function(){return n[o]})}(i);t["default"]=s.a},"8aef":function(o,t,e){"use strict";(function(o,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return e.e("components/m-info-text/m-info-text").then(e.bind(null,"1655"))},i=function(){return e.e("components/m-button").then(e.bind(null,"1460"))},r={data:function(){return{company:"",productOil:"选择油品",modeOil:"选择提油方式",modePay:"请选择付款方式",address:"请选择提油方式请选择提油择提油方式",count:"",Remarks:"",show:!1,mode:!1,pay:!1,addrShow:!0,infos:{placeholder:"请输入数量",buyoilText:"购买数量(吨)",number:"number",muchOil:""},btn:{primary:"primary",btnvalue:"提交意向单"},info:[],range:0,chooseAddress:!1,getTpe:""}},onLoad:function(){this.getCompanyInfo(),this.getAddressInfo()},methods:{getCompanyInfo:function(){var t=this;this.test.post("user/order_company").then(function(e){console.log(o(e," at pages\\order\\order.vue:195")),console.log(o(e," at pages\\order\\order.vue:196")),200==e.statusCode&&0==e.data.errorCode&&(t.company=e.data.value.name)}).catch(function(t){console.log(o(t," at pages\\order\\order.vue:208"))})},payShow:function(){this.pay=!this.pay},chooseOilShowPay:function(){this.pay=!this.pay},chooseOilShow:function(){this.show=!this.show},chooseOilLeave:function(){this.mode=!this.mode},chooseOne:function(t){console.log(o(t," at pages\\order\\order.vue:227")),this.show=!this.show,this.productOil=t.target.id},pays:function(o){this.pay=!this.pay,this.modePay=o.target.id},modeShow:function(){this.mode=!this.mode},chooseTwo:function(t){console.log(o(t," at pages\\order\\order.vue:240")),this.mode=!this.mode,"配送"==t.target.id?(this.getTpe=0,this.addrShow=!0):(this.getTpe=1,this.addrShow=!1),this.modeOil=t.target.id},chooseAddr:function(){this.getAddressInfo(),this.chooseAddress=!this.chooseAddress,n.showToast({title:"选择你要收货的地址,然后点确认",icon:"none"})},getAddressInfo:function(){var t=this,e=this;this.test.post("user/getAddrList").then(function(o){200==o.statusCode&&0==o.data.errorCode&&(t.info=o.data.value,t.info.forEach(function(o){1==o.is_default&&(e.address=o.address)}))}).catch(function(t){console.log(o(t," at pages\\order\\order.vue:274"))})},setNumber:function(t){console.log(o(t," at pages\\order\\order.vue:279")),0==t?(this.count="",n.showToast({title:"购买数量不能为0",icon:"none"})):0!==t&&(this.count=this.count.replace(/^(0+)|[^\d]+/g,""))},isAddress:function(t){console.log(o(t," at pages\\order\\order.vue:296"));var e=this;n.showModal({content:"确定选择该地址为收货地址",success:function(o){if(o.confirm)e.chooseAddress=!e.chooseAddress,e.address=t;else if(o.cancel)return}})},sure:function(t){var e=this;n.showModal({title:"提示",content:"确认选择该地址为默认地址？",success:function(s){if(s.confirm){for(var i=0;i<e.info.length;i++)if(e.info[i].is_default==t.target.value){e.range=i,console.log(o(e.info[i].id," at pages\\order\\order.vue:321")),e.test.post("user/setDefaultAddr",{addr_id:e.info[i].id}).then(function(t){console.log(o(t," at pages\\order\\order.vue:325")),200==t.statusCode&&0==t.data.errorCode&&n.showToast({title:"设置成功"})});break}}else s.cancel&&(e.info="",e.getAddressInfo())}})},toBuy:function(){null!==this.productOil&&""!==this.productOil&&"选择油品"!==this.productOil?null!==this.getTpe&&""!==this.getTpe?null!==this.modePay&&""!==this.modePay&&"请选择付款方式"!==this.modePay?null!==this.count&&""!==this.count?this.test.post("order/make_order",{oil_type:this.productOil,get_type:this.getTpe,pay_type:this.modePay,count:this.count,ship_addr:this.address,remark:this.Remarks}).then(function(t){console.log(o(t," at pages\\order\\order.vue:356")),200==t.statusCode&&0==t.data.errorCode?n.redirectTo({url:"../orderList/orderList"}):n.showModal({title:"提示",content:"用户信息已失效，请重新登录",success:function(o){o.confirm,n.reLaunch({url:"../login/login"})}})}).catch(function(t){console.log(o(t," at pages\\order\\order.vue:379"))}):n.showToast({title:"请输入购油数量",icon:"none"}):n.showToast({title:"请选择付款方式",icon:"none"}):n.showToast({title:"请选择提油方式",icon:"none"}):n.showToast({title:"请选择油品",icon:"none"})}},components:{mButton:i,infoText:s},mounted:function(){setTimeout(function(){this.company="小花"},0)}};t.default=r}).call(this,e("0de9")["default"],e("6e42")["default"])},b955:function(o,t,e){"use strict";e.r(t);var n=e("452c"),s=e("59a3");for(var i in s)"default"!==i&&function(o){e.d(t,o,function(){return s[o]})}(i);e("357c");var r=e("2877"),a=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=a.exports},e684:function(o,t,e){}},[["a49c","common/runtime","common/vendor"]]]);