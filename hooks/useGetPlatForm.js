
const useGetPlatForm = () => {
  let ua = ''
  const sUserAgent = navigator.userAgent.toLowerCase()
  if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
    //跳转移动端页面
    ua = 'mobile'
  } else {
    //跳转pc端页面
    ua = 'pc'
  }
  return ua
}

export function isFacebookApp() {
  var ua = navigator.userAgent || navigator.vendor || window.opera
  return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1)
}

export function getSystem() {
  const ua = navigator.userAgent.toLowerCase()
  const testUa = regexp => regexp.test(ua)
  let system = "unknow";
  if (testUa(/windows|win32|win64|wow32|wow64/g)) {
    system = "windows"; // windows系统
  } else if (testUa(/macintosh|macintel/g)) {
    system = "macos"; // macos系统
  } else if (testUa(/x11/g)) {
    system = "linux"; // linux系统
  } else if (testUa(/android|adr/g)) {
    system = "android"; // android系统
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
    system = "ios"; // ios系统
  }
  return system
}

export default useGetPlatForm