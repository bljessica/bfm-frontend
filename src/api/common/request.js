const BASE_URL = 'http://localhost:3000'

export default async ({ url = '', data = {}, method = 'GET' }) => {
  method = method.toUpperCase()
  url = BASE_URL + url
  // let res = null
  if (method === 'GET') {
    // 处理get请求的参数
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr.length) {
      url += '?' + dataStr.substring(0, dataStr.length - 1)
    }
  }
  if (['GET', 'POST', 'PUT', 'DELETE'].includes(method)) {
    return new Promise(func => {
      uni.request({
        url,
        data,
        header: {
          'Content-Type': 'Application/json'
        },
        dataType: 'json',
        method,
        success: e => {
          func(e)
        }
      })
    })
  } else {
    console.error('暂不支持该请求类型')
    return
  }
}