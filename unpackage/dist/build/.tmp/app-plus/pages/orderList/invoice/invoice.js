(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/invoice/invoice"],{"31ef":function(i,o,t){"use strict";var e=t("c46a"),n=t.n(e);n.a},"4e739":function(i,o,t){"use strict";var e=function(){var i=this,o=i.$createElement;i._self._c},n=[];t.d(o,"a",function(){return e}),t.d(o,"b",function(){return n})},9882:function(i,o,t){"use strict";(function(i,e){function n(i,o,t){return o in i?Object.defineProperty(i,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):i[o]=t,i}Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var s=function(){return t.e("components/twoButton/twoButton").then(t.bind(null,"a41a"))},c=function(){return t.e("components/m-info-img/m-info-img").then(t.bind(null,"8eb7"))},r=function(){return t.e("components/m-info-text/m-info-text").then(t.bind(null,"1655"))},a={data:function(){var i;return{btn:{type:"primary",con2:"确认",disabled:!1},invoice:(i={company:"xxxxxxxx公司",disabled:!0,placeholder:"22222222"},n(i,"company","开票公司"),n(i,"moeny","开票金额"),n(i,"types","发票类型"),n(i,"way","拆分方式"),n(i,"currentOil","当前购油量"),i),list:[],ids:-1,yesORno:"是",typeInvoice:"请选择发票类型",invoiceTypes:!1,id:"",invoiceNum:[],show:!1,value:!1,num:0,currentOil:"",move:!1,no:"",company:"",status:"",moeny:"",invoice_money:""}},onLoad:function(i){this.id=i.id,this.currentOil=i.number,this.no=i.no,this.company=i.company,this.status=i.status,this.moeny=i.moeny,this.invoice_money="￥"+i.moeny},methods:{incoiceSplit1:function(o){if(console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:131")),o.detail.value<0)return this.num=0,e.showToast({title:"拆分油量不能小于0",icon:"none",position:"bottom"})},incoiceSplit2:function(o){if(console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:142")),o.detail.value<0)return this.list[o.target.id].nums=0,e.showToast({title:"拆分油量不能小于0",icon:"none",position:"bottom"})},chooseInvoice:function(){this.invoiceTypes=!this.invoiceTypes},invoiceType:function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:158")),this.typeInvoice=o.target.id,this.invoiceTypes=!this.invoiceTypes},chooseUsersShow:function(){this.invoiceTypes=!this.invoiceTypes},showIncoice:function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:168")),o.target.value?(this.yesORno="是",this.ids=1):(this.yesORno="否",this.ids=-1),this.show=!this.show},add:function(){this.list.push({nums:""})},detal:function(i){this.list.splice(i,1)},cancelOrder:function(){var o=this;e.showModal({title:"提示",content:"确认不开发票吗?",success:function(t){t.confirm&&o.test.post("order/make_invoice",{id:o.id,is_invoice:"否",invoice_money:o.moeny}).then(function(t){console.log(i(t," at pages\\orderList\\invoice\\invoice.vue:200")),200==t.statusCode&&0==t.data.errorCode?e.redirectTo({url:"../orderDtails/orderDtails?id="+o.id+"&no="+o.no+"&status="+o.status}):e.showToast({title:t.data.message,icon:"none",position:"bottom"})}).catch(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:213"))})}})},invoiceSure:function(o){var t=this;if("请选择发票类型"==this.typeInvoice)e.showToast({title:"请选择发票类型",icon:"none",position:"bottom"});else{this.invoiceNum=[];var n=this;if(0==this.list.length?(this.invoiceNum.push(this.num),this.invoiceNum=String(this.invoiceNum)):(this.invoiceNum.push(this.num),this.list.forEach(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:241")),n.invoiceNum.push(o.nums)}),this.invoiceNum=String(this.invoiceNum)),2==this.status){if(1==this.ids)""!==this.invoiceNum?0==this.surplusOil?e.showModal({title:"提示",content:"确认开票",success:function(o){o.confirm&&t.test.post("order/make_invoice",{id:t.id,invoice_type:t.typeInvoice,is_invoice:"是",invoice_split:t.invoiceNum,invoice_money:t.moeny}).then(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:266")),200==o.statusCode&&0==o.data.errorCode?(e.showToast({title:"开票成功"}),e.redirectTo({url:"../orderDtails/orderDtails?id="+t.id+"&no="+t.no+"&status="+t.status})):e.showToast({title:o.data.message,icon:"none",position:"bottom"})}).catch(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:282"))})}}):e.showToast({title:"发票拆分数量必须与当前油量一致",icon:"none",position:"bottom"}):e.showToast({title:"请填写拆分数量",icon:"none",position:"bottom"});else if(-1==this.ids){e.showModal({title:"提示",content:"确认开票",success:function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:314")),o.confirm&&(console.log(i(1," at pages\\orderList\\invoice\\invoice.vue:316")),t.test.post("order/make_invoice",{id:t.id,invoice_type:t.typeInvoice,is_invoice:"是",invoice_split:t.currentOil,invoice_money:t.moeny}).then(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:324")),200==o.statusCode&&0==o.data.errorCode?(e.showToast({title:"开票成功"}),e.redirectTo({url:"../orderDtails/orderDtails?id="+t.id+"&no="+t.no+"&status="+t.status})):e.showToast({title:o.data.message,icon:"none",position:"bottom"})}).catch(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:340"))}))}})}}else if(1==this.ids)""!==this.invoiceNum?0==this.surplusOil?e.showModal({title:"提示",content:"确认开票",success:function(o){o.confirm&&t.test.post("order/repair_invoic",{id:t.id,invoice_type:t.typeInvoice,is_invoice:t.yesORno,invoice_split:t.invoiceNum,invoice_money:t.moeny}).then(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:365")),200==o.statusCode&&0==o.data.errorCode?(e.showToast({title:"开票成功"}),e.redirectTo({url:"../orderDtails/orderDtails?id="+t.id+"&no="+t.no+"&status="+t.status})):e.showToast({title:o.data.message,icon:"none",position:"bottom"})}).catch(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:381"))})}}):e.showToast({title:"发票拆分数量必须与当前油量一致",icon:"none"}):e.showToast({title:"请填写拆分数量",icon:"none"});else if(-1==this.ids){e.showModal({title:"提示",content:"确认开票",success:function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:411")),o.confirm&&(console.log(i(1," at pages\\orderList\\invoice\\invoice.vue:413")),t.test.post("order/repair_invoic",{id:t.id,invoice_type:t.typeInvoice,is_invoice:t.yesORno,invoice_split:t.currentOil,invoice_money:t.moeny}).then(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:421")),200==o.statusCode&&0==o.data.errorCode?(e.showToast({title:"开票成功"}),e.redirectTo({url:"../orderDtails/orderDtails?id="+t.id+"&no="+t.no+"&status="+t.status})):e.showToast({title:o.data.message,icon:"none",position:"bottom"})}).catch(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:437"))}))}})}}}},components:{tButton:s,infoImg:c,infoText:r},watch:{surplusOil:function(i,o){i<0?(this.btn.disabled=!0,e.showToast({title:"输入的数字不能超过总吨数",icon:"none",position:"bottom"})):this.btn.disabled=!1}},computed:{surplusOil:function(){if(0===this.list.length)return parseFloat(this.currentOil-this.num).toFixed(6);for(var i=parseFloat(this.currentOil-this.num),o=0;o<this.list.length;o++)i=(i-this.list[o].nums).toFixed(6);return i}}};o.default=a}).call(this,t("0de9")["default"],t("6e42")["default"])},"9dd4":function(i,o,t){"use strict";(function(i){t("8790"),t("921b");e(t("66fd"));var o=e(t("c766"));function e(i){return i&&i.__esModule?i:{default:i}}i(o.default)}).call(this,t("6e42")["createPage"])},c46a:function(i,o,t){},c766:function(i,o,t){"use strict";t.r(o);var e=t("4e739"),n=t("f546");for(var s in n)"default"!==s&&function(i){t.d(o,i,function(){return n[i]})}(s);t("31ef");var c=t("2877"),r=Object(c["a"])(n["default"],e["a"],e["b"],!1,null,null,null);o["default"]=r.exports},f546:function(i,o,t){"use strict";t.r(o);var e=t("9882"),n=t.n(e);for(var s in e)"default"!==s&&function(i){t.d(o,i,function(){return e[i]})}(s);o["default"]=n.a}},[["9dd4","common/runtime","common/vendor"]]]);