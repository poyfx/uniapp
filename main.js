import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/index.js'
import './static/css/base.css'
import './static/css/index.css'
import './static/css/style.css'
Vue.config.productionTip = false


Vue.prototype.$https="http://dev.pjy.name:8170/api/bizcust/"
 Vue.prototype.$store = store  
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
