import { memo } from 'react'
import Scroll from '@/components/common/scroll'
import style from './scrollTab.module.scss'
import styled from '@emotion/styled'
import Link from 'next/link'

let scroll = null
function ScrollTab({ tabs, onTabClick, activeTab }) {

  const iscrollCenter = (val) => {
    if (!val) return
    if (tabs[0].id == val) return
    if (tabs[tabs.length - 1].id == val) return
    const index = tabs.findIndex(item => item.id == val)
    // 滑动到指定索引的导航节点，并将其显示在可视区                   
    scroll && scroll.scrollToElement(document.querySelector('#scrollTab h2:nth-child(' + index + ')'), null, true, true)
    scroll && scroll.refresh()
  }

  const scrollOpt = bs => {
    scroll = bs
  }

  const tabClick = (val) => {
    if (!val) return
    onTabClick(val)
    iscrollCenter(val)
  }

  const ScrollT = styled(Scroll)`
    height: 44px;
    white-space: 'nowrap'
  `

  const H2 = styled.h2`
    color: ${({ id }) => activeTab * 1 === id ? '#222' : ''};
    border-bottom: ${({ id }) => activeTab * 1 === id ? '1.5px solid #222' : ''};
  `

  return (
    <ScrollT
      scrollX
      scrollY={false}
      scrollOpt={scrollOpt}
    >
      <div id="scrollTab" className={style.scrollTab} onClick={e => tabClick(e.target.dataset.key)}>
        {
          tabs.map(item => {
            return <H2
              key={item.id}
              id={item.id}
              data-key={item.id}
            >
              <Link href={`/?id=${item.id}`} shallow>
                <a>{item.displayName}</a>
              </Link>
            </H2>
          })
        }
      </div>
    </ScrollT>
  )
}

export default memo(ScrollTab)