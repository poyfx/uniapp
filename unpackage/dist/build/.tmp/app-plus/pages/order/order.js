(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order"],{1689:function(o,e,t){"use strict";var n=function(){var o=this,e=o.$createElement,n=(o._self._c,t("79f9"));o._isMounted||(o.e0=function(e){o.chooseAddress=!o.chooseAddress},o.e1=function(e){o.showCompany=!o.showCompany},o.e2=function(e){o.showCoutomer=!o.showCoutomer}),o.$mp.data=Object.assign({},{$root:{m0:n}})},s=[];t.d(e,"a",function(){return n}),t.d(e,"b",function(){return s})},"1dd9":function(o,e,t){},"357c":function(o,e,t){"use strict";var n=t("1dd9"),s=t.n(n);s.a},"59a3":function(o,e,t){"use strict";t.r(e);var n=t("70d7"),s=t.n(n);for(var a in n)"default"!==a&&function(o){t.d(e,o,function(){return n[o]})}(a);e["default"]=s.a},"70d7":function(o,e,t){"use strict";(function(o,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=function(){return t.e("components/m-info-text/m-info-text").then(t.bind(null,"1655"))},a=function(){return t.e("components/m-button").then(t.bind(null,"1460"))},r={data:function(){return{titles:"下单购油",company:"",productOil:"选择油品",modeOil:"选择提油方式",modePay:"请选择付款方式",address:"请选择地址",count:"",Remarks:"",show:!1,mode:!1,pay:!1,addrShow:!0,infos:{placeholder:"请输入数量(吨)，可保留六位小数",buyoilText:"购买数量",number:"number",muchOil:""},btn:{primary:"primary",btnvalue:"提交意向单"},info:[],range:0,chooseAddress:!1,getTpe:"",myManager:"",newDatas:[],showCompany:!1,companyId:"",showCoutomer:!1,page:1,pageSize:10,man:[],more:!1,value:"",myManagerId:"",scrollTop:0,old:{scrollTop:0},managers:[],phoneHeight:"",scrollheight:"",manergerscrollheight:"",buyCompany:"",buycompanyImg:!1,addrImg:!1,buyCompanyID:"",nextConpany:!1,dotIdx:"",placecolor:!0,color9:"color9",colorRed:"colorRed"}},onLoad:function(){var e=this;o.getSystemInfo({success:function(o){e.phoneHeight=o.windowHeight,e.scrollheight=e.phoneHeight-44-25,e.manergerscrollheight=e.phoneHeight-44-25-54}}),this.getCompanyInfo(),this.getBuycompany(0)},methods:{getCompanyInfo:function(){var e=this;this.test.post("order/order_company").then(function(o){console.log(n(o," at pages\\order\\order.vue:358")),200==o.statusCode&&0==o.data.errorCode&&(e.company=o.data.value.name,e.companyId=o.data.value.id)}).catch(function(o){console.log(n(o," at pages\\order\\order.vue:372"))}),o.getStorage({key:"userInfo",success:function(o){console.log(n(o," at pages\\order\\order.vue:377")),e.myManager=o.data.managers[0].manager_name,e.myManagerId=o.data.managers[0].manager_id}})},getBuycompany:function(o){var e=this;this.test.post("order/order_customers").then(function(t){console.log(n(t," at pages\\order\\order.vue:389")),200==t.statusCode&&0==t.data.errorCode&&(e.managers=t.data.value,e.buyCompany=e.managers[o].name,e.buyCompanyID=e.managers[o].id,e.info=e.managers[o].customerLocations,e.address=e.info[0].address,console.log(n(e.info," at pages\\order\\order.vue:396")),e.managers.length>1?e.buycompanyImg=!0:e.buycompanyImg=!1,e.info.length>1?e.addrImg=!0:e.addrImg=!1)}).catch(function(o){console.log(n(o," at pages\\order\\order.vue:409"))})},chooseOwnCompany:function(){this.managers.length>1?(this.buycompanyImg=!0,this.showCompany=!0,this.nextConpany=!1):this.buycompanyImg=!1},getNewCompany:function(){var e=this;this.page=1,this.showCompany=!0,this.nextConpany=!0,o.showLoading({title:"加载中..."}),this.test.post("order/listOrgs").then(function(t){o.hideLoading(),console.log(n(t," at pages\\order\\order.vue:435")),e.newDatas=t.data.value}).catch(function(e){o.hideLoading(),o.showToast({title:"加载失败",icon:"none",position:"bottom"}),console.log(n(e," at pages\\order\\order.vue:445"))})},chooseCompany:function(o){console.log(n(o," at pages\\order\\order.vue:453")),console.log(n("收油"," at pages\\order\\order.vue:455")),this.more=!0,this.company=this.newDatas[o].name,this.companyId=this.newDatas[o].id,this.showCompany=!this.showCompany,this.myManager="请选择"},chooseownCompany:function(o){this.buyCompany=this.managers[o].name,this.showCompany=!this.showCompany,this.getBuycompany(o),console.log(n(this.buyCompany," at pages\\order\\order.vue:468"))},getNewCustemerInfo:function(){this.man=[],this.page=1,this.more=!0,this.value="",this.getNewCustemer(),this.showCoutomer=!0,o.showLoading({title:"加载中..."})},getNewCustemer:function(){var e=this;console.log(n(this.value," at pages\\order\\order.vue:483")),this.test.post("order/listManagers",{search:this.value,org_id:this.companyId,size:this.page,pageSize:this.pageSize}).then(function(t){o.hideLoading(),console.log(n(t," at pages\\order\\order.vue:493")),200==t.statusCode&&0==t.data.errorCode&&(t.data.value.forEach(function(o){e.man.push(o)}),t.data.value.length<10&&t.data.value.length>0?e.more=!1:0==t.data.value.length&&(e.more=!1,o.showToast({title:"没有更多了",icon:"none",position:"bottom"})))}).catch(function(e){o.hideLoading(),o.showToast({title:"加载失败",icon:"none",position:"bottom"}),console.log(n(e," at pages\\order\\order.vue:518"))})},searchCustomer:function(o){this.page=1,""!==o.target.value&&null!==o.target.value?(this.man=[],this.page=1,this.more=!0,this.getNewCustemer()):(this.man=[],this.page=1,this.more=!0,this.value="",this.getNewCustemer())},chooseCustomers:function(o,e){this.myManagerId=e,this.myManager=this.man[o].realname,this.showCoutomer=!this.showCoutomer},Smore:function(){this.page+=1,this.getNewCustemer(),o.showLoading({title:"加载中..."})},payShow:function(){this.pay=!this.pay},chooseOilShowPay:function(){this.pay=!this.pay},chooseOilShow:function(){this.show=!this.show},chooseOilLeave:function(){this.mode=!this.mode},chooseOne:function(o){console.log(n(o," at pages\\order\\order.vue:569")),this.show=!this.show,this.productOil=o.target.id},pays:function(o){this.pay=!this.pay,this.modePay=o.target.id},modeShow:function(){this.mode=!this.mode},chooseTwo:function(o){console.log(n(o," at pages\\order\\order.vue:582")),this.mode=!this.mode,this.getTpe=o.target.id,"配送"==o.target.id?this.addrShow=!0:this.addrShow=!1,this.modeOil=o.target.id},chooseAddr:function(){console.log(n(this.info.length," at pages\\order\\order.vue:598")),this.info.length>1&&(this.addrImg=!0,this.chooseAddress=!this.chooseAddress,o.showToast({title:"选择你要收货的地址,然后点确认",icon:"none",position:"bottom"}))},setNumber:function(e){if(this.placecolor=!0,e.detail.value<0)return this.count=this.count.replace(/^(0+)|[^\d]+/g,""),o.showToast({title:"购买数量不能小于0",icon:"none",position:"bottom"});var t=e.detail.value;console.log(n(t," at pages\\order\\order.vue:655"));var s=t.indexOf(".");console.log(n(s," at pages\\order\\order.vue:657")),this.dotIdx=s},isAddress:function(e){console.log(n(e,this.info," at pages\\order\\order.vue:684"));var t=this;o.showModal({content:"确定选择该地址为收货地址",success:function(o){if(o.confirm)t.address=t.info[e].address,t.chooseAddress=!t.chooseAddress,console.log(n(t.address," at pages\\order\\order.vue:692"));else if(o.cancel)return}})},upper:function(o){console.log(n(o," at pages\\order\\order.vue:733"))},lower:function(o){},scroll:function(o){},toBuy:function(){var e=this;if(console.log(n(this.count.length,this.dotIdx," at pages\\order\\order.vue:744")),null!==this.myManager&&""!==this.myManager&&"请选择"!==this.myManager)if(null!==this.productOil&&""!==this.productOil&&"选择油品"!==this.productOil)if(null!==this.modePay&&""!==this.modePay&&"请选择付款方式"!==this.modePay)if(null!==this.count&&""!==this.count&&0!==this.count){if(-1==this.dotIdx)return console.log(n(this.dotIdx," at pages\\order\\order.vue:751")),o.showModal({title:"提示",content:"提交后无法修改，是否提交",success:function(t){t.confirm&&(o.showLoading({title:"提交中..."}),e.test.post("order/make_order",{org_id:e.companyId,manager_id:e.myManagerId,manager_name:e.myManager,customer_name:e.buyCompany,customer_id:e.buyCompanyID,oil_type:e.productOil,pay_type:e.modePay,count:e.count,ship_addr:e.address,remark:e.Remarks}).then(function(e){console.log(n(e," at pages\\order\\order.vue:774")),o.hideLoading(),200==e.statusCode&&0==e.data.errorCode?o.redirectTo({url:"../orderList/orderList"}):10001==e.data.errorCode||10002==e.data.errorCode||10003==e.data.errorCode?o.showModal({title:"提示",content:"用户信息已失效，请重新登录",success:function(e){e.confirm,o.reLaunch({url:"../login/login"})}}):o.showToast({title:e.data.message,icon:"none",position:"bottom"})}).catch(function(e){o.hideLoading(),o.showToast({title:"提交失败",icon:"none",position:"bottom"}),console.log(n(e," at pages\\order\\order.vue:810"))}))}});this.dotIdx=this.dotIdx+7,this.count.length>this.dotIdx?(this.placecolor=!1,o.showToast({title:"购买数量最多保留六位有效数字",icon:"none",position:"bottom"}),this.count=0):o.showModal({title:"提示",content:"提交后无法修改，是否提交",success:function(t){t.confirm&&(o.showLoading({title:"提交中..."}),e.test.post("order/make_order",{org_id:e.companyId,manager_id:e.myManagerId,manager_name:e.myManager,customer_name:e.buyCompany,customer_id:e.buyCompanyID,oil_type:e.productOil,pay_type:e.modePay,count:e.count,ship_addr:e.address,remark:e.Remarks}).then(function(e){console.log(n(e," at pages\\order\\order.vue:851")),o.hideLoading(),200==e.statusCode&&0==e.data.errorCode?o.redirectTo({url:"../orderList/orderList"}):10001==e.data.errorCode||10002==e.data.errorCode||10003==e.data.errorCode?o.showModal({title:"提示",content:"用户信息已失效，请重新登录",success:function(e){e.confirm,o.reLaunch({url:"../login/login"})}}):o.showToast({title:e.data.message,icon:"none",position:"bottom"})}).catch(function(e){o.hideLoading(),o.showToast({title:"提交失败",icon:"none",position:"bottom"}),console.log(n(e," at pages\\order\\order.vue:887"))}))}})}else o.showToast({title:"请输入购油数量",icon:"none",position:"bottom"});else o.showToast({title:"请选择付款方式",icon:"none",position:"bottom"});else o.showToast({title:"请选择油品",icon:"none",position:"bottom"});else o.showToast({title:"请选择客户经理",icon:"none",position:"bottom"})}},components:{mButton:a,infoText:s},mounted:function(){setTimeout(function(){this.company="小花"},0)}};e.default=r}).call(this,t("6e42")["default"],t("0de9")["default"])},a49c:function(o,e,t){"use strict";(function(o){t("8790"),t("921b");n(t("66fd"));var e=n(t("b955"));function n(o){return o&&o.__esModule?o:{default:o}}o(e.default)}).call(this,t("6e42")["createPage"])},b955:function(o,e,t){"use strict";t.r(e);var n=t("1689"),s=t("59a3");for(var a in s)"default"!==a&&function(o){t.d(e,o,function(){return s[o]})}(a);t("357c");var r=t("2877"),i=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports}},[["a49c","common/runtime","common/vendor"]]]);