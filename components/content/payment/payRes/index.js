import rem from '@/utils/rem'
import { useRouter } from 'next/router'
import { Button } from 'antd-mobile'
import { CheckCircleFill, ExclamationCircleFill } from 'antd-mobile-icons'
import useGetParams from '@/hooks/useGetParams'
import SvgIcon from '@/components/common/svgIcon'
import LazyLoad from '@/components/common/lazyLoad'
import useGetPlatForm from '@/hooks/useGetPlatForm'
import style from './payRes.module.scss'

function PayRes() {
  const router = useRouter()
  const { result } = useGetParams(router.asPath)

  const PaySucsess = () => {
    return (
      <div className={style.paySuccess}>
        <CheckCircleFill fontSize={rem(46)} color='#00AA11' />
        <div className={style.right}>
          <h3>Payment Successful</h3>
          <p>Thank you! Your order has been placed.</p>
        </div>
        <div className={style.bottom}>
          <div className={style.goHome} onClick={() => router.replace('/')}>
            <SvgIcon src='/images/navBar/homeActive.svg' className={style.home} />
            <span>Home</span>
          </div>
          <Button
            shape='rounded'
            className={style.goCheck}
            onClick={() => router.replace({
              pathname: '/order',
              query: { key: 2 }
            })}
          >Check my order</Button>
        </div>
      </div>
    )
  }

  const PayFailed = () => {
    return (
      <div className={style.payFailed}>
        <ExclamationCircleFill fontSize={rem(46)} color='#D43131' />
        <h3>Payment Failed</h3>
        <p>Something went wrong. Go back and review details or cancel the order.</p>
        <Button
          shape='rounded'
          onClick={() => router.push({
            pathname: '/order',
            query: { key: 1 }
          })}
          style={{
            '--background-color': '#222222',
            '--text-color': '#fff'
          }}
        >Review</Button>
      </div>
    )
  }

  const PayPhone = () => {
    return (
      <div className={style.payFailed}>
        <LazyLoad src='https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/undraw_well_done_i2wr%201.svg' width={rem(209)} height={rem(188)} />
        <h3>Payment Successful</h3>
        <p>Thank you! Your order has been placed.
          Please download app to check your order.</p>
        <Button
          shape='rounded'
          onClick={() => op?.wakeupOrInstall()}
          style={{
            '--background-color': '#222222',
            '--text-color': '#fff'
          }}
        >Check my order</Button>
      </div>
    )
  }

  return (
    <div className='main'>
      {
        result === 'success' ? useGetPlatForm() === 'mobile' ? <PayPhone /> : <PaySucsess /> : <PayFailed />
      }
      <style jsx>{`
        .main {
          padding: ${rem(20)} ${rem(40)};
        }
      `}</style>
    </div>
  )
}

export default PayRes

