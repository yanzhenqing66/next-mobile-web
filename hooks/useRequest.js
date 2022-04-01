import {useState, useEffect, useCallback} from 'react'

//! 调用请求函数
/**
 * 
 * @param {*} cb 
 * @param {*} params 
 * @param {*} config 
    config: {
      "manual": false, // 是否需要手动触发，若为false则立刻产生请求，若为true手动触发
      "ready": false // 当manual为true时生效，为true时才产生请求
    }
 * @returns 
 */
export function useGetReq(cb, params) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const request = () => {
    cb(params)
    .then(res => {
      if(res && res.code >= 200 && res.code <= 304) {
        setData(res.data)
      }
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
      request()
  }, [])
  return {data, error, loading}
}

export function useRequest(cb, params, config) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  const run = () => {
    setReady(true)
  }

  const request = useCallback(() => {
    setLoading(true)
    cb(params)
    .then(res => {
      if(res && res.code >= 200 && res.code <= 304) {
        setData(res.data)
      }
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => {
      setLoading(false)
      if(config && config.manual) {
        setReady(false)
      }
    })
  }, [cb, params])
  useEffect(() => {
    if(!config || !config.manual || (config.manual && ready)) {
      request()
    }
  }, [ready])
  return {data, error, loading, run}
}


//！返回数据进行验证，请求数据过程中只render一次
export function useDataTypeCheck(data) {
  if(typeof data != 'object') return 0
  if(Object.prototype.toString.call(data) == '[object Null]') return 1
  if(Object.prototype.toString.call(data) == '[object Object]') {
    if(Object.keys(data).length != 0) {
      return data
    }else {
      return 2
    }
  } 
  if(Array.isArray(data)) {
    if(data.length != 0) {
      return data
    }else {
      return 3
    }
  }
}

//! 界面唯一性处理
export function useOnlyView(status, error, loading) {
  if(status == 0) return null
  if(status == 1) return null
  if(status == 2) return null
  if(status == 3) return null
  if(loading) return null
  if(error) return null
}