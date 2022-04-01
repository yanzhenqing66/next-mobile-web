import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
import useGetPlatForm from '@/hooks/useGetPlatForm'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), {ssr: false})
import style from './openWish.module.scss'

function OpenWishApp({ image }) {
  const [show, setShow] = useState(true)
  const goApp = () => {
    const ua = useGetPlatForm()
    if (ua === 'mobile') {
      op?.wakeupOrInstall()
    } else {
      window.open('https://active.poppyapps.com/', '_blank')
    }
  }
  return (
    <div className={style.wrap} style={{ display: show ? '' : 'none' }}>
      <section className={style.top}>
        <div className={style.left}>
          <LazyLoad src={image} />
        </div>
        <div className={style.right}>
          <h4>Loving this list?</h4>
          <p>Get the free Poppy Shopping app to see more</p>
        </div>
      </section>
      <Button
        color='primary'
        block
        shape='rounded'
        className={style.open_app}
        onClick={goApp}
      >Open in App</Button>
      <div
        className={style.close}
        onClick={() => setShow(false)}
      ><CloseOutline fontSize={23} /></div>
    </div>
  )
}

export default memo(OpenWishApp)