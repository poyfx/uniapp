(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/orderList"],{2172:function(e,t,o){"use strict";var r=o("f9e8"),n=o.n(r);n.a},"499d":function(e,t,o){"use strict";o.r(t);var r=o("5952"),n=o("dd41");for(var i in n)"default"!==i&&function(e){o.d(t,e,function(){return n[e]})}(i);o("2172");var s=o("2877"),a=Object(s["a"])(n["default"],r["a"],r["b"],!1,null,null,null);t["default"]=a.exports},5952:function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},n=[];o.d(t,"a",function(){return r}),o.d(t,"b",function(){return n})},"79ce":function(e,t,o){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){return o.e("common/js/xfl-select").then(o.bind(null,"d732"))},i={data:function(){return{list:[{value:"全部订单",label:0},{value:"已取消",label:-1},{value:"已完成 ",label:9},{value:"待付款",label:3},{value:"待开票",label:5},{value:"已确认价格",label:2},{value:"待确认收款",label:4}],orderNumber:"",buyTime:"",oilType:"",count:"",info:[],page:1,pageSize:10,status:0,showMore:!0,day:"",days:!1,time:[],from:"",to:""}},onLoad:function(e){this.day=e.times,this.to=e.to,this.from=e.from,this.orderNumber=e.ordernumber,this.getOrderListInfo()},methods:{getOrderListInfo:function(){var t=this;void 0!=this.from&&""!=this.from&&null!=this.from||(this.from=""),void 0!=this.to&&""!=this.to&&null!=this.to||(this.to=""),void 0!=this.orderNumber&&""!=this.orderNumber&&null!=this.orderNumber||(this.orderNumber=""),this.test.post("order/search_order",{start_time:this.from,end_time:this.to,status:this.status,no:this.orderNumber,page:this.page,pageSize:this.pageSize}).then(function(o){if(console.log(e(o," at pages\\orderList\\orderList.vue:178")),r.hideLoading(),200==o.statusCode&&0==o.data.errorCode){var n=o.data.value;if(n.forEach(function(e){t.info.push(e)}),t.time=[],t.info.forEach(function(e){t.time.push(new Date(e.create_time+288e5).toJSON().substr(0,16).replace("T"," ").replace(/-/g,"-"))}),n.length>=10)t.showMore=!0;else if(n.length<10&&n.length>0)t.showMore=!1;else if(n.length<=0)return t.showMore=!1,r.showToast({title:"没有数据了",icon:"none"})}else 10001==o.data.errorCode||10002==o.data.errorCode||10003==o.data.errorCode?r.showModal({title:"提示",content:o.data.message,success:function(e){e.confirm,r.reLaunch({url:"../login/login"})}}):r.showToast({title:o.data.message,icon:"none"})}).catch(function(t){r.hideLoading(),r.showToast({title:"加载失败",icon:"none"}),console.log(e(t," at pages\\orderList\\orderList.vue:234"))})},orderDtails:function(e,t,o){1==e?r.showToast({title:"价格正在计算中,请稍等",icon:"none"}):r.navigateTo({url:"./orderDtails/orderDtails?id="+t+"&no="+o+"&status="+e})},changeMsg:function(e){this.showMore=!0,this.info=[],this.status=e.orignItem.label,this.page=1,this.getOrderListInfo()},more:function(){this.page+=1,this.getOrderListInfo(),r.showLoading({title:"加载中..."})}},onNavigationBarButtonTap:function(e){r.navigateTo({url:"../search/search?name=orderList"})},components:{selects:n}};t.default=i}).call(this,o("0de9")["default"],o("6e42")["default"])},dd41:function(e,t,o){"use strict";o.r(t);var r=o("79ce"),n=o.n(r);for(var i in r)"default"!==i&&function(e){o.d(t,e,function(){return r[e]})}(i);t["default"]=n.a},f9e8:function(e,t,o){}},[["6f51","common/runtime","common/vendor"]]]);