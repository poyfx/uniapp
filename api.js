// import axios from 'axios'
// //   const Login = (username,password) => {
// 	const data={
// 		 username,
// 		 password
// 	 }
// 	return axios.request({
// 			url: "../static/json/a.json",
// 			data,
// 			methods: 'get'
// 		}
// 
// 	)
// }

 const Login =(username,password)=>{
	return	uni.request({
	url: '../static/json/a.json',
	method: 'GET',
	data: {
		username,
		password
	},
	success: res => {
	console.log(res)
	const datas = res.data.data;
	datas.forEach(el=>{
		uni.setStorage({
			key:"storage_key",
			data:el
		})
	
	})
	} 
});
return data
}
export default Login
