const debounce = (fn, delay=300) => {
  let handler = null
  return function () {
    if(handler) clearTimeout(handler)
    handler = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay);
  }
}
const throttle = (fn, delay=500) => {
  let lastTime = null
  return (...arg) => {
    let nowTime = Date.now()
    if(!lastTime || nowTime - lastTime >= delay) {
      fn(...arg)
      lastTime = nowTime
    }
  }
}

export {debounce, throttle}