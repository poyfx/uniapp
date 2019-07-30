import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin: false, //未登录
		Token:'',
		photo:[]
		// id:'',
		// name:''
		// realname:'',
		// username:''
	},
	getters: {},
	mutations: {
		login(state, provider) { //改变登录状态
			 // console.log(provider)
			state.hasLogin = true;
			state.Token = provider.token;
			state.userInfo = provider;
			// state.userInfo.realname = provider.realname;
			uni.setStorage({
				key: 'Token',
				data: provider.token
			})
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		logout(state) { //退出登录
			state.hasLogin = false;
			state.userInfo = {};
			state.Token = '',
			uni.removeStorage({
				key: 'userInfo'
			}),
			uni.removeStorage({
				key: 'Token'
			})
		},
		getPhoto(state,provider){
			console.log(provider);
			state.photo = provider
		}
		// setId(state,id){
		// 	state.id = id;
		// 	  uni.setStorageSync('id', id);
		// },
		// setRealname(state,realname){
		// 	state.name = realname;
		// 	uni.setStorageSync('name', realname);
		// },
		// setUsername(state,username){
		// 	state.username = username
		// },
	},
	actions: {
		handeLogin({
			commit
		}, data) {

			// const datas = data.value.user;
			commit('login', data)
			// commit('setId',datas.user.id)
			// commit('setRealname',datas.user.realname)
			// commit('setUsername',datas.username)
		},
		handelOut({
			commit
		}) {
			commit('logout')
		},
		handeGetPhoto({commit},data){
			commit("getPhoto",data)
		}
	},
	modules: {

	}
});
export default store;
