<template>
	<view class="notice_details bgcf mt">
		
		<view class="notice_details_title">
			<text>{{list.title}}</text>
		</view>
		<view class="notice_details_date">
			<text>{{time}}</text>
		</view>
		<view class="notice_details_img" v-show="showImg">
			<image :src="list.photo" mode="aspectFit" @tap="showPhoto(list.photo)"></image>
		</view>
		<view class="notice_details_content">
			<text> {{list.content}}</text>
		</view>
		
		
		<view class="account_btnbox" v-show='list.confirm_type==0'> 
			<button type="primary" @tap="confirm">确认账单无误</button>
		</view>
	</view>
</template>

<script>
	var $api = "http://192.168.0.156:8080/api/bizcust/";
	export default {
		data() {
			return {
				letterID: '',
				list: '',
				time: '',
				showImg: false, //显示图片
			}
		},
		onLoad(option) {
			this.letterID = option.id;
			this.getLetter()
		},
		methods: {
			getLetter() {
				const that = this;
				this.test.post('user/query_letter_info', {
					id: this.letterID,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						console.log()
						this.list = res.data.value;
						// this.list.map(el=>{
						// 	console.log(el)
						that.time = new Date(res.data.value.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-')
						// })
						if (this.list.photo == '' || this.list.photo == 'null') {
							this.showImg = false;
						
						
						} else {
							console.log(this.list.photo);
							this.showImg = true;
						}

					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							position: 'bottom',
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			showPhoto(img){
				 uni.previewImage({
				            urls: [img],
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
			},
			confirm() {
				const that = this;
				uni.showModal({
					content: '确认账单无误？',
					success: function(res) {
						if (res.confirm) {
							that.test.post('user/confirm_letter', {
								id: that.letterID,
							}).then(res => {
								if(res.statusCode == 200 && res.data.errorCode == 0){
									uni.navigateBack({
										// url:'./account'
										delta:1
									})
								}
								console.log(res)
							}).catch(err => {
								console.log(err)
							})
						} else if (res.cancel) {
							return;
						}

					}
				})

			},
		},
	}
</script>
<style>
	.mt {
		padding: 15px 15px 60px 15px;
	}
	.notice_details {
		width: 100%;
		padding: 15px;
	}

	.notice_details_title,
	.notice_details_date,
	.notice_details_img {
		width: 100%;
		margin-bottom: 10px;
	}

	.notice_details_title text {
		font-size: 1.1rem;
		color: #424242;
		font-weight: bold;
	}

		{
		width: 100%;
		margin-bottom: 10px;
	}

	.notice_details_date text {
		font-size: 0.6rem;
		color: #9e9e9e;
	}

	.notice_details_img image {
		width: 100%;
		height: 300upx;
	}

	.notice_details_content {
		width: 100%;
		text-indent: 1.8em;
	}

	.notice_details_content text {
		font-size: 0.9em;

	}

	.account_btnbox {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.account_btnbox button {
		border-radius: 0;
		background-color: #00A8FF;
	}
</style>
