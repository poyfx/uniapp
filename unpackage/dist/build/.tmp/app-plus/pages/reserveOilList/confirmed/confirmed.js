(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/reserveOilList/confirmed/confirmed"],{"1a12":function(e,t,n){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return n.e("components/step/step").then(n.bind(null,"0e21"))},o=function(){return n.e("components/m-info-text/m-info-text").then(n.bind(null,"1655"))},i=function(){return n.e("components/m-button").then(n.bind(null,"1460"))},a=function(){return n.e("components/uni-icon/uni-icon").then(n.bind(null,"d5ff"))},u={data:function(){return{step:{value1:"待确认",value2:"待发油",value3:"待收油",value4:"已拒绝",value5:"已完成",waitSure:"",waitSend:"",waitGet:"",refuse:"step-wait",complete:"step-ago"},confirmed:{order:"预约单号",time:"预约时间",company:"提油单位",oil:"油品类型",much:"提油数量(吨)",main:"提油方式"},btn:{type:"primary",value:"关闭"},disabled:!0,address:"",order:"",company:"",oil:"",much:"",main:"",status:"",right:!0,rId:"",oId:"",reserveInfo:"",showAddress:!1,time:""}},onLoad:function(e){this.rId=e.reserve_id,this.oId=e.reserve_sn,this.getReserveOilList()},methods:{getReserveOilList:function(){var t=this;this.test.post("order/query_reserve_info",{reserve_id:this.rId}).then(function(n){console.log(e(n," at pages\\reserveOilList\\confirmed\\confirmed.vue:113")),200==n.statusCode&&0==n.data.errorCode&&(t.reserveInfo=n.data.value,t.status=t.reserveInfo.status,t.time=new Date(t.reserveInfo.reserve_time+288e5).toJSON().substr(0,16).replace("T"," ").replace(/-/g,"-"),t.order=t.reserveInfo.reserve_sn,t.much=String(t.reserveInfo.extract_num),t.address=t.reserveInfo.ship_addr,t.company=t.reserveInfo.org_name,t.oil=t.reserveInfo.oil_type,0==t.reserveInfo.get_type?t.main="配送":t.main="自提","配送"==t.main?t.showAddress=!0:t.showAddress=!1,1==t.status?(t.step.waitSure="step-active",t.step.waitSend="",t.step.waitGet=""):2==t.status||4==t.status?(t.step.waitSure="step-ago",t.step.waitSend="step-active",t.step.waitGet=""):3!=t.status&&5!=t.status||(t.step.waitSure="step-ago",t.step.waitSend="step-ago",t.step.waitGet="step-active"))}).catch(function(t){console.log(e(t," at pages\\reserveOilList\\confirmed\\confirmed.vue:154"))})},close:function(){r.navigateBack({delta:1})},back:function(){r.navigateBack({url:"../reserveOilList"})},getCode:function(){r.navigateTo({url:"oliCode/oliCode?id="+this.rId+"&reserve_sn="+this.oId})}},components:{step:s,infoText:o,mButton:i,uniIcon:a}};t.default=u}).call(this,n("0de9")["default"],n("6e42")["default"])},"786c":function(e,t,n){"use strict";n.r(t);var r=n("1a12"),s=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t["default"]=s.a},"7aaf":function(e,t,n){"use strict";var r=n("fad30"),s=n.n(r);s.a},8906:function(e,t,n){"use strict";n.r(t);var r=n("cec4"),s=n("786c");for(var o in s)"default"!==o&&function(e){n.d(t,e,function(){return s[e]})}(o);n("7aaf");var i=n("2877"),a=Object(i["a"])(s["default"],r["a"],r["b"],!1,null,"6dc6b63b",null);t["default"]=a.exports},cec4:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return s})},fad30:function(e,t,n){}},[["9929","common/runtime","common/vendor"]]]);