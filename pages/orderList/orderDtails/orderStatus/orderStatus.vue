<template>
	<!-- 订单状态信息 -->
	<view class="orderStatus mTop15">
		<view class="processText" ref="processText"  v-for="(item,index)  in statusInfo" :key="index">
			<view :class="index == 0 ?active : ''">{{item.content}}</view>
			<view >{{time[index]}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				user_id: '',
				statusInfo: [],
				active: 'active',
				oP:'oP',
				time: [],
				status:''
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.user_id = option.user_id;
			this.status = option.status;
			this.getStatusInfo()
			
			if(this.status == 9){
				this.active = 'oP'
			}else{
				this.active = 'active'
			}
		},
		methods: {
			getStatusInfo() {
			
				this.test.post('order/query_order_log', {
					id: this.id,
					user_id: this.user_id,
				}).then(res => {
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.statusInfo = res.data.value;
						this.statusInfo.forEach(el => {
							this.time.push(new Date(el.time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(/-/g,
								'-'))

						})
						console.log(this.time)
						console.log(this.statusInfo)
					}
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.orderStatus {
		padding-left: 15px;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.processText {
		padding: 10px 0;
		display: flex;
		flex-direction: column;
		font-size: 1em;
		color: #999;
		border-bottom: 1px solid #e5e5e5;
	}
.processText view:last-child{
	position: relative;
	left: 65%;
	font-size: 12px;
}
	.processText view:first-child{

		margin-bottom: 10px;
	}
	.processText:last-child{
	
		border: none;
	}

	 .active {
		color: #00A8FF;
	}
	.oP{
		color: #36D38A;
	}
</style>
