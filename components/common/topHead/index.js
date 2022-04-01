import { memo } from 'react'
import style from './topHead.module.scss'

function TopHead({ left, center, right }) {
  return (
    <div className={style.topHead}>
      <div>{left}</div>
      <div className={style.center}>
        {center}
      </div>
      <div>{right}</div>
    </div>
  )
}

export default memo(TopHead)