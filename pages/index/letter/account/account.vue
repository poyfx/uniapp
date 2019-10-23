<template>
	<view class="mt">
		<view class="account" @tap="findList(index)" v-for="(item,index) in letter" :key="index">
			<view class="account_date">
				<text>{{time[index]}}</text>
			</view>
			<view class="account_content bgcf">
				<!-- <view class="account_content_img">
					<image src="../../../../static/img/notice.png" mode="aspectFit"></image>
				</view> -->
				<view class="account_content_title">
					<text>{{item.title}}</text>
				</view>
				<view class="account_content_info">
					<text>{{item.content}}</text>
				</view>
				<view class="account_content_confirm flex">
					<text v-if="item.confirm_type == 0">请点击查看，进行核实>></text>
					<text style="color:#32BF75 ;" v-else>已核实</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var $api = "http://192.168.0.156:8080/api/bizcust/";
	export default {
		data() {
			return {
				letter: [],
				time: [],
			}
		},
		onShow() {
			this.getLtter()
		},
		methods: {
			getLtter() {
				const that = this;
				this.test.post('user/list_letters').then(res => {
					console.log(res)
					this.letter = res.data.value;

					this.letter.forEach(el => {
						that.time.push(new Date(el.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-'))
					})

				}).catch(err => {
					console.log(err);
				})
			},
			findList(index) {
				uni.navigateTo({
					url: './buyOilList?id=' + this.letter[index].id
				})
			},
		}
	}
</script>

<style>
	.mt {
		padding: 15px;
	}

	.account {
		width: 100%;
	}

	.account_date {
		width: 100%;
		text-align: center;
		margin-bottom: 10px;
	}

	.account_date text {
		background-color: #CBCBCB;
		padding: 4px 15px;
		color: #fff;
		border-radius: 0.9em;
		font-size: 0.6rem;
	}

	.account_content {
		width: 100%;
		padding-top: 10px;
		margin-bottom: 10px;
	}

	.account_content_title {
		width: 100%;
		padding: 0 10px;
		margin-bottom: 10px;
		/* text-align: center; */
	}

	.account_content_title text {
		font-size: 1.2em;
		font-weight: bold;
		color: #424242;
	}

	.account_content_img {
		width: 100%;
		text-align: center;
		margin-bottom: 10px;
	}

	.account_content_img image {
		width: 3.5rem;
		height: 3.5rem;
	}

	.account_content_info {
		width: 100%;
		padding: 0 10px;
		margin-bottom: 10px;
		/* text-align: center; */
	}

	.account_content_info text {
		color: #757575;
		font-size: 0.8rem;
	}

	.account_content_confirm {
		width: 100%;
		border-top: 1px solid #e5e5e5;
		padding: 10px 10px 10px 0;
		justify-content: flex-end;

	}

	.account_content_confirm text {
		font-size: 0.6rem;
		color: #9E9E9E;
	}
</style>
