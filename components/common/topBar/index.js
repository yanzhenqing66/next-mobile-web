import { useState } from 'react'
import { UpOutline } from 'antd-mobile-icons'
import useDebounceByRAF from '@/hooks/useDebounceByRAF'
import style from './topBar.module.scss'

function TopBar() {
  const [topBarFlag, setTopBarFlag] = useState(false)

  useDebounceByRAF(({ scrollTop }) => {
    if (scrollTop > 2000) {
      setTopBarFlag(true)
    } else {
      setTopBarFlag(false)
    }
  })

  const onUp = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className={style.topBar} onClick={onUp}>
      <UpOutline fontSize={16} />
      <p>TOP</p>
      <style jsx>{`
        div {
          display: ${topBarFlag ? '' : 'none'};
        }
      `}</style>
    </div>
  )
}

export default TopBar