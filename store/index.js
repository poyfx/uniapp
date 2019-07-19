import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

 const store = new Vuex.Store ({
    state:{
		userInfo:uni.getStorage({
			key:"userInfo"
		}),
		hasLogin:false,
		// id:'',
		// name:''
		// realname:'',
		// username:''
	},
    getters:{},
    mutations:{
		 login(state, provider) {  //改变登录状态
		 console.log(provider)
			 provider =JSON.stringify(provider)
			 console.log(provider)
            state.hasLogin = true;  
            // state.token = provider.token;  
            state.userInfo = provider.user;  
            uni.setStorage({
            	key:'userInfo',
				data:provider
            })
        },  
        logout(state) {  //退出登录
            state.hasLogin = false;  
            state.userInfo = {};  
           uni.removeStorage({
			   key:'userInfo'
		   })
        }  ,
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
    actions:{
		handeLogin({commit},data){
			
			// const datas = data.value.user;
			commit('login',data)
			// commit('setId',datas.user.id)
			// commit('setRealname',datas.user.realname)
			// commit('setUsername',datas.username)
		},
		handelOut({commit}){
			commit('logout')
		}
	},
    modules:{
       
    }
});
export default store;