import { memo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Button, Popover } from 'antd-mobile'
import { useSelector } from 'react-redux'
import useGetPlatForm from '@/hooks/useGetPlatForm'
import storeUtils from '@/utils/storageUtil'
const LazyImage = dynamic(import('../../loadImage'), { ssr: false })
import style from './headGuide.module.scss'

function HeadGuide() {
  const router = useRouter()
  const user = useSelector(state => state.user)

  const goApp = () => {
    const ua = useGetPlatForm()
    if (ua === 'mobile') {
      const action = storeUtils.getStore('action') || '/'
      window?.op?.wakeupOrInstall({ data: { action, authType: user?.authUserType || '' } })
    } else {
      window.open('https://active.poppyapps.com/', '_blank')
    }
  }

  const goLogin = () => {
    storeUtils.setStore('redirect', router.asPath)
    router.push({ pathname: '/login', query: { redirect: router.asPath } })
  }

  return (
    <div className={style.head_guide}>
      <Link href={{ pathname: '/' }}>
        <a className={style.logo}>
          <h1>Poppy Shopping | Discover fashion and lifestyle on the go | US brands for US consumers</h1>
        </a>
      </Link>
      <div className={style.right}>
        <div className={`${style.user} userDis`}>
          {
            user.nickName ?
              <Popover content={user.nickName} placement={'bottom'} trigger='click'>
                <LazyImage src={user.headPicture} className={style.headPicture} />
              </Popover>
              :
              <span onClick={goLogin} className={style.log}>Log in</span>
          }
        </div>
        <Button className={style.openApp} onClick={goApp}>Open in app</Button>
        <style jsx>{`
          .userDis {
            display: ${router.asPath.includes('/me') ? 'none' : ''}
          }
        `}</style>
      </div>
    </div>
  )
}

export default memo(HeadGuide)