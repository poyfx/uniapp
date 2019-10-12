<template>
	<view class="mt">
		<view class="notice">
			<view class="notice_content">
				<view class="notice_date flex">
					<text>{{time}}</text><!--  -->
				</view>
				<view class="notice_list">
					<view :class="list.photo == null?'notice_img_no':'notice_img'">
						<image :src="list.photo" mode="top"></image>
					</view>
					<view :class="list.photo == null?'notice_text_notop':'notice_text'">
						<view class="notice_title">
							<text>{{list.title}}</text>
						</view>
						<view class="notice_article">
							<text>{{list.content}}</text>
						</view>
					</view>
				</view>
			</view>
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
			confirm() {
				const that = this;
				uni.showModal({
					content: '确认账单无误？',
					success: function(res) {
						if (res.confirm) {
							that.test.post('user/confirm_letter', {
								id: that.letterID,
							}).then(res => {
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

	.notice {
		width: 100%;

	}

	.notice_content {
		width: 100%;
		padding: 15px 10px 0;
	}

	.notice_date {
		width: 100%;
		justify-content: center;
		margin-bottom: 10px;
	}

	.notice_date text {
		padding: 4px 15px;
		border-radius: 1rem;
		background-color: #CBCBCB;
		color: #fff;
		font-size: 0.6rem;
	}

	.notice_list {
		width: 100%;
		border-radius: 0.25em;
		margin-bottom: 15px;
		position: relative;
	}

	.notice_img {
		width: 100%;
		height: 153px;
		border-radius: 0.25em 0.25em 0 0;
	}

	.notice_img image {
		width: 100%;
		height: 153px;
	}

	.notice_img_no image {
		width: 0;
		height: 0px;
	}

	.notice_text {
		width: 100%;
		position: relative;
		top: -44px;
		left: 0;
		border-radius: 0 0 0.25em 0.25em;
	}

	.notice_text_notop {
		width: 100%;
		position: relative;
		top: 0px;
		left: 0;
		border-radius: 0 0 0.25em 0.25em;
	}

	.notice_title {
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		padding: 10px 15px;
	}

	.notice_title text {
		color: #fff;
	}

	.notice_article {
		width: 100%;
		background-color: #fff;
		padding: 10px 15px;
	}

	.notice_article text {
		font-size: 0.8rem;
		color: rgba(117, 117, 117, 1.00);
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
