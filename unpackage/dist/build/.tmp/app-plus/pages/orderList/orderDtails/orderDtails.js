(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/orderDtails/orderDtails"],{"14a3":function(t,e,o){"use strict";o.r(e);var r=o("4707"),s=o("fad3");for(var a in s)"default"!==a&&function(t){o.d(e,t,function(){return s[t]})}(a);o("ebf6");var n=o("2877"),i=Object(n["a"])(s["default"],r["a"],r["b"],!1,null,null,null);e["default"]=i.exports},"448b":function(t,e,o){"use strict";(function(t){o("8790"),o("921b");r(o("66fd"));var e=r(o("14a3"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("6e42")["createPage"])},4707:function(t,e,o){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},s=[];o.d(e,"a",function(){return r}),o.d(e,"b",function(){return s})},a46a:function(t,e,o){"use strict";(function(t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=o("71c2"),a=function(){return o.e("components/twoButton/twoButton").then(o.bind(null,"a41a"))},n=function(){return o.e("components/m-button").then(o.bind(null,"1460"))},i={data:function(){return{type1:"defult",type:"primary",con1:"取消订单",con2:"确认购买",btnValue:"确认已付款",closed:"关闭",dates:"2019-08-12 08:12",orderId:"",no:"",order:[],time:"",countDown:"00:00:00",disabled:!1,have:"",status:"",statusinfo:[],staypay:"staypay",showUnit:!0}},onLoad:function(t){this.orderId=t.id,this.status=t.status,this.no=t.no,this.getOrderDtails(),-2==this.status||-1==this.status||1==this.status||9==this.status||5==this.status||-3==this.status?this.have=!0:this.have=!1,-3==this.status||-1==this.status||1==this.status?this.showUnit=!1:this.showUnit=!0},methods:{getOrderDtails:function(){var e=this;this.test.post("order/query_OrderById",{id:this.orderId}).then(function(o){if(console.log(t(o," at pages\\orderList\\orderDtails\\orderDtails.vue:239")),200==o.statusCode&&0==o.data.errorCode){e.order=o.data.value,e.status=o.data.value.status,e.statusinfo=e.order.latestHis,e.time=new Date(e.order.create_time+288e5).toJSON().substr(0,16).replace("T"," ").replace(/-/g,"-"),e.dates=new Date(e.statusinfo.time+288e5).toJSON().substr(0,16).replace("T"," ").replace(/-/g,"-");var r=e.order.difference;e.cutDown(r)}}).catch(function(e){console.log(t(e," at pages\\orderList\\orderDtails\\orderDtails.vue:255"))})},cutDown:function(t){var e=this;0==t&&clearInterval(),setInterval(function(){t--,e.countDown=(0,s.formatSeconds)(t)},1e3)},sureBuy:function(t){r.redirectTo({url:"../invoice/invoice?id="+this.orderId+"&number="+t+"&no="+this.no+"&status="+this.status+"&company="+this.order.org_name+"&moeny="+this.order.total_money})},tells:function(){var e=this;this.test.post("order/com_payment",{id:this.orderId}).then(function(o){console.log(t(o," at pages\\orderList\\orderDtails\\orderDtails.vue:279")),200==o.statusCode&&0==o.data.errorCode&&e.test.post("order/query_OrderById",{id:e.orderId}).then(function(o){if(console.log(t(o," at pages\\orderList\\orderDtails\\orderDtails.vue:285")),200==o.statusCode&&0==o.data.errorCode){e.order=o.data.value,e.status=o.data.value.status,e.time=new Date(e.order.create_time+288e5).toJSON().substr(0,16).replace("T"," ").replace(/-/g,"-"),clearInterval();var r=e.order.difference;e.cutDown(r)}}).catch(function(e){console.log(t(e," at pages\\orderList\\orderDtails\\orderDtails.vue:297"))})}).catch(function(e){console.log(t(e," at pages\\orderList\\orderDtails\\orderDtails.vue:301"))})},cancelOrder:function(){var e=this;r.showModal({content:"确认取消订单",success:function(o){o.confirm?e.test.post("order/cancel_order",{id:e.orderId}).then(function(e){console.log(t(e," at pages\\orderList\\orderDtails\\orderDtails.vue:314")),200==e.statusCode&&0==e.data.errorCode?(r.redirectTo({url:"../orderList"}),r.showToast({title:"取消订单成功"})):r.showToast({title:"取消订单失败",icon:"none",position:"bottom"})}).catch(function(e){console.log(t(e," at pages\\orderList\\orderDtails\\orderDtails.vue:330"))}):o.cancel}})},closePage:function(){r.navigateBack({delta:1})},goRotate:function(){r.navigateTo({url:"./orderStatus/orderStatus?id="+this.orderId+"&user_id="+this.order.user_id+"&status="+this.status})},payment:function(){var e=this;this.test.post("order/urgent_payment",{id:this.orderId}).then(function(o){console.log(t(o," at pages\\orderList\\orderDtails\\orderDtails.vue:350")),200==o.statusCode&&0==o.data.errorCode?(e.disabled=!e.disabled,r.showToast({title:o.data.message,icon:"none",position:"bottom"})):r.showToast({title:o.data.message,icon:"none",position:"bottom"})}).catch(function(e){console.log(t(e," at pages\\orderList\\orderDtails\\orderDtails.vue:366"))})}},computed:{oilPrice:function(){return parseFloat(this.order.oil_price*this.order.count).toFixed(2)},orderPrice:function(){return(parseFloat(this.oilPrice)+this.order.ship_money).toFixed(2)}},components:{tButton:a,mButton:n}};e.default=i}).call(this,o("0de9")["default"],o("6e42")["default"])},ddf5:function(t,e,o){},ebf6:function(t,e,o){"use strict";var r=o("ddf5"),s=o.n(r);s.a},fad3:function(t,e,o){"use strict";o.r(e);var r=o("a46a"),s=o.n(r);for(var a in r)"default"!==a&&function(t){o.d(e,t,function(){return r[t]})}(a);e["default"]=s.a}},[["448b","common/runtime","common/vendor"]]]);