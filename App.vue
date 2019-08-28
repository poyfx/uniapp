<script>
	
	import {
		mapMutations,
		mapState
			} from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.getStorage({
				key: 'userInfo',
				success:(res) => {
					// console.log(res)
					// console.log(res.data)
					this.login(res.data);
					// 如果还需要重新校验或是想要刷新token的有效时间 就再联网请求一次
					// uni.request({
					// 	url: `${this.$serverUrl}/auth.php`,
					// 	header: {
					// 		"Content-Type": "application/x-www-form-urlencoded",
					// 		"Token":res.data.token
					// 	},
					// 	data: {
					// 		"username":res.data.user_name
					// 	},
					// 	method: "POST",
					// 	success: (e) => {
					// 		if (e.statusCode === 200 && e.data.code === 0) {
					// 			this.login(e.data);
					// 		}
					// 	}
					// })
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		// 			if (this.hasLogin == false) {
		// 				uni.showModal({
		// 					title: '提示',
		// 					content: '用户信息已失效，请重新登录',
		// 					success: function(res) {
		// 						if (res.confirm) {
		// 							uni.navigateTo({
		// 								url: '../login/login'
		// 							})
		// 						}else{
		// 							uni.navigateTo({
		// 								url: '../login/login'
		// 							})
		// 						}
		// 					}
		// 				})
		// 
		// 			}
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		methods:{
			...mapMutations(['login'])
		},
		computed: {
			...mapState(["hasLogin", "userInfo"])
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	uni-page-head .uni-page-head__title {
		font-weight: 400;

	}

	uni-page-head .uni-page-head{
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	/* 注册样式mtfield */
	.mint-cell .mint-cell-wrapper {
		font-size: 14px;
		color: #666;
		border: none;
		padding: 0
	}

	.mint-cell-text {
		padding-left: 15px;
	}

	.mint-field-other {
		padding-right: 15px;
	}

	/* 两个button 上一步下一步 */
	.m-two-btn {
		display: flex;
	}

	.m-two-btn .tButton {
		flex: 1;
		margin: 0 20px;
	}

	.mint-field .mint-cell-wrapper {
		background-image: none
	}

	.mint-field {
		border-bottom: 1px solid #e5e5e5;
	}
	/* 提油码radio */
	uni-radio .uni-radio-input{
		width: 16px;
		height: 16px;
	}
</style>
