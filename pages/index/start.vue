<template>
  <view class="background">
    <view class="mContent">
      <view class="ce mt300">
        <image class="startimg" :src="src" mode="aspectFit" ></image>
      </view>
      <view class="p-bx">
        <view class="p-size">{{name}}</view>
        <view>version 1.0</view>
      </view>
    </view>
  </view>
</template>
<script>
import logo from "../../static/img/logo.png"
import {
		mapState,
		mapActions
	} from 'vuex'
export default {
    name:'Start',
    data(){
        return {
            name:'安徽石油商户中心',
            src:logo
        }
    },
	onShow() {
		if(this.hasLogin ==false){
			const timer = setTimeout(function(){
				uni.navigateTo({
				url:'../login/login',
				success:function(){
					clearTimeout(timer)
				}
			})
			},2000)
			
		}else{
			const timer = setTimeout(function(){
				uni.switchTab({
				url:'index',
				success:function(){
					clearTimeout(timer)
				}
			})
			},2000)
		}
	},
    mounted() {
    
    },
    methods:{
  
        
    },
	computed: {
		...mapState(["hasLogin", "userInfo","roles"])
	},
}
</script>
<style scoped>
.background{
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	text-align: center;
}
.startimg {
  width: 200px;
  margin-top:143px;
}
.p-bx{
    margin:  228px auto 0;
    text-align: center
}
.p-size{
    font-size: 16px;
    margin-bottom: 6px;
}
</style>