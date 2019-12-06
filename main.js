import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import './common/css/base.css'
import './common/css/index.css'
// import './common/css/style.css'
import {test,http} from './utils/request/index.js'
Vue.config.productionTip = false
import titles from './components/title.vue'
Vue.component('titles',titles)
 import uniIcons from './components/uni-icon/uni-icons.vue'
 Vue.component('uniIcons',uniIcons)
 Vue.prototype.$api = 'http://dev.pjy.name:8170/api/bizcust/'//测试
 // Vue.prototype.$api = 'https://sinopec.pjy.name/api/bizcust/'//正式环境





// Vue.prototype.$https="http://dev.pjy.name:8170/api/bizcust/"
 Vue.prototype.$store = store  
 Vue.prototype.test = test
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
