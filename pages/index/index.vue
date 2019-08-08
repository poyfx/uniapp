<template>
	<view class="mContent">
		<!-- 轮播图 -->
		<banner :img="img"></banner>
		<!-- 导航 -->
		<navs></navs>
		<!-- 天气 -->
		<view class="sy-weather">
			<view class="weather-left">
				<view class="sy-times">
					<text>{{week}}</text>
					<text>{{dates}}</text>
				</view>
				<text class="temperature">{{temperature}}℃</text>
			</view>
			<view class="weather-right">
				<text class="r-weather">{{weather}}</text>
				<text class="r-city">{{address}}</text>
			</view>
		</view>
		<!-- 客户经理 -->
		<view class="main">
			<view class="myManager">
				<text class="line"></text>
				<text class="title-p">我的客户经理</text>
				<view class="managerNum flex">
					<view class="call">
						<view class="manager">{{myManager}}</view>
						<view class="">
							{{managerTel}}
						</view>
					</view>

					<view class=" ">
						<text class="numberBtn" @click="callPhone(managerTel)">通话</text>
					</view>
				</view>
			</view>
		</view>



		<!-- 当前油价 -->
		<view class="oilPrices">
			<view class="flex index-title">
				<view class="">
					<text class="line"></text>
					<text class="title-p">当前油品批发价</text>
				</view>
				<text>{{date}}</text>
			</view>
			<view class="priceLi">
				<view class="nowPrice titles">
					<text>油品名称</text>
					<text>价格(元/吨)</text>
					<text>涨跌幅</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>0#柴油</text>
					<view class="">
						<text>{{datas.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>-10#柴油</text>
					<view class="">
						<text>{{datas.diesel_10}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>92#国六</text>
					<view class="">
						<text>{{datas.gas_92}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>95#国六</text>
					<view class="">
						<text>{{datas.gas_95}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>98#国六</text>
					<view class="">
						<text>{{datas.gas_98}}</text>
					</view>
					<text>+2.33%</text>
				</view>
			</view>
		</view>

		<!-- 地炼价格行情 -->
		<view class="oilPrices">
			<view class="flex index-title">
				<view class="">
					<text class="line"></text>
					<text class="title-p">地炼价格行情</text>
				</view>
				<text>{{date}}</text>
			</view>
			<view class="priceLi">
				<view class="nowPrice titles">
					<text>油品名称</text>
					<text>价格(元/吨)</text>
					<text>涨跌幅</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>0#柴油</text>
					<view class="">
						<text>{{datas.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>

			<view class="priceLi">
				<view class="nowPrice">
					<text>92#国六</text>
					<view class="">
						<text>{{datas.gas_92}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
		</view>

		<!-- 国际原油价格 -->
		<view class="oilPrices">
			<view class="flex index-title">
				<view class="">
					<text class="line"></text>
					<text class="title-p">国际原油价格</text>
				</view>
				<text>{{date}}</text>
			</view>
			<view class="priceLi">
				<view class="nowPrice titles">
					<text>油品名称</text>
					<text>价格(元/吨)</text>
					<text>涨跌幅</text>
				</view>
			</view>
			<view class="priceLi">
				<view class="nowPrice">
					<text>0#柴油</text>
					<view class="">
						<text>{{datas.diesel_0}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>

			<view class="priceLi">
				<view class="nowPrice">
					<text>92#国六</text>
					<view class="">
						<text>{{datas.gas_92}}</text>
					</view>

					<text>+2.33%</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import banner from '../../components/banner/banner'
	import navs from '../../components/nav/nav'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '',
				managerTel: "",
				myManager: '',
				datas: [],
				img: [],
				address: '',
				city: '深圳',
				district: '龙华区',
				adcode: '', //城市编码
				cityInfo: '', //城市信息
				weather: '', //天气
				dates: '', //日期  不含年份
				date: '', //日期
				week: '', //星期
				temperature: '', //温度
			}
		},
		onShow() {
			//获取token
			const token = uni.getStorageSync('Token');
			if (token == null || token == '' || token == undefined) {
				uni.showModal({
					title: '提示',
					content: '用户信息已失效，请重新登录',
					success: function(res) {
						if (res.confirm) {
							uni.reLaunch({
								url: '../login/login'
							})
						} else {
							uni.reLaunch({
								url: '../login/login'
							})
						};
					}
				})
			}
			this.getlocation();
			this.getAdcode();
			this.getDate();
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			// 获取首页信息
			getInfo() {
				const that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						console.log(res)
						let price = res.data.oilPrize; //获取当前油价油价
						that.datas = price;
						let managerInfo = res.data.user;
						that.myManager = managerInfo.manager_name; //客户经理信息
						that.managerTel = managerInfo.manager_phone;
						let images = res.data.banners; //banner图
						that.img = images;

					}
				})

			},
			// 打电话
			callPhone(phoneNumber) {
				uni.showModal({
					title: "呼叫客户经理-" + this.myManager,
					confirmText: '呼叫',
					content: phoneNumber,
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: phoneNumber
							})
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			// 获取地址
			getlocation() {
				const that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						const longitude = res.longitude;
						const latitude = res.latitude;
						that.address = res.address.city + res.address.district;
						that.city = res.address.city;
						that.district = res.address.district;
					},

				});
			},
			getAdcode() {
				const that = this
				uni.request({
					url: 'https://restapi.amap.com/v3/config/district?parameters',
					header: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					data: {
						key: 'b5066e0a9a2a996397e9172fc67fdf40',
						keywords: "深圳市",
						subdistrict: 1
					},
					methods: 'GET',
					success: function(res) {
						res.data.districts.forEach(res => {
							that.cityInfo = res
						})
						if (res.statusCode == 200 && res.data.status == 1) {
							for (let i = 0; i < that.cityInfo.districts.length; i++) {
								if (that.district == that.cityInfo.districts[i].name) {
								
									
									that.adcode = that.cityInfo.districts[i].adcode
								}
							}
						}
						that.getWeather()
					}
				})
			},
			getWeather() {
				const that = this;
			
				uni.request({
					url: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
					header: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					data: {
						key: 'b5066e0a9a2a996397e9172fc67fdf40',
						city: that.adcode,
						extensions: "base"
					},
					methods: 'GET',
					success: function(res) {
					
						res.data.lives.forEach(res => {
						
							that.temperature = res.temperature;
							that.weather = res.weather
						})
					}
				})
			},
			getDate() {
				const date = new Date()
				const weeks = date.getDay()
				const month = date.getMonth() + 1
				const year = date.getFullYear()
				const day = date.getDate()
				this.date = year + '-' + month + '-' + day
				this.dates = month + '月' + day + '日'

				switch (weeks) {
					case 0:
						return this.week = '星期天';
						break;
					case 1:
						return this.week = '星期一';
						break;
					case 2:
						return this.week = '星期二';
						break;
					case 3:
						return this.week = '星期三';
						break;
					case 4:
						return this.week = '星期四';
						break;
					case 5:
						return this.week = '星期五';
						break;
					case 6:
						return this.week = '星期六';
						break;
				};
			}
		},
		computed: {
			...mapState(["hasLogin", "userInfo"])
		},
		components: {
			banner,
			navs
		}
	}
</script>

<style>
	.nowPrice {
		display: flex;
		justify-content: space-between
	}


	.price {
		font-size: 35upx;
		font-weight: bold;
	}

	.index-title {
		justify-content: space-between;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	/* 天气样式 */
	.sy-weather {
		width: 100%;
		display: flex;
		background: #fff;
		margin: 10px 0 10px 0;
		border-radius: 8px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.16);
	}

	.weather-left {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.sy-times {
		display: flex;
		justify-content: center;
		padding: 9px 0 8px 0;
	}

	.sy-times text {
		font-size: 24upx;
		padding: 0 4px;
	}

	.temperature {
		font-size: 80upx;
		padding-bottom: 9px;
	}

	.weather-right {
		display: flex;
		width: 50%;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		align-self: center;
	}

	.weather-right text {
		font-size: 40upx;
	}

	.r-weather {
		padding-bottom: 10px;
	}
</style>
