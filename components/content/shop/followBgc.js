import { memo } from "react"
import rem from "@/utils/rem"
import LazyLoad from "@/components/common/lazyLoad"
import style from './followBgc.module.scss'

function FollowBgc({ bgcPic }) {

  return (
    <>
      <LazyLoad
        src={bgcPic ?? 'https://cdn.poppyapps.com/store/background/0000/1.jpg'}
        height={rem(100)}
      />
      <div className={style.modal}></div>
    </>
  )
}

export default memo(FollowBgc)