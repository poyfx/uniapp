<template>
	<view class="notice_details bgcf mt">
		<view class="notice_details_title">
			<text>{{detaile.title}}</text>
		</view>
		<view class="notice_details_date">
			<text>{{time}}</text>
		</view>
		<view class="notice_details_img" v-show="showImg">
			<image :src="detaile.photo" mode="aspectFit" @tap="showPhoto(detaile.photo)"></image>
		</view>
		<view class="notice_details_content">
			<text> {{detaile.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detaile: '', //公告详情
				showImg: false, //显示图片
				time: '',
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.getNoticeList()
		},
		methods: {
			getNoticeList() {
				this.test.post('/user/query_notice_info', {
					id: this.id,
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.detaile = res.data.value;
						this.time = new Date(this.detaile.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-');

						if (this.detaile.photo == '' || this.detaile.photo == 'null') {
							this.showImg = false;


						} else {
							console.log(this.detaile.photo);
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
		},
	}
</script>

<style>
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
</style>
