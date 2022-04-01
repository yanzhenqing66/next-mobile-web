import React, { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { InfiniteScroll, NavBar, CapsuleTabs } from 'antd-mobile'
import useParseCookies from '@/hooks/useParseCookies'
import useSyncCallback from '@/hooks/useSyncCallback'
import Head from '@/components/common/head'
import formatParams from '@/utils/formatParams'
import { getReviewList } from '@/api/goodsDetail'
import { getReviewTag, getStoreReveiws } from '@/api/reviews'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import ImgReview from '@/components/content/reviewList/imgReview'
import ReviewList from '@/components/content/reviewList'
import { reviewsInitState, reviewsReducer } from '@/components/content/reviewList/reducer'
import LoadPage from '@/components/common/loadPage'
import style from './review.module.scss'

let page = 1

const getViewTag = (type) => {
  let viewTag = 'tag_picture'
  if (type == 1) {
    viewTag = 'tag_picture'
  } else {
    viewTag = 'tag_all'
  }
  return viewTag
}

const Reviews = ({ id, storeUrl, tags, storeId }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reviewsReducer, reviewsInitState)
  const data = state.get('data')
  const hasMore = state.get('hasMore')
  const activeTab = state.get('activeTab')
  const loading = state.get('loading')

  const loadMore = async () => {
    const tag = getViewTag(activeTab)
    if (!data.size) {
      dispatch({ type: 'loading', data: true })
    }

    try {
      if (storeUrl) {
        const params = {
          curPage: page,
          pageSize: 20,
          reviewTag: tag,
          storeUrl,
          storeId
        }
        const { data } = await getStoreReveiws(params)
        dispatch({ type: 'loading', data: false })
        const views = data?.reviews
        if (Array.isArray(views)) {
          dispatch({ type: 'set_data', data: data.reviews })
          dispatch({ type: 'hasMore', data: views.length >= 20 })
          page++
        }
      } else {
        const params = formatParams({
          curPage: page,
          pageSize: 20,
          productId: id,
          reviewTag: tag,
        })
        const { data } = await getReviewList(params)
        dispatch({ type: 'loading', data: false })
        const views = data?.reviews
        if (Array.isArray(views)) {
          dispatch({ type: 'set_data', data: data.reviews })
          dispatch({ type: 'hasMore', data: views.length >= 20 })
          page++
        }
      }
    } catch (error) {
      dispatch({ type: 'loading', data: false })
    }
  }

  const onTabClick = tab => {
    if (!tab) return
    window.scrollTo(0, 0)
    page = 1
    dispatch({ type: 'clear_data' })
    dispatch({ type: 'activeTab', data: tab })
    refresh()
  }

  const refresh = useSyncCallback(() => {
    loadMore()
  })

  useEffect(() => {
    loadMore()

    return () => {
      page = 1
    }
  }, [])

  const renderList = () => {
    if (loading) {
      return <LoadPage fixed />
    } else {
      return (
        <main className={style.main}>
          {
            activeTab == 1 ? <ImgReview data={data} /> : <ReviewList data={data} />
          }
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </main>
      )
    }
  }

  return (
    <div className={style.review}>
      <Head />
      <header className={style.header}>
        <NavBar onBack={() => router.back()}>Reviews</NavBar>
        <CapsuleTabs
          activeKey={activeTab}
          onChange={onTabClick}
        >
          {
            tags.map(item => (
              <CapsuleTabs.Tab title={item.title} key={item.key}></CapsuleTabs.Tab>
            ))
          }
        </CapsuleTabs>
      </header>
      {renderList()}
    </div>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  const { storeUrl: url, id: ids, storeId: storeIds } = query
  let storeUrl = url || ''
  let storeId = storeIds || ''

  const cookies = useParseCookies(req)

  const headers = {
    'device-id': cookies['device-id'] || '',
    'X-Poppy-Token': cookies.poppy_token || '',
    'platform-id': 'web'
  }

  const id = ids === 'store' ? '' : ids

  let tags
  const { data } = await getReviewTag(id, headers)

  tags = data.map((item, index) => {
    item.key = index + 1
    if (id) {
      item.title = item.name + ' (' + item.count + ')'
    } else {
      item.title = item.name
    }
    return item
  })

  if (!tags) {
    return {
      redirect: {
        destination: '/_error',
        permanent: false,
      }
    }
  }

  return {
    props: {
      id,
      storeUrl,
      tags,
      storeId
    }
  }
}

export default Reviews