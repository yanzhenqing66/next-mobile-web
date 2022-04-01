import { memo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ImageViewer, Ellipsis, Space } from 'antd-mobile'
import { DownFill } from 'antd-mobile-icons'
import { CaretUpOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import FollowBtn from '@/components/common/followBtn'
const LazyLoad = dynamic(() => import('@/components/common/lazyLoad'), { ssr: false })
import style from './shopInfo.module.scss'
import rem from '@/utils/rem'
import FollowScore from '../followScore'
import SvgIcon from '@/components/common/svgIcon'
import StoreShip from './storeShip'

const Icon = styled(SvgIcon)`
  svg {
    width: ${rem(12)};
    height: ${rem(12)};
    margin-right: ${rem(5)};
  }
`

function ShopInfo({ storeInfo, id }) {

  return (
    <header className={style.brand}>
      <section className={style.brandHeader}>
        <LazyLoad
          src={storeInfo.logo}
          className={style.headerLogo}
          onClick={() => {
            ImageViewer.show({ image: storeInfo.logo })
          }}
        />

        <Space direction='vertical' block className={style.brandFollow}>
          <section className='flexBetween'>
            <h1 className='f14'>
              {storeInfo.brand}
            </h1>
            <FollowBtn id={id} type={2} />
          </section>
          <Space direction='vertical'>
            {
              storeInfo?.storeScore ?
                <Link href={`/reviews/store?storeUrl=${storeInfo?.storeUrl}&storeId=${id}`}>
                  <a>
                    <FollowScore score={storeInfo?.storeScore} total={storeInfo?.reviewCount} />
                  </a>
                </Link>
                : null
            }
            <Space>
              <Icon src='/images/product/since.svg' />
              <span>Since 2022</span>
            </Space>
            <Space>
              <Icon src='/images/product/location.svg' />
              <span>San Francisco, California</span>
            </Space>
          </Space>
        </Space>
      </section>
      <ul className={style.brandTips}>
        {
          storeInfo?.storeLabel?.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
      <Space className='mt10'>
        <Icon src='/images/product/ship.svg' />
        <StoreShip
          isFreeShipping={storeInfo?.isFreeShipping}
          freeShipping={storeInfo.freeShipping}
        />
      </Space>
      <section className={style.brandDesc}>
        {/* {storeInfo.storeDesc} */}
        <Ellipsis
          direction='end'
          expandText={<DownFill fontSize={12} color="#222" />}
          collapseText={<CaretUpOutlined style={{ color: '#222' }} />}
          content={storeInfo.storeDesc}
          rows={3}
        />
      </section>
    </header>
  )
}

export default memo(ShopInfo)
