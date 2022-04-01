import cookie from "cookie"

export function getCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const getUrlParams = (str) => {
  const str1 = str.split("_q_")[1] ? str.split("_q_")[1] : str
  if (str1.includes('.html')) {
    return str1.slice(0, str1.length - 5)
  }
  return str1
}