<template>
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing banner">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="item in img" :key="item.id">
				<!-- 	<web-view :src="item.link"> -->
						<view class="swiper-item"><image :src="item.photo" @tap="otherWeb(item.link)"></image></view>
					<!-- </web-view> -->
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:{
			img:{
				type:Array,
				
			}
		},
		methods: {
			otherWeb(web){
				uni.navigateTo({
					url: '../../pages/newWeb/newWeb?web='+web,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
.swiper-item image{
	width: 100%;
	height: 150px;
	border-radius: 8px 8px 0 0 ;
}
</style>
