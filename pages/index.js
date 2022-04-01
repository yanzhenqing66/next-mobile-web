import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { InfiniteScroll } from 'antd-mobile'
import Head from '@/components/common/head'
import { adEvent, reportLog } from '@/utils/pixelTrack'
import HomeLayout from '@/components/content/home/homeLayout'
import parseCookies from '@/utils/parseCookies'
import { getHomeLabel, getHotSearch, getGoodsList } from '@/api/home'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import { saveGoodsList, saveGoodsInfo } from '@/store/home/action'
import useSyncCallback from "@/hooks/useSyncCallback"
import PageLoad from '@/components/common/loadPage'
import SocialLink from '@/components/common/socialLink'
import storeUtils from '@/utils/storageUtil'
const Waterfall = dynamic(() => import('@/components/common/waterfall'), { ssr: false })
const TopBar = dynamic(() => import('@/components/common/topBar'))
const ErrorPage = dynamic(() => import('@/components/common/errorPage'))

let page = 1
let sessionId = 'session_id_' + Date.now()

function Home({ labels, h, hotWords }) {
  const router = useRouter()
  const goods = useSelector(state => state.goodsReducer)
  const dispatch = useDispatch()

  const [hasMore, setHasMore] = useState(false)
  const [status, setStatus] = useState(1)

  const activeId = () => {
    return router.query.id || 0
  }

  const loadMore = async () => {
    const params = {
      customLabelId: activeId(),
      curPage: page,
      pageSize: 10,
      hobby: h,
      sessionId
    }

    try {
      const { data } = await getGoodsList(params)
      const contents = data.contents || []
      page++
      dispatch(saveGoodsList(contents))
      setHasMore(contents.length > 0)
      setStatus(1)
      listViewlog(contents, activeId())
    } catch (err) {
      if (!goods.listData.length)
        setStatus(0)
    }
  }

  const goDetail = (id) => {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    const data = {
      scrollTop,
      pageIndex: page,
      itemIndex: id,
      activeTab: activeId()
    }
    dispatch(saveGoodsInfo(data))
    reportLog({ item_id: id, tab_id: activeId() })
  }

  const init = () => {
    const { listData, pageIndex } = goods
    if (listData && listData.length) {
      page = pageIndex
      setHasMore(true)
      scrollTo()
      setStatus(1)
    } else {
      loadMore()
    }
  }

  const scrollTo = useSyncCallback(() => {
    const { scrollTop } = goods
    window.scrollTo({
      top: scrollTop,
      behavior: "instant"
    })
  })

  const tabClick = (tab) => {
    if (!tab) return
    page = 1
    sessionId = 'session_id_' + Date.now()
    // router.push(`/?id=${tab}`, undefined, { shallow: true })
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
    init()
  }, [activeId()])

  useEffect(() => {
    setRichTxt()
    adEvent('gurb00', {
      active_tab: activeId()
    })

    return () => {
      page = 1
    }
  }, [])

  useEffect(() => {
    const start_ts = new Date().getTime()
    return () => {
      const end_ts = new Date().getTime()
      reportLog({ event: 'page_duration', page: 'feed', tab_id: activeId(), start_ts, end_ts })
    }
  }, [])

  const fallMemo = useMemo(() => {
    return <Waterfall data={goods.listData} goDetail={goDetail} />
  }, [goods])

  const renderList = () => {
    if (!goods.listData.length && status !== 0) {
      return <PageLoad fixed />
    } else if (status === 0) {
      return <ErrorPage />
    } else {
      return (
        <div className='min100vh'>
          {fallMemo}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </div>
      )
    }
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.poppyapps.com" />
      </Head>
      <HomeLayout
        labels={labels}
        hotWords={hotWords}
        activeId={activeId()}
        tabClick={tabClick}
      >
        <div className='bgf6'>
          {renderList()}
        </div>
      </HomeLayout>
      <TopBar />
      <SocialLink />
    </>
  )
}

const listViewlog = (data, tab_id) => {
  const ids = data?.map(item => {
    return { item_id: item.id, startTime: 1, endTime: 1 }
  })
  reportLog({ event: 'show', item_views: ids, tab_id })
}

// 设置数据格式化结构
const setRichTxt = () => {
  let s = document.querySelector("#json_ld")
  s && s.parentNode.removeChild(s)
  let script = document.createElement("script")
  let webJsonLd =
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "http://www.poppyapps.com",
    "logo": "https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/brand.svg"
  }
  script.id = "json_ld"
  script.type = 'application/ld+json'
  script.text = JSON.stringify(webJsonLd)
  document.querySelector('head').appendChild(script)
}


export const getServerSideProps = async ({ query, req }) => {
  const h = query.h || ''
  const cookies = parseCookies(req)

  const headers = {
    'device-id': cookies['device-id'] || '',
    'X-Poppy-Token': cookies.poppy_token || '',
    'platform-id': 'web'
  }

  const { data } = await getHomeLabel(headers)
  const labels = data.label

  const { data: hotWords } = await getHotSearch(headers)

  if (!labels) {
    return {
      redirect: {
        destination: '/_error',
        permanent: false
      },
    }
  }

  return {
    props: {
      labels,
      hotWords,
      h
    }
  }
}

export default Home
