import React, { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useSelector, useDispatch } from 'react-redux'
import { InfiniteScroll, Tabs } from 'antd-mobile'
import { LeftOutline, DownFill } from 'antd-mobile-icons'
import { useImmerReducer } from 'use-immer'
import { getCookies } from '@/utils/formatServreParams'
import { reportLog } from '@/utils/pixelTrack'
import { initState, shopReducer } from '@/components/content/shop/reducer'
import Head from '@/components/common/head'
import TopHead from '@/components/common/topHead'
import { getProductList } from '@/api/home'
import { getStoreDetail, getStoreLabel } from '@/api/wishList'
import useSyncCallback from '@/hooks/useSyncCallback'
import { saveGoods, delGoods } from '@/store/follow/action'
import ShopInfo from '@/components/content/shop/shopInfo'
import LoadPage from '@/components/common/loadPage'

const FollowBgc = dynamic(() => import('@/components/content/shop/followBgc'), { ssr: false })
const Share = dynamic(() => import('@/components/common/share'))
const Waterfall = dynamic(() => import('@/components/common/waterfall'), { ssr: false })
const FilterPrice = dynamic(() => import('@/components/content/filterPrice'), { ssr: false })
const TopBar = dynamic(() => import('@/components/common/topBar'))
const NofollowGoods = dynamic(() => import('@/components/content/shop/nofollowGoods'))
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import ShopHeader from '@/components/content/shop/header'

import style from './shop.module.scss'
import storeUtils from '@/utils/storageUtil'


const filterTitle = (
  <>Filter <DownFill fontSize={14} /></>
)

const tabList = [
  { key: '1', title: 'Smart' },
  { key: '2', title: 'Sales' },
  { key: '3', title: 'New' },
  { key: '4', title: filterTitle }
]

const getSort = (key) => {
  let sortName = 'smart'
  switch (key) {
    case '1':
      sortName = 'smart'; break
    case '2':
      sortName = 'sale'; break
    case '3':
      sortName = 'publishedTime'; break
    case '4':
      sortName = 'price'; break
    default: return
  }
  return sortName
}

let page = 1

function Shop({ storeInfo, id, resolvedUrl }) {
  const router = useRouter()
  const goods = useSelector(state => state.followReducer)
  const dispatch = useDispatch()

  const [{
    productList,
    activeTab,
    searchParams,
    hasMore,
    filterVisible,
    loading,
  }, shopDispatch] = useImmerReducer(shopReducer, initState)

  const loadMore = async () => {
    if (!productList.length) {
      shopDispatch({ type: 'loading', data: true })
    }

    const sortName = getSort(activeTab)
    const params = {
      storeId: id,
      curPage: page,
      pageSize: 20,
      sortName,
      ...searchParams
    }
    try {
      const { data } = await getProductList(params)
      if (Array.isArray(data.contents)) {
        page++
        shopDispatch({ type: 'set_list', data: data.contents })
        shopDispatch({ type: 'hasMore', data: data.contents.length > 0 })
        shopDispatch({ type: 'loading', data: false })
      }
    } catch (e) {
      shopDispatch({ type: 'loading', data: false })
    }
  }

  const onTabClick = useCallback(tab => {
    if (!tab) return
    if (tab == '4') {
      shopDispatch({ type: 'filterVisible', data: true })
      return
    }
    page = 1
    dispatch(delGoods())
    shopDispatch({ type: 'clear_list' })
    shopDispatch({ type: 'activeTab', data: tab })
    window.scrollTo(0, 0)
    refresh()
  }, [])

  const searchFilter = useCallback((ps) => {
    page = 1
    shopDispatch({ type: 'clear_list' })
    shopDispatch({ type: 'searchParams', data: { ...ps } })
    shopDispatch({ type: 'activeTab', data: '1' })
    shopDispatch({ type: 'filterVisible', data: false })
    refresh()
  }, [])

  const refresh = useSyncCallback(() => {
    loadMore()
  })

  const goBack = useCallback(() => {
    dispatch(delGoods())
    if (window.history.length <= 1) {
      router.push('/')
      return false
    } else {
      router.back()
    }
  }, [])

  const goDetail = (id) => {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    const data = {
      scrollTop,
      listData: productList,
      pageIndex: page,
      hasMore,
      itemIndex: id,
      activeTab
    }
    dispatch(saveGoods(data))
    reportLog({ page: 'store', item_id: id })
  }

  const init = () => {
    const { listData, pageIndex, activeTab, hasMore } = goods
    if (listData && listData.length) {
      page = pageIndex
      shopDispatch({ type: 'set_list', data: listData })
      shopDispatch({ type: 'activeTab', data: activeTab })
      shopDispatch({ type: 'hasMore', data: hasMore })
      scrollTo()
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

  useEffect(() => {
    init()

    return () => {
      page = 1
    }
  }, [])


  const title = `${storeInfo.storeTitle} | I discovered amazing products on PoppyApps.com, come check them out! | https://poppyapps.com/shop/${id}`

  const renderList = () => {
    if (loading) {
      return <LoadPage top='10vh' />
    } else if (!productList.length || !storeInfo.availableStatus) {
      return <NofollowGoods />
    } else {
      return (
        <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
          <Waterfall data={productList} goDetail={goDetail} />
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </div>
      )
    }
  }

  return (
    <>
      <Head title={title} image={storeInfo.logo} />
      <div className={style.bgc}>
        <div className={style.share}>
          <TopHead
            left={<div className={style.backBtn}><LeftOutline fontSize={23} onClick={goBack} /></div>}
            right={<div className={style.shareBtn}><Share url={resolvedUrl} /></div>}
          />
        </div>
        <FollowBgc bgcPic={storeInfo.backgroundPicture} />
      </div>

      <ShopHeader
        tabList={tabList}
        resolvedUrl={resolvedUrl}
        storeTitle={storeInfo.storeTitle}
        activeTab={activeTab}
        onTabClick={onTabClick}
        goBack={goBack}
      />

      <ShopInfo storeInfo={storeInfo} id={id} />
      <Tabs activeKey={activeTab} onChange={onTabClick}>
        {
          tabList.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))
        }
      </Tabs>
      {renderList()}
      <FilterPrice
        filterVisible={filterVisible}
        onClose={() => shopDispatch({ type: 'filterVisible', data: false })}
        searchFilter={searchFilter}
      />
      <TopBar />
    </>
  )
}

export const getServerSideProps = async ({ query: { id }, resolvedUrl, req }) => {
  const cookies = getCookies(req)

  const headers = {
    'device-id': cookies['device-id'] || '',
    'X-Poppy-Token': cookies.poppy_token || '',
    'platform-id': 'web'
  }

  const { data: storeInfo } = await getStoreDetail(id, headers)
  const { data: storeLabel } = await getStoreLabel(id)

  if (!storeInfo) {
    return {
      redirect: {
        destination: '/_error',
        permanent: false,
      }
    }
  }

  return {
    props: {
      storeInfo: { ...storeInfo, storeLabel },
      resolvedUrl,
      id
    }
  }
}

export default Shop
