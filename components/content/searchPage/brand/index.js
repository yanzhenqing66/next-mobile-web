import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { unstable_batchedUpdates } from 'react-dom'
import { Space, InfiniteScroll } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { getBrandList } from '@/api/home'
import LazyLoad from '@/components/common/lazyLoad'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import { formatYear } from '@/utils/formatDate'
import LoadPage from '@/components/common/loadPage'
const NoSearch = dynamic(import('../noSearch'))
import IconFont from '@/components/common/IconFont'
import { reportLog } from '@/utils/pixelTrack'
import style from './brand.module.scss'

let page = 1

function Brand({ q }) {
  const [status, setStatus] = useState(1)
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    return () => {
      page = 1
    }
  }, [])

  const loadMore = async () => {
    if (!data.length) {
      setStatus(0)
    }
    const params = {
      storeTitle: q,
      curPage: page,
      pageSize: 10
    }
    try {
      const { data: res } = await getBrandList(params)
      const resData = res.contents || []
      if (!resData.length && !data.length) {
        setStatus(2)
        return
      }
      page++
      unstable_batchedUpdates(() => {
        setData(val => [...val, ...resData])
        setHasMore(resData.length >= 10)
        setStatus(1)
      })
    } catch (e) {
      if (!data.length) {
        setStatus(2)
      }
    }

  }

  const goDetail = (id) => {
    reportLog({ page: 'search_brand', item_id: id })
  }

  const renderList = () => (
    <>
      {
        data?.map((item, index) => (
          <Link
            href={`/shop/${item.id}`}
            key={index}
          >
            <a className={style.container} onClick={() => goDetail(item.id)}>
              <section className={style.top}>
                <div className={style.logo}>
                  <LazyLoad src={item.logo} />
                </div>
                <div className={style.info}>
                  <h2 className={style.title}>{item.brand}</h2>
                  <Space className={style.review}>
                    <span>Since {formatYear(item.openTime)}</span>
                    {item.followerCount ? <span>|</span> : null}
                    {item.followerCount ? <span>{item.followerCount} follower</span> : null}
                    {item.storeScore ? <span>|</span> : null}
                    {
                      item.storeScore ?
                        <span>
                          <IconFont type="icon-follow" /> {item.storeScore} {'(' + item.reviewCount + ')'}
                        </span>
                        : null
                    }
                  </Space>
                </div>
                <RightOutline />
              </section>
              {
                item.productList?.length ? <section className={style.bottom}>
                  <Space>
                    {
                      item.productList?.map((item2, idx2) => (
                        <LazyLoad
                          src={item2?.featuredImage?.src}
                          key={idx2}
                          className={style.product_pic}
                          alt={item2?.brand}
                        />
                      ))
                    }
                  </Space>
                </section> : null
              }
            </a>
          </Link>
        ))
      }
    </>
  )

  const statusPage = () => {
    if (status === 1) {
      return (
        <>
          {renderList()}
          <InfiniteScroll InfiniteScroll loadMore={loadMore} hasMore={hasMore} >
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll >
        </>
      )
    } else if (status === 2) {
      return <NoSearch />
    } else {
      return <LoadPage fixed />
    }
  }

  return (
    <div className={style.brand}>
      {statusPage()}
    </div>
  )
}

export default Brand