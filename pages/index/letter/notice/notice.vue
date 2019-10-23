<template>
	<view>
		<view class="notice">
			<view class="notice_list bgcf" v-for="(item,index) in list" :key="item.id" @tap="noticeDetails(item.id)">
				<view class="notice_list_title">
					<text>{{item.title}}</text>
				</view>
				<view class="notice_list_content">
					<text>{{item.content}}</text>
				</view>
				<view class="notice_list_foot flex">
					<text class="notice_list_foot_date">{{time[index]}}</text>
					<text class="notice_list_foot_status" v-if="item.is_read == 1">已读</text>
					<text class="notice_list_foot_status_no" v-else>未读</text>
				</view>
			</view>




			<!-- <view class="notice_content" v-for="(item,index) in list" :key="item.id">
				<view class="notice_date flex">
					<text>{{time[index]}}</text>
				</view>
				<view class="notice_list">
					<view   :class="item.photo == null?'notice_img_no':'notice_img'" >
						<image :src="item.photo" mode="top"></image>
					</view>
					<view  :class="item.photo == null?'notice_text_notop':'notice_text'">
						<view class="notice_title">
							<text>{{item.title}}</text>
						</view>
						<view class="notice_article">
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				time: [],
			}
		},
		onLoad() {
			this.getNoticeList()

		},
		methods: {
			getNoticeList() {
				const that = this;
				this.test.post('user/list_user_notices').then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.list = res.data.value;
						this.list.map(el => {
							console.log(el)
							that.time.push(new Date(el.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
								/-/g, '-'))
						})

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
			noticeDetails(id) {
				const that = this;
				this.test.post('user/confirm_notice',{
					id:id
				}).then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						uni.navigateTo({
							url:'./noticeList?id='+id
						})

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
		}
	}
</script>

<style>
	.notice {
		width: 100%;
		padding-top: 15px;
	}

	.notice_list {
		width: 100%;
		padding: 10px 15px 15px;
		margin-bottom: 10px;
	}

	.notice_list_title text {
		font-weight: bold;
		color: #424242;
	}

	.notice_list_content {
		width: 100%;
		text-indent: 32px;
		padding: 5px 0;
	}

	.notice_list_content text {
		color: #757575;
		font-size: 0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.notice_list_foot {
		width: 100%;
		justify-content: space-between;
	}

	.notice_list_foot_date,
	.notice_list_foot_status {
		font-size: 0.6rem;
		color: #9E9E9E;
	}

	.notice_list_foot_status_no {
		font-size: 0.6rem;
		color: #00A8FF;
	}
</style>
