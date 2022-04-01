import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Tabs } from 'antd-mobile'
import Head from '@/components/common/head'
import AddWish from './addWish'
import style from './wishLayout.module.scss'

function WishLayout({ children }) {
  const router = useRouter()

  const [tabs] = useState([
    { key: '0', title: 'Favorites' },
    { key: '1', title: 'Recently viewed' },
    { key: '2', title: 'Following' }
  ])

  const onTabClick = (tab) => {
    if (!tab) return
    if (tab == '0') {
      router.push('/wishList')
    } else if (tab == '1') {
      router.push('/wishList/recentView')
    } else if (tab == '2') {
      router.push('/wishList/following')
    }
  }

  const activeTab = () => {
    if (router.pathname == '/wishList') return '0'
    if (router.pathname == '/wishList/recentView') return '1'
    if (router.pathname == '/wishList/following') return '2'
  }

  return (
    <div className={style.wishList}>
      <Head title="I thought you'd like this wishlist on PoppyApps.com, come check them out! https://www.poppyapps.com/wishList" />
      <div className={style.header} >
        <section className={style.headerTitle}>
          <h2>Wish List</h2>
          <div className={style.addWish}><AddWish /></div>
        </section>
        <Tabs
          activeKey={activeTab()}
          onChange={onTabClick}
          style={{
            '--adm-color-primary': '#222'
          }}
        >
          {
            tabs.map(item => (
              <Tabs.Tab
                title={item.title}
                key={item.key}
              />
            ))
          }
        </Tabs>
      </div>
      <div className={style.main}>
        {children}
      </div>
    </div>
  )
}

export default WishLayout
