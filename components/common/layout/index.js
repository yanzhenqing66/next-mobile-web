import { useRouter } from 'next/router'
import TabBar from './tabBar'
import HeadGuide from './headGuide'
import rem from '@/utils/rem'
import css from './layout.module.scss'

function Layout({ children }) {
  const router = useRouter()

  const renderFoot = () => {
    return isHomeUrl(router.pathname) ? <TabBar /> : null
  }

  return (
    <div className={css.container}>
      {isShowDownloadApp(router.pathname) ? <HeadGuide /> : null}
      <div>
        {children}
        <style jsx>{`
          margin-bottom: ${isHomeUrl(router.pathname) ? rem(50) : 0}
        `}</style>
      </div>
      {renderFoot()}
    </div>
  )
}

function isHomeUrl(url) {
  return url === '/' || url === '/wishList' || url === '/wishList/recentView' || url === '/wishList/following' || url === '/me' || url === '/cart' ? true : false
}

function isShowDownloadApp(url) {
  return url !== '/productDetail/[id]' && url !== '/cart/checkout' && url !== '/cart/payment' && url !== '/cart/payment-result' ? true : false
}

export default Layout