import cookie from "cookie"

export default function useParseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}