import React from 'react'
import router from 'next/router'
import { Button } from 'antd-mobile'
import style from './wishDefault.module.scss'
import LazyLoad from '@/components/common/lazyLoad'

function WishDefault({ title, preview }) {

  return (
    <div className={style.wrap}>
      <div className={style.img}>
        <LazyLoad src={preview} />
      </div>
      <h3>{title}</h3>
      <Button className={style.goBtn} onClick={() => router.push('/')}>Go discover</Button>
    </div>
  )
}

export default WishDefault