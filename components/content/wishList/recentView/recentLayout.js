import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Toast } from 'antd-mobile'
import { DeleteOutline } from 'antd-mobile-icons'
import { delRecent } from '@/api/wishList'
import LazyLoad from '@/components/common/lazyLoad'
import formatPrice from '@/utils/formatPrice'
import { getRecentList } from '../request'
import useLoadMore from '@/hooks/useLoadMore'
import LoadPage from '@/components/common/loadPage'
import ErrorPage from '@/components/common/errorPage'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import style from './recentLayout.module.scss'
import { formatEnglishDate } from '@/utils/formatDate'
import { reportLog } from '@/utils/pixelTrack'

function getKey(page, previousPageData) {
  if (previousPageData && !previousPageData.length) return null
  return `userBrowsingHistory/list?curPage=${page + 1}&pageSize=${20}`
}

function RecentLayout() {
  const router = useRouter()

  const { data, error, size, setSize, loading, mutate } = getRecentList(getKey)

  useLoadMore(() => setSize(val => val + 1))

  const list = data ? [].concat(...data) : []
  const recentList = list.map(item => {
    item.date = formatEnglishDate(item.browsingTime)
    return item
  })

  const isLoadMore = size > 1 && data && typeof data[size - 1] === "undefined"

  const goDetail = (productId) => {
    router.push({
      pathname: `/productDetail/${productId}`,
      query: {
        action: `/productDetail/${productId}`,
        source_url: router?.pathname || ''
      }
    })
    reportLog({ page: 'wishlist_detail', tab_id: 'viewed', item_id: productId })
  }

  const delRecentItem = async (id) => {
    try {
      await delRecent({ id })
      mutate()
    } catch (error) {
      Toast.show({
        content: error?.message || '',
        position: 'bottom'
      })
    }
  }

  if (loading) {
    return <LoadPage fixed />
  } else if (error && !data?.[0]?.length) {
    return <ErrorPage />
  } else {
    return (
      <section className={style.recentLayout}>
        {
          recentList?.map((item, index) => {
            return (
              <Fragment key={index}>
                {
                  index == 0 || recentList[index - 1].date != recentList[index].date ? (
                    <header className={style.recentHeader}>
                      <h3>{item?.date}</h3>
                    </header>
                  ) : null
                }
                <main className={style.recentMain}>
                  <div className={style.recentImg} onClick={() => goDetail(item.productId)}>
                    <LazyLoad src={item?.featuredImage?.src} alt={item?.title} />
                  </div>

                  <section className={style.contentTitle} onClick={() => goDetail(item.productId)}>
                    <section className={style.brand}>
                      {
                        item?.brand ? <span>{item.brand}</span> : null
                      }
                    </section>
                    <section className={style.title}>{item?.title}</section>
                    <section className={style.price}>
                      <span className={style.sell}>{item?.currencyMark} {formatPrice(item.price)}</span>
                      {
                        item.compareAtPrice && item.compareAtPrice !== item.price ? (
                          <span className={style.delPrice}>{item.currencyMark} {formatPrice(item.compareAtPrice)}</span>) : null
                      }
                    </section>
                  </section>
                  <DeleteOutline
                    fontSize={20}
                    color="#F93A3A"
                    style={{ margin: 10, cursor: 'pointer' }}
                    onClick={() => delRecentItem(item.id)}
                  />
                </main>
              </Fragment>
            )
          })
        }
        <InfiniteScrollContent hasMore={isLoadMore} />
      </section>
    )
  }
}

export default RecentLayout