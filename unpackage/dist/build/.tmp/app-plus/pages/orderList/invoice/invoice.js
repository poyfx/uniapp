(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/invoice/invoice"],{"1c01":function(i,e,o){},"31ef":function(i,e,o){"use strict";var t=o("1c01"),n=o.n(t);n.a},"4e80":function(i,e,o){"use strict";var t=function(){var i=this,e=i.$createElement;i._self._c},n=[];o.d(e,"a",function(){return t}),o.d(e,"b",function(){return n})},c766:function(i,e,o){"use strict";o.r(e);var t=o("4e80"),n=o("f546");for(var s in n)"default"!==s&&function(i){o.d(e,i,function(){return n[i]})}(s);o("31ef");var c=o("2877"),r=Object(c["a"])(n["default"],t["a"],t["b"],!1,null,null,null);e["default"]=r.exports},eb42:function(i,e,o){"use strict";(function(i,t){function n(i,e,o){return e in i?Object.defineProperty(i,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):i[e]=o,i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=function(){return o.e("components/twoButton/twoButton").then(o.bind(null,"a41a"))},c=function(){return o.e("components/m-info-img/m-info-img").then(o.bind(null,"8eb7"))},r=function(){return o.e("components/m-info-text/m-info-text").then(o.bind(null,"1655"))},a={data:function(){var i;return{btn:{type:"primary",con2:"确认",dsiabled:!1},invoice:(i={company:"xxxxxxxx公司",disabled:!0,moeny:"111111111",placeholder:"22222222"},n(i,"company","开票公司"),n(i,"moeny","开票金额"),n(i,"types","发票类型"),n(i,"way","拆分方式"),n(i,"currentOil","当前购油量"),n(i,"surplus","剩余未拆油量"),i),list:[],ids:-1,yesORno:"是",typeInvoice:"请选择发票类型",invoiceTypes:!1,id:"",invoiceNum:[],show:!1,value:!1,num:0,currentOil:"",move:!1,no:"",company:"",status:"",moeny:""}},onLoad:function(i){this.id=i.id,this.currentOil=i.number,this.no=i.no,this.company=i.company,this.status=i.status,this.moeny=i.moeny},methods:{chooseInvoice:function(){this.invoiceTypes=!this.invoiceTypes},invoiceType:function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:127")),this.typeInvoice=e.target.id,this.invoiceTypes=!this.invoiceTypes},chooseUsersShow:function(){this.invoiceTypes=!this.invoiceTypes},showIncoice:function(i){i.target.value?(this.yesORno="是",this.ids=1):(this.yesORno="否",this.ids=-1),this.show=!this.show},add:function(){this.list.push({nums:""})},detal:function(i){this.list.splice(i,1)},cancelOrder:function(){var e=this;t.showModal({title:"提示",content:"确认不开发票吗?",success:function(o){o.confirm&&e.test.post("order/make_invoice",{id:e.id,is_invoice:"否",invoice_money:e.moeny}).then(function(o){console.log(i(o," at pages\\orderList\\invoice\\invoice.vue:168")),200==o.statusCode&&0==o.data.errorCode?t.redirectTo({url:"../orderDtails/orderDtails?id="+e.id+"&no="+e.no+"&status="+e.status}):t.showToast({title:o.data.message,icon:"none"})}).catch(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:180"))})}})},invoiceSure:function(e){var o=this;if("请选择发票类型"==this.typeInvoice)t.showToast({title:"请选择发票类型",icon:"none"});else{this.invoiceNum=[];var n=this;if(0==this.list.length?(this.invoiceNum.push(this.num),this.invoiceNum=String(this.invoiceNum)):(this.invoiceNum.push(this.num),this.list.forEach(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:207")),n.invoiceNum.push(e.nums)}),this.invoiceNum=String(this.invoiceNum)),2==this.status){if(1==this.ids)""!==this.invoiceNum?0==this.surplusOil?t.showModal({title:"提示",content:"确认开票",success:function(e){e.confirm&&o.test.post("order/make_invoice",{id:o.id,invoice_type:o.typeInvoice,is_invoice:o.yesORno,invoice_split:o.invoiceNum,invoice_money:o.moeny}).then(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:232")),200==e.statusCode&&0==e.data.errorCode?(t.showToast({title:"开票成功"}),t.redirectTo({url:"../orderDtails/orderDtails?id="+o.id+"&no="+o.no+"&status="+o.status})):t.showToast({title:e.data.message,icon:"none"})}).catch(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:247"))})}}):t.showToast({title:"发票拆分数量必须与当前油量一致",icon:"none"}):t.showToast({title:"请填写拆分数量",icon:"none"});else if(-1==this.ids){t.showModal({title:"提示",content:"确认开票",success:function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:277")),e.confirm&&(console.log(i(1," at pages\\orderList\\invoice\\invoice.vue:279")),o.test.post("order/make_invoice",{id:o.id,invoice_type:o.typeInvoice,is_invoice:o.yesORno,invoice_split:o.currentOil,invoice_money:o.moeny}).then(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:287")),200==e.statusCode&&0==e.data.errorCode?(t.showToast({title:"开票成功"}),t.redirectTo({url:"../orderDtails/orderDtails?id="+o.id+"&no="+o.no+"&status="+o.status})):t.showToast({title:e.data.message,icon:"none"})}).catch(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:302"))}))}})}}else if(1==this.ids)""!==this.invoiceNum?0==this.surplusOil?t.showModal({title:"提示",content:"确认开票",success:function(e){e.confirm&&o.test.post("order/repair_invoic",{id:o.id,invoice_type:o.typeInvoice,is_invoice:o.yesORno,invoice_split:o.invoiceNum,invoice_money:o.moeny}).then(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:327")),200==e.statusCode&&0==e.data.errorCode?(t.showToast({title:"开票成功"}),t.redirectTo({url:"../orderDtails/orderDtails?id="+o.id+"&no="+o.no+"&status="+o.status})):t.showToast({title:e.data.message,icon:"none"})}).catch(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:342"))})}}):t.showToast({title:"发票拆分数量必须与当前油量一致",icon:"none"}):t.showToast({title:"请填写拆分数量",icon:"none"});else if(-1==this.ids){t.showModal({title:"提示",content:"确认开票",success:function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:372")),e.confirm&&(console.log(i(1," at pages\\orderList\\invoice\\invoice.vue:374")),o.test.post("order/repair_invoic",{id:o.id,invoice_type:o.typeInvoice,is_invoice:o.yesORno,invoice_split:o.currentOil,invoice_money:o.moeny}).then(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:382")),200==e.statusCode&&0==e.data.errorCode?(t.showToast({title:"开票成功"}),t.redirectTo({url:"../orderDtails/orderDtails?id="+o.id+"&no="+o.no+"&status="+o.status})):t.showToast({title:e.data.message,icon:"none"})}).catch(function(e){console.log(i(e," at pages\\orderList\\invoice\\invoice.vue:397"))}))}})}}}},components:{tButton:s,infoImg:c,infoText:r},watch:{surplusOil:function(e,o){console.log(i(e,o," at pages\\orderList\\invoice\\invoice.vue:420")),e<0?(this.btn.disabled=!0,t.showToast({title:"输入的数字不能超过总吨数",icon:"none"})):this.btn.disabled=!1}},computed:{surplusOil:function(){if(0===this.list.length)return parseFloat(this.currentOil-this.num);for(var i=parseFloat(this.currentOil-this.num),e=0;e<this.list.length;e++)i-=this.list[e].nums;return i}}};e.default=a}).call(this,o("0de9")["default"],o("6e42")["default"])},f546:function(i,e,o){"use strict";o.r(e);var t=o("eb42"),n=o.n(t);for(var s in t)"default"!==s&&function(i){o.d(e,i,function(){return t[i]})}(s);e["default"]=n.a}},[["9dd4","common/runtime","common/vendor"]]]);