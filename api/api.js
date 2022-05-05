import Vue from 'vue'

// 获取数据需要
const cookieStr = "MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/api/clientlog;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/wapi/feedback;;MUSIC_U=357a2aa715ba2742705eb967fbdedd0bb6b09bd60e846ee322b873cc25d71a08993166e004087dd380b8a86cef225db523967d7ee6ecc478052018771a64e676ea3820edc7487a297a561ba977ae766d; Max-Age=1296000; Expires=Fri, 20 May 2022 06:09:23 GMT; Path=/;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/weapi/feedback;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/weapi/feedback;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/neapi/feedback;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/openapi/clientlog;;__csrf=68f40e3e1175c147e3d55ae4e647de76; Max-Age=1296010; Expires=Fri, 20 May 2022 06:09:33 GMT; Path=/;;__remember_me=true; Max-Age=1296000; Expires=Fri, 20 May 2022 06:09:23 GMT; Path=/;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/api/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Thu, 05 May 2022 06:09:23 GMT; Path=/;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/eapi/feedback;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/api/feedback;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/wapi/feedback;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/api/clientlog;;MUSIC_R_T=1630597246581; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/eapi/feedback;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/neapi/feedback;;MUSIC_A_T=1630597246444; Max-Age=2147483647; Expires=Tue, 23 May 2090 09:23:30 GMT; Path=/eapi/clientlog;"
const baseUrl = 'http://192.168.31.43:3000'
// const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://musicapi.yjsjyb.top'

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