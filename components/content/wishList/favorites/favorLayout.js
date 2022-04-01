import dynamic from 'next/dynamic'
import React from 'react'
import MyFavorites from "@/components/common/wishList/myFavorites"
const Discover = dynamic(import('./components/discover'))
import style from './favorites.module.scss'

function FavorLayout({data}) {

  return (
    <div className={style.favorites_wrap}>
      <p className={style.fw_count}>{data.total} items</p>
      <MyFavorites data={data.contents} />
      {
        data.total < 6 ? <Discover /> : null
      }
    </div>
  )
}

export default FavorLayout