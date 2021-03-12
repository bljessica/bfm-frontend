<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa1dbcf33cd13d747&secret=c064e88c0e80980d3762be30710428b2&js_code=' + 
                res.code + '&grant_type=authorization_code',
              data: {
                code: res.code
              },
              success(res) {
                //1.存用户信息到本地存储
                wx.setStorageSync('openid', res.data.openid)
                console.log('登录成功, openid' + res.data.openid)
                //2.存用户信息到全局变量
                var app = getApp();
                app.globalData.openid = res.data.openid
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
