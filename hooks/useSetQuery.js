import { useEffect } from "react"

// 定义url字符串拼接的方法
const useSetQuery = (key, value) => {
  let newUrl
  useEffect(() => {
    let uri = window.location.href
    if (uri.includes(key)) return
    if (!value) {
      return uri;
    }
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      newUrl = uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      newUrl = uri + separator + key + "=" + value;
    }
    window.history.replaceState({
      path: newUrl
    }, '', newUrl)
  }, [])
  return newUrl
}

export default useSetQuery
