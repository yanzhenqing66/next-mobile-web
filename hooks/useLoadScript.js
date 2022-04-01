

const useLoadScript = (src, id, callback) => {
  let script = document.querySelector(id);
  if (script) {
    return;
  }
  script = document.createElement('script')
  let head = document.getElementsByTagName('head')[0]
  script.async = true
  script.src = src
  script.id = id
  if (script.addEventListener) {
    script.addEventListener('load', function () {
      callback()
    }, false)
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', function () {
      let target = window.event.srcElement;
      if (target.readyState == 'loaded') {
        callback();
      }
    })
  }
  head.appendChild(script)
}

export default useLoadScript