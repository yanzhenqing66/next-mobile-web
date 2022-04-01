import axios from 'axios'
import router from 'next/router'
import createDeviceId from '@/utils/createDeviceId'
import BASEURL from '@/BASEURL'
import store from '@/store'
import { del_token } from '@/store/user/actions/authToken'
import storeUtils from '@/utils/storageUtil'

// 封装axios请求
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 20000,
  withCredentials: true,
})

instance.interceptors.request.use(
  config => {
    const tokenStore = store.getState()
    const token = tokenStore.tokenReducer
    // 加入token
    config.headers = {
      'X-Poppy-Token': token,
      'device-id': createDeviceId(),
      'platform-id': 'web',
      ...config.header
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    let data = {}
    if (response.status === 200) {
      data = response.data
    } else if (response.status !== 200) {
      throw new Error(response.data)
    }
    return data
  },
  error => {
    if (error && error.response && error.response.status === 401) {
      store.dispatch(del_token())
      if (router.router.pathname !== '/me' && router.router.pathname !== '/cart') {
        const redirect = router.router.asPath
        storeUtils.setStore('redirect', redirect)
        router.push({ pathname: '/login', query: { redirect } })
      }
    }
    return Promise.reject(error)
  }
)

// 封装get请求
export function Get(url, params = {}, header = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params,
      header
    }).then(res => {
      if (res.code === 200) {
        resolve(res)
      } else {
        reject(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export function GetQuery(url, header = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, { header }).then(res => {
      if (res.code === 200) {
        resolve(res)
      } else {
        reject(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

// 封装post请求
export function Post(url, params = {}, header = {}, options = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, params, { header }, options)
      .then(res => {
        if (res.code === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
