<template>
	<view>
		<view class="fget-nums">
				<text class="phontNum">手机号</text>
				<input type="text" class="getCodeInput" :placeholder="placeholder" :value="value" />
				<button class="getCode" @click="go"   v-show="show" href="javascript:;">获取验证码</button>
				<button class="getCode1" @click="go"   v-show="!show" :disabled="disabled">重新获取({{count}}s)</button>
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:60,
				disabled:true
			}
		},
		props:{
			placeholder:String,
			show:Boolean,
			value:String
		},
		methods: {
			go(){
				this.$emit('getCodes');

			}
		}
	}
</script>

<style>
.fget-nums{
	display: flex;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	align-self: center;
	background-color: #fff; 
	border-bottom: 1px solid #e5e5e5;
}
.phontNum{
	padding: 0 10px;
}
  .getCode,.getCode1{
	  width: 98px;
	 margin: 0;
    background-color: #fff;
    color:#009DFF;
	font-size: 12px;
	border: none;
	padding: 10px;
	border-left: 1px solid #e5e5e5;
  }
  .getCodeInput{
	  flex: 1;
	  margin-left: 18upx;
  }
 uni-button:after {
    content: " ";
    width: 0;
    height: 0;

}
</style>
