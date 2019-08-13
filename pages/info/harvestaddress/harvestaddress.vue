<template>
	<view>
		<view class="mContent">
			<view class="harvest" v-for="(item,index) in info" :key="item.id">
				<view class="harvest-name">
					<view>{{item.receiver}}</view>
					<view>{{item.rephone}}</view>
				</view>
				<view class="harvest-address">
					<view>{{item.address}}</view>
				</view>
				<view class="harvest-write">
					<radio-group @change="sure">
						<label class="radio">
							<radio :value="String(item.is_default)"  :checked="index === range" />设置为默认地址
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
				range: 0,
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
					if (res.statusCode == 200 && res.data.errorCode == 0) {
						this.info = res.data.value
					}else{
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
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 确认默认地址
			sure(e) {
				uni.showModal({
					"title": "提示",
					"content": '确认选择该地址为默认地址？',
					success: res => {
						if (res.confirm) {
							for (let i = 0; i < this.info.length; i++) {
								if (this.info[i].is_default == e.target.value) {
									this.range = i;
									console.log(this.info[i].id)
									this.test.post("user/setDefaultAddr", {
										 addr_id:this.info[i].id
									}).then(res=>{
										console.log(res)
										if(res.statusCode == 200 && res.data.errorCode == 0){
											uni.showToast({
												title:'设置成功'
											})
										}
									})
									break;
								}
							}
							// 点击取消
						}else if(res.cancel){
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
