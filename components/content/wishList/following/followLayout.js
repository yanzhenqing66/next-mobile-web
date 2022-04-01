import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { RightOutline } from 'antd-mobile-icons'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import style from './followLayout.module.scss'

function FollowLayout({ followList }) {
  return (
    <>
      {
        followList.map((item, index) => (
          <Link
            href={`/shop/${item.id}`}
            key={index}
          >
            <a className={style.container}>
              <header className={style.followHeader} style={{ overflow: 'hidden' }}>
                <div className={style.brandLogo}>
                  <LazyLoad src={item.logo} alt={item.brand} />
                </div>
                <section className={style.brand}>
                  <h4>{item.brand}</h4>
                  {
                    item.newCount ? <p className={style.tips}>{item.newCount} new products</p> : null
                  }
                </section>
                <RightOutline className={style.goDetail} />
              </header>
              {
                Array.isArray(item.productList) && item.productList.length ?
                  (
                    <footer className={style.followMain}>
                      {
                        item.productList.slice(0, 4).map(item2 => (
                          <div key={item2.id}>
                            <LazyLoad src={item2.featuredImage && item2.featuredImage.src} alt={item.title} />
                          </div>
                        ))
                      }
                    </footer>
                  ) : null
              }
            </a>
          </Link>
        ))
      }
    </>
  )
}

export default FollowLayout