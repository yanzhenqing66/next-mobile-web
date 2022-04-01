import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { Tabs, InfiniteScroll } from 'antd-mobile'
import { DownFill } from 'antd-mobile-icons'
import { useSelector, useDispatch } from 'react-redux'
import { reportLog } from '@/utils/pixelTrack'
import { getProductList } from '@/api/home'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import { delGoods, saveGoods } from '@/store/search/action'
import useSyncCallback from "@/hooks/useSyncCallback"
import LoadPage from '@/components/common/loadPage'
const Waterfall = dynamic(import('@/components/common/waterfall'), { ssr: false })
const FilterPrice = dynamic(import('@/components/content/filterPrice'))
const NoSearch = dynamic(import('../noSearch'))
import style from './product.module.scss'

const filterTitle = (
  <>Filter <DownFill fontSize={14} /></>
)

const tabs = [
  { tab: '1', title: 'Smart' },
  { tab: '2', title: 'Sales' },
  { tab: '3', title: 'New' },
  { tab: '4', title: filterTitle }
]


const getSort = (type) => {
  let sortName
  switch (type) {
    case '1':
      sortName = 'smart'; break;
    case '2':
      sortName = 'sale'; break;
    case '3':
      sortName = 'publishedTime'; break
    case '4':
      sortName = 'price'; break
    default: break
  }
  return sortName
}

let page = 1
let sessionId = 'sessionId' + Date.now()

function Product({ q }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const goods = useSelector(state => state.searchReducer)
  const [activeTab, setActiveTab] = useState('1')
  const [hasMore, setHasMore] = useState(false)
  const [productList, setProductList] = useState([])
  const [status, setStatus] = useState(1)

  const [saerchParams, setSearchParams] = useState({
    freeShipping: 0,
    pictureReview: 0,
    storeAge: 0,
    minPrice: null,
    maxPrice: null,
  })

  const [filterVisible, setFilterVisible] = useState(false)

  const searchFilter = (ps) => {
    page = 1
    setProductList([])
    setSearchParams({ ...ps })
    setActiveTab('1')
    setFilterVisible(false)
    refresh()
  }

  const refresh = useSyncCallback(() => {
    getGoods()
  })

  const onTabClick = (tab) => {
    if (!tab) return
    if (tab == '4') {
      setFilterVisible(true)
      return
    }
    window.scrollTo(0, 0)
    page = 1
    setProductList([])
    setActiveTab(tab)
    dispatch(delGoods())
    sessionId = 'sessionId' + Date.now()
  }

  const getGoods = async () => {
    if (!productList.length) {
      setStatus(2)
    }
    const sortName = getSort(activeTab)

    const params = {
      curPage: page,
      pageSize: 20,
      q,
      asc: false,
      sortName,
      ...saerchParams,
      sessionId
    }
    try {
      const { data: res } = await getProductList(params)
      const data = res.contents
      if (Array.isArray(data)) {
        if (!data.length && !productList.length) {
          setStatus(0)
          return
        }
        page++
        unstable_batchedUpdates(() => {
          setProductList(val => [...val, ...data])
          setHasMore(data.length > 0)
          setStatus(1)
        })
      }
    } catch (e) {
      if (!productList.length) {
        setStatus(0)
      }
    }
  }

  const goDetail = (id) => {
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    const data = {
      listData: productList,
      pageIndex: page,
      itemIndex: id,
      activeTab,
      scrollTop,
      hasMore
    }
    dispatch(saveGoods(data))
    reportLog({ page: 'search_product', item_id: id })
  }

  useEffect(() => {
    const { listData, pageIndex, activeTab, hasMore } = goods
    if (listData && listData.length) {
      page = pageIndex
      setProductList(listData)
      setActiveTab(activeTab)
      setHasMore(hasMore)
      recoverData()
    } else {
      getGoods()
    }
  }, [activeTab])

  const recoverData = useSyncCallback(() => {
    const { scrollTop } = goods
    window.scrollTo({
      top: scrollTop,
      behavior: "instant"
    })
  })

  useEffect(() => {
    return () => {
      page = 1
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.includes('/productDetail')) {
        dispatch(delGoods())
      }
    }

    router.events.on('beforeHistoryChange', handleRouteChange)

    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange)
    }
  }, [])

  const renderList = () => {
    if (status === 1) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f6f6f6' }}>
          <Waterfall data={productList} goDetail={goDetail} />
          <InfiniteScroll loadMore={getGoods} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </div>
      )
    } else if (status === 0) {
      return <NoSearch />
    } else {
      return <LoadPage fixed />
    }
  }

  return (
    <>
      <div className={style.filter}>
        <Tabs
          activeKey={activeTab}
          onChange={onTabClick}
        >
          {
            tabs.map(item => (
              <Tabs.Tab title={item.title} key={item.tab} />
            ))
          }
        </Tabs>
      </div>
      {renderList()}
      <FilterPrice
        filterVisible={filterVisible}
        onClose={() => setFilterVisible(false)}
        searchFilter={searchFilter}
      />
    </>
  )
}

export default Product