import { useState, useEffect, memo } from 'react'
import { Tabs } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import TopHead from '@/components/common/topHead'
import Share from '@/components/common/share'
import style from './shophead.module.scss'

function ShopHeader(props) {
  const { resolvedUrl, storeTitle, activeTab, onTabClick, goBack, tabList } = props

  const [isTab, setIsTab] = useState(false)

  const scrollEvent = (e) => {
    const scrollTop = (e.srcElement ? e.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (e.srcElement ? e.srcElement.body.scrollTop : 0);

    if (scrollTop > 400) {
      setIsTab(true)
    } else {
      setIsTab(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(scrollEvent) || scrollEvent()
    })

    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [])
  
  return (
    <div
      className={style.headerTab}
      style={{
        display: isTab ? '' : 'none',
      }}>
      <TopHead
        left={<LeftOutline fontSize={23} onClick={goBack} />}
        center={storeTitle}
        right={<Share url={resolvedUrl} />}
      />
      <Tabs activeKey={activeTab} onChange={onTabClick}>
        {
          tabList.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))
        }
      </Tabs>
    </div>
  )
}

export default memo(ShopHeader)