import Vue from 'vue'

// 获取数据需要
const cookieStr = "MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/api/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/eapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Sun, 02 Oct 2022 12:57:40 GMT; Path=/;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/eapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/eapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/weapi/clientlog;;MUSIC_U=6d6302cffb72e973c1f5640c29f5283c606894f05c1d4b7da39f838484936c774dc7ef6529b7bca7bfca913d6f021a2860a7d25ea774763d9bfad9c6b7067caa46b686f69987eebf86c18b7af633e86b; Max-Age=1296000; Expires=Sun, 02 Oct 2022 12:57:40 GMT; Path=/;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/neapi/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Sat, 17 Sep 2022 12:57:40 GMT; Path=/;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/neapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/wapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/weapi/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/api/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/weapi/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/wapi/clientlog;;__csrf=4eecdf384dd63ff29a28128d21efc98b; Max-Age=1296010; Expires=Sun, 02 Oct 2022 12:57:50 GMT; Path=/;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/api/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/wapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Thu, 05 Oct 2090 16:11:47 GMT; Path=/api/clientlog;"
// const baseUrl = 'http://192.168.31.43:3000'
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://musicapi.yjsjyb.top'

function uRequest({ url = '', method = 'GET', data = {} }) {
  return new Promise((resolve, reject) => {
    data = Object.assign(data, { 
      cookie: cookieStr, 
      // 加入时间, 才能得到新的数据
      timestamp: Date.now() 
    })
    uni.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      withCredentials: true,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

Vue.prototype.$http = uRequest