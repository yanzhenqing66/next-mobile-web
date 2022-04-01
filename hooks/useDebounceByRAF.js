import { useEffect } from 'react'

function useDebounceByRAF(func) {
  let ticking = false

  const fn = (e) => {
    const scrollTop = (e.srcElement ? e.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (e.srcElement ? e.srcElement.body.scrollTop : 0)

    const clientHeight = e?.target?.documentElement?.clientHeight || e?.srcElement?.documentElement.clientHeight

    const scrollHeight = e?.target?.documentElement?.scrollHeight || e?.srcElement?.documentElement.scrollHeight

    if (typeof func === 'function') {
      func({ scrollTop, clientHeight, scrollHeight })
    }

    ticking = false
  }

  const onScroll = (e) => {
    if (!ticking) {
      requestAnimationFrame(() => fn(e)) || fn(e)
      ticking = true
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

export default useDebounceByRAF