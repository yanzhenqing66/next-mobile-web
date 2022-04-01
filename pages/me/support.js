import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import rem from '@/utils/rem'
import LazyLoad from '@/components/common/lazyLoad'
import style from '@/styles/comp_style/support.module.scss'
import useGetParams from '@/hooks/useGetParams'
import Head from '@/components/common/head'

function Support() {
  const router = useRouter()
  const {source_url} = useGetParams(router.asPath)

  const goBack = () => {
    if(!source_url) {
      router.push('/')
      return
    }
    router.back()
  }

  return (
    <div className={style.wrap}>
      <Head title='Poppy Shopping | Customer Support' />
      <NavBar onBack={goBack}>Customer Support</NavBar>
      <main className={style.main}>
        <LazyLoad 
          src='https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/support.svg'
          width={rem(120)}
          height={rem(120)} 
        />
        <p className={style.desc}>We welcome your questions and comments while you using our app. You may contact us anytime via email or phone:</p>
        <div className={style.info}>
          <p>
            <span>Email:</span><span>social@poppyapps.com</span>
          </p>
          {/* <p>
            <span>Phone:</span>
            <span>+1 (949) 665-9342</span>
          </p> */}
        </div>
      </main>
    </div>
  )
}

export default Support