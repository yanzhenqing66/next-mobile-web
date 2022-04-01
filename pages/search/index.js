import dynamic from 'next/dynamic'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { List } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import Head from '@/components/common/head'
import { getSearchList } from '@/api/home'
import SearchBar from '@/components/common/searchBar'
import formatParams from '@/utils/formatParams'
import { debounce } from '@/utils/optimizeFn'
import EventBus from '@/utils/eventBus'
const SearchTips = dynamic(import('@/components/content/search/searchTip'))
import style from './search.module.scss'

const Item = List.Item

function Search() {
  const router = useRouter()
  const searchRef = useRef()
  const [seachList, setSearchList] = useState([])
  const [keywords, setKeyWord] = useState('')

  EventBus.on('searchWord', (val) => {
    setKeyWord(val)
  })

  const searchChange = (val) => {
    setKeyWord(val)
    const params = formatParams({
      q: val
    })
    getSearch(params)
  }

  const getSearch = debounce((params) => {
    getSearchList(params).then(res => {
      if (res.code === 200) {
        const data = res.data.slice(0, 9)
        setSearchList([...data])
      }
    })
  }, 500)

  const goSearchPage = (e) => {
    router.push({
      pathname: `/searchPage`,
      query: {q: encodeURIComponent(e)}
    })
  }

  useEffect(() => {
    setTimeout(() => {
      searchRef && searchRef.current.focus()
    }, 500)
  }, [])

  return (
    <div className={style.search}>
      <Head />
      <section className={style.searchTop}>
        <LeftOutline className={style.goBack} onClick={() => router.back()} />
        <SearchBar
          onChange={searchChange}
          onSubmit={goSearchPage}
          searchRef={searchRef}
          value={keywords}
        />
      </section>
      <List className={style.searchList}>
        {
          seachList.map((item, index) => {
            return <Item
              className={style.searchItem}
              key={index}
              onClick={(e) => goSearchPage(e.target.textContent)}
              arrow={false}
            >{item}</Item>
          })
        }
      </List>
      {
        seachList.length ? null : <SearchTips goSearchPage={goSearchPage} />
      }
    </div>
  )
}

export default Search