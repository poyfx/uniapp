<template>
	<view>
		<view class="mContent">
			<view class="harvest" v-for="(item,index) in info" :key="item.id">
				<view class="harvest-name">
					<view>{{item.name}}</view>
					<view>{{item.phone}}</view>
				</view>
				<view class="harvest-address">
					<view>{{item.address}}</view>
				</view>
				<view class="harvest-write">
					<radio-group @change="sure">
						<label class="radio">
							<radio :value=item.value :checked="index === range" />设置为默认地址
						</label>
					</radio-group>
					<view class="operation">
						<button type="defult" class="write" size="small" @tap="edit">编辑</button>
						<button type="defult" class="write" size="small" @tap="delate">删除</button>
					</view>
				</view>
			</view>

		</view>
		<view class="newaddress">
			<button class="btn" @click="newadd">新增地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: [{
						id: 1,
						value: 'liyong',
						name: '李勇',
						phone: '1569886565',
						address: '新华华书店'
					},
					{
						id: 2,
						name: '王子',
						value: 'wangzi',
						phone: '1569886565',
						address: '阿华华书店'
					}, {
						id: 3,
						name: '公主',
						value: 'gongzhu',
						phone: '1569886565',
						address: '新世界华书店'
					}
				],
				range: ''
			}
		},
		methods: {
			sure(e) {
				console.log(e)
				uni.showModal({
					"title": "提示",
					"content": '确认选择该地址为默认地址？',
					success: res => {
						if (res.confirm) {
							for (let i = 0; i < this.info.length; i++) {
								if (this.info[i].value === e.target.value) {
									this.range = i
								}
							}
						}
					}
				})
			},
			newadd() {
				uni.navigateTo({
					url: 'newAddress/newAddress'
				})
			},
			edit(){},
			delate(){}
		},
	}
</script>

<style>

</style>
