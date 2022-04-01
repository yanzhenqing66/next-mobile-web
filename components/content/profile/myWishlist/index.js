import { useEffect, useState } from 'react'
import { getFavorList } from '@/api/wishList'
import MyFavorites from '@/components/common/wishList/myFavorites'
import formatParams from '@/utils/formatParams'
import style from './myWishList.module.scss'

function MyWishList({userId}) {

  const [data, setData] = useState([])

  const getList = async () => {
    const params = formatParams({
      curPage: 1,
      pageSize: 100,
      type: userId ? 3 : 1,
      userId: userId || ''
    })
    const { data } = await getFavorList(params)
    const res = data.contents
    setData(res)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className={style.my_wishList}>
      <h3>Wishlist</h3>
      <MyFavorites data={data} />
    </div>
  )
}

export default MyWishList