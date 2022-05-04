import Vue from 'vue'

const cookieStr = "__csrf=45f6c7bc66acefe4a7258e6c5f06d4db; Max-Age=1296010; Expires=Thu, 19 May 2022 09:31:39 GMT; Path=/;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/wapi/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Wed, 04 May 2022 09:31:29 GMT; Path=/;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/neapi/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/openapi/clientlog;;MUSIC_U=6d6302cffb72e973c1f5640c29f5283c741cf216f37d0087001133e221ffaffc4dc7ef6529b7bca7cae64f1a36dd473d35de552b75b890a59bfad9c6b7067caa46b686f69987eebf86c18b7af633e86b; Max-Age=1296000; Expires=Thu, 19 May 2022 09:31:29 GMT; Path=/;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/api/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/weapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Thu, 19 May 2022 09:31:29 GMT; Path=/;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/eapi/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/api/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/weapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/api/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/api/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/eapi/feedback;;NMTID=00OqzbIKk5VXu3UwEzGulPFua8Yr5cAAAGAjmkINw; Max-Age=315360000; Expires=Sat, 01 May 2032 09:31:29 GMT; Path=/;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/weapi/feedback;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1516455265697; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/neapi/feedback;;MUSIC_A_T=1516455051158; Max-Age=2147483647; Expires=Mon, 22 May 2090 12:45:36 GMT; Path=/wapi/feedback;"

function uRequest({url='', method='GET', data={}}) {
  return new Promise((resolve, reject) => {
    data = Object.assign(data, {cookie: cookieStr, timestamp: Date.now()})
    uni.request({
      url,
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