<template>
	<view class="self_header">
		<view class="self_header_bar">
			<view class="top_view"></view>  
		</view>
		<view class="self_header_title flex" >
			<view class="leftBtn" @tap="back">
				<uni-icons type="arrowleft" size="27"></uni-icons>
			</view>
			<view>{{titles}}</view>
		</view>
	</view>
</template>

<script>
	// import uniIcon from "@/components/uni-icons/uni-icons.vue"
	export default {
		props:{
			titles:{
				type:String,
				value:'',
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
		},
		components:{
			 // uniIcon
		}
	}
</script>

<style lang="scss">

</style>
