<template>
	<view style="margin-top: 15px;">
		<view class="letter bgcf flex" @tap="letter">
			<view class="letter_image ">
				<image src="../../../static/img/notice.png" mode="aspectFit"></image>
			</view>
			<view class="letter_message">
				<view class="letter_message_title flex">
					<text>对账函</text>
					<text>2019/10/8 13:30</text>
				</view>
				<view class="letter_message_content">你有一张新的对账函，请查看核实</view>
			</view>
		</view>
		<view class="letter bgcf flex" @tap="notice">
			<view class="letter_image ">
				<image src="../../../static/img/letter.png" mode="aspectFit"></image>
			</view>
			<view class="letter_message">
				<view class="letter_message_title flex">
					<text>公告</text>
					<text>2019/10/8 13:30</text>
				</view>
				<view class="letter_message_content">你有新消息，点击查看</view>
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
		methods: {
			letter(){
				uni.navigateTo({
					url:'./account/account'
				})
			},
			notice(){
				uni.navigateTo({
					url:'./notice/notice'
				})
			},
		}
	}
</script>

<style>
.letter{
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
}
.letter_image{
	width: 20%;
	height: 3.5rem;
	margin-right: 20px;
}
.letter_image image{
	width: 3.5rem;
	height: 3.5rem;
}
.letter_message{
	width: 80%;
}
.letter_message_title{
	
	flex: 1;
	justify-content: space-between;
	margin: 5px 0 10px;
	
}
.letter_message_title text:first-child{
	font-size: 1rem;
}
.letter_message_title text:last-child{
	font-size: 0.6rem;
	color:#9e9e9e ;
	vertical-align: bottom;
}
.letter_message_content{
	font-size: 0.8rem;
}
</style>
