import cookie from 'react-cookies'

// 用户未登录状态下的cookie
function createDeviceId() {
  let device_id
  device_id = cookie.load('device-id')
  if (!device_id) {
    const c = 'user_cookie_' + Date.now() + '_' + Math.round(Math.random() * 1000000)
    cookie.save('device-id', c)
    device_id = c
  }
  return device_id
}

export default createDeviceId