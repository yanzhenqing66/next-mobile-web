import { useLayoutEffect } from 'react'

function useLoadMore(loadMore, hasMore = true, percent = 50,) {

  useLayoutEffect(() => {
    let ticking = false

    const loadScroll = (e) => {
      // 滚动的高度
      const scrollTop = (e.srcElement ? e.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (e.srcElement ? e.srcElement.body.scrollTop : 0)

      // 当前屏幕显示的高度
      const clientHeight = e?.target?.documentElement?.clientHeight || e?.srcElement?.documentElement.clientHeight

      const scrollHeight = e?.target?.documentElement?.scrollHeight || e?.srcElement?.documentElement.scrollHeight

      const isToBottom = scrollTop + clientHeight - scrollHeight >= 0

      if (hasMore && isToBottom) {
        loadMore()
      }
      ticking = false
    }

    const onScroll = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => loadScroll(e))
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

export default useLoadMore