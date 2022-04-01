import React, { useMemo, memo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Space } from 'antd-mobile'
import styled from '@emotion/styled'
import { formatYear } from '@/utils/formatDate'
import { useDetailState } from '../module'
import { adEvent } from '@/utils/pixelTrack'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import SvgIcon from '@/components/common/svgIcon'
import StoreShip from '../../shop/storeShip'
import FollowScore from '../../followScore'
import rem from '@/utils/rem'
import style from './aboutBrand.module.scss'

const Icon = styled(SvgIcon)`
  svg {
    width: ${rem(12)};
    height: ${rem(12)};
  }
`

function AboutBrand() {
  const { store } = useDetailState()

  const goStore = () => {
    adEvent('cktanj', {
      store_id: store.id
    })
  }

  const renderList = () => {
    return (
      <div className={style.aboutbrand}>
        <h3>About brand</h3>
        <Link href={`/shop/${store.id}`}>
          <a className={style.container} onClick={goStore}>
            <LazyLoad src={store.logo} className={style.logo} alt="logo" />

            <Space
              direction="vertical"
              className={style.brandDesc}
            >
              <h4 className='f14'>{store?.brand}</h4>
              <FollowScore score={store?.storeScore} total={store?.reviewCount} />
              <Space>
                <Icon src='/images/product/since.svg' />
                {store.openTime ? <span>Since {formatYear(store?.openTime)}</span> : null}
              </Space>
              <Space>
                <Icon src='/images/product/location.svg' />
                {store?.city}, {store?.province}
              </Space>
              <ul className={style.brandTips}>
                {
                  store.storeLabel?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                }
              </ul>
            </Space>
          </a>
        </Link>
        <div className='mt20'>
          <Space>
            <Icon src='/images/product/ship.svg' />
            <StoreShip isFreeShipping={store?.isFreeShipping} freeShipping={store?.freeShipping} />
          </Space>
        </div>
      </div>
    )
  }
  const memoRender = useMemo(() => renderList, [store])
  return (
    <>{memoRender()}</>
  )
}

export default memo(AboutBrand)