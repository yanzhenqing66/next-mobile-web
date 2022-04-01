import React, { useState } from 'react'
import useSWR from 'swr'
import PropsTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getHotSearch, getHistorySearch, delSearchHis } from '@/api/home'
import SvgIcon from '@/components/common/svgIcon'
import style from './tips.module.scss'

function fetchHotWords() {
  return getHotSearch().then(res => res.data)
}

function fetchHistoryWords(token) {
  if (!token) return
  return getHistorySearch().then(res => res.data)
}

function SearchTips({ goSearchPage }) {
  const token = useSelector(state => state.tokenReducer)
  const { data: hotWrods } = useSWR('search/top?curPage=1&pageSize=10', fetchHotWords)
  const { data: historyWords } = useSWR('search/recent', () => fetchHistoryWords(token))
  const [hisShow, setHisShow] = useState(true)

  const delHistory = async () => {
    setHisShow(false)
    await delSearchHis()
  }

  return (
    <div className={style.searchTips}>
      {
        historyWords?.length && hisShow ?
          (
            <section className={style.history}>
              <div className={style.head}>
                <h4>Recent Search History </h4>
                <p className='pointer' onClick={delHistory}>Delete</p>
              </div>

              <ul>
                {
                  historyWords?.slice(0, 10).map((item, index) => {
                    return <li
                      key={index}
                      onClick={() => goSearchPage(item.words)}
                    >{item.words}</li>
                  })
                }
              </ul>
            </section>
          ) : null
      }
      <section className={style.hot}>
        <h4>Hot Search</h4>
        <ul>
          {
            hotWrods?.map((item, index) => {
              return <li
                key={index}
                onClick={() => goSearchPage(item.words)}
                className={style.hot_first}
              >
                {
                  index === 0 
                    ? <SvgIcon src="/images/common/hot.svg" className={style.hot_first_pic} /> : null
                }
                <span>
                  {item.words}
                  <style jsx>
                    {
                      `
                        span {
                          color: ${index === 0 ? '#F93A3A' : ''}
                        }
                      `
                    }
                  </style>
                </span>
              </li>
            })
          }
        </ul>
      </section>
    </div>
  )
}

SearchTips.propTypes = {
  seachListLen: PropsTypes.number
}


export default SearchTips