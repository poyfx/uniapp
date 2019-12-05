<template>
	<view>
		<view class="mContent">
			<view v-for="(item,index) in info" :key="index">

				<view class="harvest" v-for="(list,key) in item.customerLocations" :key="key">
					
						<view class="harvest-name">
							<view>{{item.customer_name}}</view>
						</view>
						<!-- {{item.address}} -->
						<view class="harvest-address flex">
							<view style="width:3em">地址:</view>
							<view style="flex: 1;">{{list.address}}</view>
						</view>
						<view class="harvest-write">
<radio-group @change="sure">
							<label class="radio">
								<radio :value="String(list.id)"  :checked="list.is_default === 1" />设置为默认地址
							</label>
</radio-group>
							<!-- 编辑修改地址 和删除地址 暂时不用 -->
							<!-- <view class="operation">
						<button type="defult" class="write" size="small" @tap="edit">编辑</button>
						<button type="defult" class="write" size="small" @tap="delate">删除</button>
					</view> -->
						</view>
					
				</view>

			</view>


		</view>
		<!-- 新增地址暂时不用 -->
		<!-- <view class="newaddress">
			<button class="btn" @click="newadd">新增地址</button>
		</view> -->
	</view>
</template>

<script>
	var that = this;
	export default {
		data() {
			return {
				info: [],
				range:[],
				location: [],
			}
		},
		onLoad() {
			// 页面加载获取后台地址数据
			this.getAddressInfo()
		},
		
		methods: {
			// 获取地址信息
			getAddressInfo() {
				this.test.post('user/getAddrList').then(res => {
					console.log(res)
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.info = res.data.value
						
					console.log(this.info)
					} else if (res.data.errorCode == -10001 || res.data.errorCode == -10002 || res.data.errorCode == -10003) {
						uni.showModal({
							title: '提示',
							content: res.data.message,
							success: function(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: '../../login/login'
									})
								} else {
									uni.reLaunch({
										url: '../../login/login'
									})
								}
							}
						})
					} else if (res.data.errorCode == -10000) {
						console.log(1)
					} else {
						uni.showToast({
							title: res.data.message,
							icon: "none",
							position: 'bottom'
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 确认默认地址
			sure(e) {
				console.log(e)
				uni.showModal({
					"title": "提示",
					"content": '确认选择该地址为默认地址？',
					success: res => {
						if (res.confirm) {
							for (let i = 0; i < this.info.length; i++) {
								console.log(this.location)
								for (let j = 0; j < this.info[i].customerLocations.length; j++) {

									if (this.info[i].customerLocations[j].id == e.target.value) {
										this.range = this.info[i].customerLocations[j].is_default;
										this.test.post("user/setDefaultAddr", {
											addr_id:this.info[i].customerLocations[j].id
										}).then(res => {
											console.log(res)
											if (res.statusCode == 200 && res.data.errorCode == 0) {
												uni.showToast({
													title: '设置成功'
												})
												this.info = '';
												this.getAddressInfo()
											}

										})
										break;
									}
								}


							}
							// 点击取消
						} else if (res.cancel) {
							this.info = '',
								this.getAddressInfo()
						}
					}
				})
			},
			newadd() {
				uni.navigateTo({
					url: 'newAddress/newAddress'
				})
			},
			edit() {},
			delate() {}
		},
	}
</script>

<style>

</style>
