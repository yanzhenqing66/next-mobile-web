import { useRouter } from 'next/router'
import SvgIcon from '@/components/common/svgIcon'
import styled from '@emotion/styled'
import rem from '@/utils/rem'
import style from './myOrder.module.scss'

const Icon = styled(SvgIcon)`
  svg {
    width: ${rem(25)};
    height: ${rem(25)};
  }
`

function MyOrder() {
  const router = useRouter()

  const goOrder = (key) => {
    router.push({
      pathname: '/order',
      query: { key }
    })
  }

  return (
    <div className={style.my_order}>
      <header className={style.my_order_head}>
        My Order
      </header>
      <div className={style.line}></div>
      <nav className={style.my_order_nav}>
        <div className={style.item} onClick={() => goOrder('2')}>
          <Icon src="/images/me/processing.svg" />
          <span>Processing</span>
        </div>
        <div className={style.item} onClick={() => goOrder('3')}>
          <Icon src='/images/me/shipped.svg' />
          <span>Shipped</span>
        </div>
        <div className={style.item} onClick={() => router.push('/order/review')}>
          <Icon src='/images/me/review.svg' />
          <span>Review</span>
        </div>
        <div className={style.item} onClick={() => router.push('/order/refund-list')}>
          <Icon src='/images/me/returns.svg' />
          <span>Return</span>
        </div>
      </nav>
    </div>
  )
}

export default MyOrder