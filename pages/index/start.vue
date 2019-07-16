<template>
  <view class="background">
    <view class="mContent">
      <view class="ce mt300">
        <img class="startimg" :src="src" alt>
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
export default {
    name:'Start',
    data(){
        return {
            name:'安徽石油商户中心',
            src:logo
        }
    },
    mounted() {
    
    },
    methods:{
  
        
    }
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