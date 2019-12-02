<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			



			//#ifdef APP-PLUS  
			
			
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					console.log('运行Android上');
					// var server = "http://dev.pjy.name:8170/api/bizcust/base/get_version"; //检查更新地址
					var appid = plus.runtime.appid
					var version = plus.runtime.version
					
					// var req = { //升级检测数据  
					// 	"appid": plus.runtime.appid,
					// 	"version": plus.runtime.version
					// };
					console.log(plus.runtime.appid, plus.runtime.version)
					this.test.post('base/getVersion', {
						appid: appid,
						version: version,
						type:'android'
					}).then(res => {
						console.log(res)
						var url = res.data.value.url
						if (res.statusCode == 200 && res.data.errorCode === 0) {
							if (res.data.value.status == 1) {
								uni.showModal({ //提醒用户更新  
									title: "更新提示",
									content: res.data.value.note,
									success: (res) => {
										if (res.confirm) {
											plus.runtime.openURL(url);
										}
									}
								})
							}
					
						}
					}).catch(err => {
						console.log(err)
					})
					break;
				case 'ios':
					console.log('运行iOS上');
					// var server = "http://dev.pjy.name:8170/api/bizcust/base/get_version"; //检查更新地址
					var appid = plus.runtime.appid
					var version = plus.runtime.version
					
					// var req = { //升级检测数据  
					// 	"appid": plus.runtime.appid,
					// 	"version": plus.runtime.version
					// };
					console.log(plus.runtime.appid, plus.runtime.version)
					this.test.post('base/getVersion', {
						appid: appid,
						version: version,
						type:'ios'
					}).then(res => {
						var url = res.data.value.url
						if (res.statusCode == 200 && res.data.errorCode === 0) {
							if (res.data.value.status == 1) {
								uni.showModal({ //提醒用户更新  
									title: "更新提示",
									content: res.data.value.note,
									success: (res) => {
										if (res.confirm) {
											plus.runtime.openURL(url);
										}
									}
								})
							}
					
						}
					}).catch(err => {
						console.log(err)
					})
					break;
				default:
					console.log('运行在开发者工具上')
					break;
			}
			
			// uni.request({
			// 	url: server,
			// 	data: req,
			// 	success: (res) => {
			// 		console.log(res)
			// 		if (res.statusCode == 200 && res.data.status === 0) {
			// 			
			// 			uni.showModal({ //提醒用户更新  
			// 				title: "更新提示",
			// 				content: res.data.note,
			// 				success: (res) => {
			// 					if (res.confirm) {
			// 						plus.runtime.openURL(res.data.url);
			// 					}
			// 				}
			// 			})
			// 		}
			// 	}
			// })
			//#endif  
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res)
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
		},
		onHide: function() {
			console.log('App Hide')
		},

		methods: {
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

	uni-page-head .uni-page-head {
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	}

	/* 注册样式mtfield */
	.mint-cell .mint-cell-wrapper {
		font-size: 14px;
		color: #616161;
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
	uni-radio .uni-radio-input {
		width: 16px;
		height: 16px;
	}

	uni-page-wrapper {
		display: flex;
	}
	/* .swipers .uni-swiper-dots-horizontal {
		left: 50%;
		bottom: 62%;
		text-align: center;
		white-space: nowrap;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
	
	} */
</style>
