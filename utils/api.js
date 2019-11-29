import { test } from '@/utils/request/index.js'

// 获取新的token
const getNewTokenServe = () => {
	const tokenr =  uni.getStorageSync('TokenR')
	console.log(tokenr)
  return test.post('base/refreshToken',{refresh_token:tokenr})
}

export {
  getNewTokenServe
}
