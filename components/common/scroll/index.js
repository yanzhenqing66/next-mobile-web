import React, { useEffect, useRef } from 'react'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import { debounce } from '@/utils/optimizeFn'
import PropTypes from 'prop-types'

function Scroll(props) {
  const { scrollX, scrollY, children, style, scrollOpt, getPosition, className } = props
  const scrollRef = useRef(null)

  useEffect(() => {
    BScroll.use(MouseWheel)
    BScroll.use(ObserveDOM)
    if (scrollRef.current) {
      const bs = new BScroll(scrollRef.current, {
        probeType: 3,
        scrollX: scrollX,
        scrollY: scrollY,
        click: true,
        tap: true,
        mouseWheel: true,
        observeDOM: true,
        preventDefaultException: {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO|H1|SPAN|P)$/
        }
      })
      scrollOpt && scrollOpt(bs)
      getPosition && bs.on('scroll', debounce(p => {
        getPosition(p)
      }, 200))
    }
  }, [])

  return (
    <div
      ref={scrollRef}
      style={{ ...style }}
      className={className}
    >
      {children}
    </div>
  )
}

Scroll.propTypes = {
  pullUpLoad: PropTypes.bool,
  style: PropTypes.object,
  loadMore: PropTypes.func,
  scrollOpt: PropTypes.func,
  getPosition: PropTypes.func,
  scrollX: PropTypes.bool,
  scrollY: PropTypes.bool
}

Scroll.defaultProps = {
  scrollX: false,
  scrollY: true
}

export default Scroll