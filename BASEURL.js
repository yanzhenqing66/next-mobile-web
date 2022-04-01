// 不同环境下的请求接口
import { envFlag } from './utils/env'

let BASEURL
if (envFlag) {
  BASEURL = 'https://api.poppyapps.com/api'
} else {
  BASEURL = 'https://dev.poppyapps.com/api'
}

export default BASEURL
