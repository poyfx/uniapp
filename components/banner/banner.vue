<template>
	<view class="uni-padding-wrap">
		<view class="page-section swiper">
			<view class="page-section-spacing banner">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="item in imges" :key="item.id">
						<view class="swiper-item"><image :src="item.img" mode=""></image></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
import one from '../../static/img/banner.png'
import two from '../../static/img/banner.png'
import three from '../../static/img/buy.png'
	export default {
		data() {
			return {
				imges:[{
					id:1,
					img:one
				},{
					id:2,
					img:three
				},{
					id:3,
					img:three
				},{
					id:4,
					img:one
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.swiper-item image{
	width: 100%;
	height: 300upx;
}
</style>
