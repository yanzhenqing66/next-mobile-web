import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import TextLoop from 'react-text-loop'
import { delGoods } from '@/store/home/action'
import SearchBar from '@/components/common/searchBar'
import ScrollTab from '@/components/common/scrollTab'
import style from './homeLayout.module.scss'

function HomeLayout({ labels, hotWords, children, tabClick, activeId }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const goSearch = () => {
    router.push('/search')
  }

  useEffect(() => {
    const handleRouteChange = (url) => {
      if(!url.includes('/productDetail')) {
        dispatch(delGoods())
      }
    }
    router.events.on('beforeHistoryChange', handleRouteChange)
    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange)
    }
  }, [])

  return (
    <>
      <header className={style.homeLayout}>
        <div className={style.search} onClick={goSearch}>
          <SearchBar />
          <div className={style.hotSwiper}>
            <TextLoop>
              {
                hotWords?.map((item, index) => (
                  <div key={index}>
                    {item.words}
                    <style jsx>{`
                        div {
                          color: #646464;
                          font-size: 15px;
                        }
                    `}</style>
                  </div>
                ))
              }
            </TextLoop>
          </div>
        </div>
        <ScrollTab
          tabs={labels}
          onTabClick={(tab) => tabClick(tab)}
          activeTab={activeId}
        />
      </header>
      {children}
    </>
  )
}

export default HomeLayout