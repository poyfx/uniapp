<template>
	<view class="">
		<view class="content ">
			<view class="bgcf area_box">
				<textarea value="" placeholder="请输入不少于10个字的描述" maxlength="240" @input="countNum" class="feedback_describe" v-model="feedbacks" />
				<view class="count">
				<text>{{number}}/240</text>
				</view>
			</view>
		</view>
		<view class="content ">
			<view class="bgcf unpLoad_box">
				<view class="upLoad_title">
					<text class="">
						请提供相关问题的截图或照片
					</text>
					<text class="">
						{{imageData.length}}/4
					</text>
				</view>
				<view class="img_box">
					<view class="img_list" v-for="item in imageData" :key="item.name">
						<image :src="item.uri" mode="aspectFit"></image>
					</view>
					<view class="img_list" @tap="addImage" v-if="imageData.length<4">
						+
					</view>
					
				</view>
				
				<!-- <robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :enable-drag="enableDrag"  :enable-del="enableDel" :enable-add="enableAdd" :limit="limitNumber"></robby-image-upload> -->
			</view>
			<view class="mTop30">
				<mButton :type="btn.type" :value="btn.value" @commit="commit"></mButton>
			</view>
			
		</view>
	</view>
</template>

<script>
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	import mButton from '@/components/m-button.vue'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				number:'0',
				// enableDel : false,
				// enableAdd : true,
				// enableDrag : false,
				// limitNumber: 4,
				imageData : [],
				btn:{
				type:"primary",
				value:'提交',
				},
				feedbacks:'',
			}
		},
		methods: {
			countNum(e){
				this.number = e.detail.cursor
			},
			addImage(e){
				const that = this
				
				uni.chooseImage({
					count: 1,
					success: function(res) {
						
						console.log(res)
						that.imageData.push({
							name: 'feedback' + that.imageData.length,
							uri: res.tempFilePaths[0]
						})
						console.log(that.imageData)
					},
					complete:function(complete){
				
						console.log(complete)
					}
				
				});
			},
			deleteImage(e){
				console.log(e)
			},
			commit(){
				if(this.feedbacks.length == 0){
					return uni.showToast({
						title:'请填写反馈意见',
						icon:'none',
						position:'bottom',
						duration: 3000,
					})
				}else if(this.feedbacks.length < 10){
					return uni.showToast({
						title:'反馈意见必须是10个字及以上',
						icon:'none',
						position:'bottom',
						duration: 3000,
					})
				}else{
					if(this.imageData.length <= 0){
						uni.showLoading({
							title:'提交中...'
						})
						this.test.post('user/submit_feedback_notPhoto',{
							feedback:this.feedbacks
						}).then(res=>{
							uni.hideLoading()
							console.log(res)
							if(res.statusCode == 200 && res.data.errorCode == 0){
								uni.showToast({
									title:'上传成功',
										duration: 3000,
									});
								uni.switchTab({
									url:'../info'
									})
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
					}else if(res.data.errorCode == -10000 ){
						console.log(1)
					}else{
									uni.showToast({
										title:'上传失败',
										icon:'none',
										position:'bottom',
										duration: 3000,
								})
							}
						}).catch(err=>{
							uni.hideLoading();
							uni.showToast({
								title:'提交失败',
								icon:'none',
								position:'bottom',
								duration: 3000,
							})
							console.log(err)
						})
						}
					 else{
						console.log(this.imageData)
							const imgs = this.imageData.map((value, index) => {
								return {
									name: value.name,
									uri: value.uri
								}
							})
						console.log(this.Token)  
							uni.uploadFile({
								url:this.$api+ 'user/submit_feedback',
								files: imgs,
								formData: {
									feedback:this.feedbacks
								},
								success: function(res) {
									console.log(res)
									var data = JSON.parse(res.data)
									console.log(data)
									if(res.statusCode == 200 && data.errorCode == 0){
										uni.showToast({
											title:'上传成功',
											duration: 3000,
										})
										  uni.switchTab({
											url:'../info'
										})
									}else{
										uni.showToast({
											title:'上传失败',
											icon:'none',
											position:'bottom',
											duration: 3000,
										})
									} 
								},
								header:{
									Token:this.Token
								}
							})
					 }
				}
				
	
			},
		},
		computed:{
			...mapState(["Token"])
		},
		components:{
			robbyImageUpload,
			mButton
		}
	}
</script>

<style>
	.area_box{
		padding: 10px;
	}
.feedback_describe{
	width: 100%;
}
.count{
	padding: 5px 0 0px 0;
	display: flex;
	justify-content: flex-end;
}
.unpLoad_box{
	padding: 10px 16px 17px;
}
.upLoad_title{
	display: flex;
	justify-content: space-between;
}
.img_box{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.img_list{
	width: 80px;
	height: 80px;
	margin: 5px;
	border: 1px solid #d9d9d9;
	font-size: 79px;
	text-align: center;
	line-height: 65px;
	color: #d9d9d9;
	border-radius: 4px;
}
.img_list image{
	width: 80px;
	height: 80px;
	border-radius: 4px;
}
</style>
