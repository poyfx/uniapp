<template>
	<view style="margin-top: 15px;">
		<view class="letter bgcf flex" @tap="letter">
			<view class="letter_image ">
				<image src="../../../static/img/notice.png" mode="aspectFit"></image>
			</view>
			<view class="letter_message">
				<view class="letter_message_title flex">
					<text>对账函</text>
					<text>{{letterTime}}</text><!-- 2019/10/8 13:30 -->
				</view>
				<view class="letter_message_content" v-if="letters>0">你有一张新的对账函，请查看核实</view>
				<view class="letter_message_content" v-else>暂无新消息</view>
					
			</view>
		</view>
		<view class="letter bgcf flex" @tap="notice">
			<view class="letter_image ">
				<image src="../../../static/img/letter.png" mode="aspectFit"></image>
			</view>
			<view class="letter_message">
				<view class="letter_message_title flex">
					<text>公告</text>
					<text>{{noticeTime}}</text><!-- 2019/10/8 13:3 -->
				</view>
				<view class="letter_message_content" v-if="notices>0">你有新消息，点击查看</view>
				<view class="letter_message_content" v-else>暂无新消息</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				letters:'',
				notices:'',
				letterTime:'',
				noticeTime:'',
			}
		},
		onLoad() {
			this.getLetterNum()
			this.getNoticeNum()
		},
		methods: {
			
			getNoticeNum(){
				this.test.post('user/query_notice_unread_info').then(res=>{
					console.log(res)
					if(res.statusCode == 200 && res.data.errorCode == 0){
						this.notices = res.data.value.count;
						console.log(this.notices)
						this.noticeTime = new Date(res.data.value.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-')
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			getLetterNum(){
				this.test.post('user/query_letter_unread_info').then(res=>{
					console.log(res)
					if(res.statusCode == 200 && res.data.errorCode == 0){
						this.letters = res.data.value.count
						this.letterTime = new Date(res.data.value.create_time + 8 * 3600 * 1000).toJSON().substr(0, 16).replace('T', ' ').replace(
							/-/g, '-')
						// console.log(this.letters)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
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
	margin-right: 10px;
	vertical-align: bottom;
}
.letter_message_content{
	font-size: 0.7rem;
	color: #757575;
}
</style>
