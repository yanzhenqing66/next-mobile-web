import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { CloseOutline } from 'antd-mobile-icons'
import { ArrowRightOutlined } from '@ant-design/icons'
import TextLoop from 'react-text-loop'
import useGetPlatForm from '@/hooks/useGetPlatForm'
import { throttle } from '@/utils/optimizeFn'
import IconFont from '../../IconFont'
const LazyImage = dynamic(() => import('../../loadImage'), {ssr: false})
import style from './getApp.module.scss'

function GetApp() {
  const router = useRouter()
  const [show, setShow] = useState(true)


  const goApp = () => {
    const ua = useGetPlatForm()
    if (ua === 'mobile') {
      op?.wakeupOrInstall()
    } else {
      window.open('https://active.poppyapps.com/', '_blank')
    }
  }

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setShow(true)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  const bindHandleScroll = throttle(() => {
    // 滚动的高度(兼容多种浏览器)
    const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

    if (scrollTop > 4000) {
      setShow(true)
      window.removeEventListener('scroll', bindHandleScroll)
    }
  })

  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll)
    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
    }
  }, [])

  const close = (e) => {
    e.stopPropagation()
    setShow(false)
  }

  return (
    <div className={`${style.wrap} getApp`} onClick={goApp}>
      <div className={style.close} onClick={close}>
        <CloseOutline fontSize={18} />
      </div>
      <LazyImage
        className={style.logo}
        src='https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/getappLogo.svg'
      />
      <div className={style.right}>
        <TextLoop>
          <h4>Million products for your interest</h4>
          <h4>New Arrivals, Promotion, Reviews</h4>
          <h4>Download and check brands on SALE</h4>
        </TextLoop>
        <p>Get the app <ArrowRightOutlined /></p>
        <Comment />
      </div>
      <style jsx>{`
        .getApp {
          display: ${show ? '' : 'none'}
        }
      `}</style>
    </div>
  )
}

export function Comment() {
  return (
    <div className={style.comment}>
      <IconFont type='icon-star' />
      <IconFont type='icon-star' />
      <IconFont type='icon-star' />
      <IconFont type='icon-star' />
      <IconFont type='icon-star' />
      <span>(100k+)</span>
    </div>
  )
}

export default GetApp