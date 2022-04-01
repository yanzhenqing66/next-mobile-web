import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import Head from '@/components/common/head'
import useGetParams from '@/hooks/useGetParams'
import SearchBar from '@/components/common/searchBar'
import EventBus from '@/utils/eventBus'
import Product from '@/components/content/searchPage/product'
const Brand = dynamic(import('@/components/content/searchPage/brand'))
import style from './searchPage.module.scss'
import { fbTrack, pinTrack, adEvent } from '@/utils/pixelTrack'


const searchTabs = [
  { tab: '1', title: 'Product' },
  { tab: '2', title: 'Brand' },
]

function SearchPage() {
  const router = useRouter()
  const { q } = useGetParams(decodeURIComponent(router.asPath))

  const [activeSearch, setActiveSearch] = useState('1')

  const goHome = () => {
    router.push('/')
  }

  const goSearch = () => {
    router.push('/search')
  }

  useEffect(() => {
    fbTrack('Search', {
      search_string: q
    })
    pinTrack('Search', {
      search_query: q
    })
    adEvent('iof1kb', {
      search_query: q
    })
    return () => {
      EventBus.emit('searchWord', q)
    }
  }, [])


  return (
    <div className={style.searchPage}>
      <Head />
      <header className={style.header}>
        <section className={style.searchBar}>
          <LeftOutline className={style.goBack} onClick={goHome} />
          <SearchBar value={q} onFocus={goSearch} />
        </section>
        <Tabs
          activeKey={activeSearch}
          onChange={(key) => setActiveSearch(key)}
          style={{ '--adm-color-primary': '#222' }}
        >
          {
            searchTabs.map(item => (
              <Tabs.Tab title={item.title} key={item.tab} />
            ))
          }
        </Tabs>
      </header>
      <>
        {
          activeSearch === '1' ? <Product q={q} /> : <Brand q={q} />
        }
      </>
    </div>
  )
}

export default SearchPage
