<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			global.isLogin = function(){
				try{
					// var id = uni.getStorageSync('id');
					// var name = uni.getStorageSync("name")
					var userInfo =uni.getStorageSync('userInfo')
				}catch(e){
					//TODO handle the exception
				}
				if(userInfo == ''){
					return false
				}else{
					return [userInfo]
				}
			}
			
		}
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
</style>
