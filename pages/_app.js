import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'
import { CacheProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import cookies from 'react-cookies'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import createEmotionCache from '@/libs/createEmotionCache'
import store from '@/store'
import { anth_login_dispatch, cancel_login } from '@/store/user/actions/auth'
import useLoadScript from '@/hooks/useLoadScript'
import Layout from '@/components/common/layout'
import { envFlag } from '@/utils/env'
import { getSystem } from '@/hooks/useGetPlatForm'
import '../styles/reset.scss'
import '../styles/globals.scss'
import '../styles/class.scss'
import storeUtils from '@/utils/storageUtil'

const clientSideEmotionCache = createEmotionCache()

const client_id = envFlag
  ? 'AWGmhR2f9luOIBmmdKpFcLAlnw0BkodvU7MnFrWLF5nL83z6aLHcJS0FuxleUoxlzICMmt8xkq9MMhR7'
  : 'Af70CnI5lbTkXFh048T6WZcwf_IJxWaxuuz7Cg4xdbsQQ9UBku6TdB6eeRhg3KWNfzHNfJGjTY_2d3NA'

const initialOptions = {
  "client-id": client_id,
  intent: "capture",
  currency: 'USD',
  components: "buttons",
}


function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    const { user: { id } } = store.getState()
    const token = cookies.load('poppy_token') || ''
    if (token && !id) {
      store.dispatch(anth_login_dispatch())
    } else {
      store.dispatch(cancel_login())
    }
  }, [])

  useEffect(() => {
    if (router.pathname !== '/go/[id]') {
      useLoadScript('https://web.cdn.openinstall.io/openinstall.js', 'openInScript', createOpenData)
    }
  }, [router.pathname])

  const createOpenData = () => {
    let openAppScr = document.querySelector('#openinstall-init')
    if (openAppScr) return
    openAppScr = document.createElement('script')
    openAppScr.id = 'openinstall-init'
    openAppScr.type = 'text/javascript'
    openAppScr.async = true
    openAppScr.textContent = `
        let data = OpenInstall.parseUrlParams(); 
        new OpenInstall({
          appKey: "n4zhxl",
          onready: function () {
            window.op = this
          }
        }, data);
      `
    document.querySelector('head').appendChild(openAppScr)
  }

  useEffect(() => {
    if (getSystem() === 'ios') {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '564066568077341',
          cookie: true,
          xfbml: true,
          version: 'v2.7'
        });
        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }, [])

  useEffect(() => {
    Adjust.initSdk({
      appToken: 'ilhmls8429ds',
      environment: envFlag ? 'production' : 'sandbox'
    })
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      storeUtils.setStore('action', url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      storeUtils.setStore('action', url)
    }

    router.events.on('beforeHistoryChange', handleRouteChange)
    return () => {
      router.events.off('beforeHistoryChange', handleRouteChange)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="icon structure" href="/favicon.ico" />
        <meta name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover" />
        {/* <!-- Android 禁止屏幕旋转 --> */}
        <meta name="screen-orientation" content="portrait" />
        {/* <!-- 全屏显示 --> */}
        <meta name="full-screen" content="yes" />
        {/* <!-- iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览 --> */}
        <meta content="yes" name="apple-mobile-web-app-capable" />
        {/* <!-- iphone的私有标签，它指定的iphone中safari顶端的状态条的样式 --> */}
        <meta content="black" name="apple-mobile-web-app-status-bar-style" />
        {/* <!-- 告诉设备忽略将页面中的数字识别为电话号码 --> */}
        <meta content="telephone=no" name="format-detection" />
        <meta name="google-site-verification" content="oWYQaoR0_9k6OM6lkhm9z3uSJRvdyFPkXchtQHUeyDE" />
        <meta name="facebook-domain-verification" content="i08d6wrdihlkgprob9v8loj6ngit5a" />
      </Head>

      <Script
        id='adjust-sdk'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(t,a,e,r,s,n,l,d,o){t.Adjust=t.Adjust||{},t.Adjust_q=t.Adjust_q||[];for(var c=0;c<n.length;c++)l(t.Adjust,t.Adjust_q,n[c]);d=a.createElement("script"),o=a.getElementsByTagName("script")[0],d.async=!0,d.src="https://cdn.adjust.com/adjust-latest.min.js",d.onload=function(){for(var a=0;a<t.Adjust_q.length;a++)t.Adjust[t.Adjust_q[a][0]].apply(t.Adjust,t.Adjust_q[a][1]);t.Adjust_q=[]},o.parentNode.insertBefore(d,o)}(window,document,0,0,0,["initSdk","trackEvent","addGlobalCallbackParameters","addGlobalPartnerParameters","removeGlobalCallbackParameter","removeGlobalPartnerParameter","clearGlobalCallbackParameters","clearGlobalPartnerParameters","switchToOfflineMode","switchBackToOnlineMode","stop","restart","gdprForgetMe","disableThirdPartySharing","initSmartBanner"],function(t,a,e){t[e]=function(){a.push([e,arguments])}});
          `
        }}
      />

      <Script
        id='googletag-sdk'
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-20SQ43QQZ3`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || []
            function gtag() { 
              dataLayer.push(arguments)
            }
            gtag('js', new Date());
            gtag('config', 'G-20SQ43QQZ3')
          `,
        }}
      />

      <Script
        id='fb-pixel'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1185189311887095');
            fbq('track', 'PageView');
          `,
        }}
      />

      <Script
        id='pin-pixel'
        dangerouslySetInnerHTML={{
          __html: `
            !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(
            Array.prototype.slice.call(arguments))};
            var n=window.pintrk;n.queue=[],n.version="3.0";
            var t=document.createElement("script");
            t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '2614101162596');
            pintrk('page'); 
          `,
        }}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=1185189311887095&ev=PageView&noscript=1`}
        />
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src="https://ct.pinterest.com/v3/?tid=2614101162596&noscript=1"
        />
      </noscript>

      <Provider store={store}>
        <PayPalScriptProvider
          options={{ ...initialOptions }}
          deferLoading={true}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PayPalScriptProvider>
      </Provider>
    </CacheProvider>

  )
}

export default MyApp
