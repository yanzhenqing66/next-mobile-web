import { useEffect, useState } from 'react'
import { InfiniteScroll } from 'antd-mobile'
import MyFavorites from "@/components/common/wishList/myFavorites"
import { getDiscover } from "@/api/wishList"
import formatParams from '@/utils/formatParams'
import style from './discover.module.scss'

let page = 1
function Discover() {
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  
  const loadMore = async () => {
    const params = formatParams({
      curPage: page,
      pageSize: 10,
    })
    const { data } = await getDiscover(params)
    const res = data?.contents
    setData(data => [...data, ...res])
    setHasMore(res.length >= 10)
    page++
  }

  useEffect(() => {
    return () => {
      page = 1
    }
  }, [])

  return (
    <div className={style.discover}>
      <h3>Discover</h3>
      <MyFavorites data={data} />
      <InfiniteScroll hasMore={hasMore} loadMore={loadMore}>
        <>
          {hasMore ? '' : <span>--- There's nothing more ---</span>}
        </>
      </InfiniteScroll>
    </div>
  )
}

export default Discover