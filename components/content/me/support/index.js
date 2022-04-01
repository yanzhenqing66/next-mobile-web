import { useRouter } from 'next/router'
import { List } from 'antd-mobile'
import { StarOutline } from 'antd-mobile-icons'
import useGetPlatForm from '@/hooks/useGetPlatForm'
import SvgIcon from '@/components/common/svgIcon'
import style from './support.module.scss'

const Item = List.Item
function Support() {
  const router = useRouter()
  
  const goApp = () => {
    const ua = useGetPlatForm()
    if (ua === 'mobile') {
      op?.wakeupOrInstall()
    } else {
      window.open('https://active.poppyapps.com/', '_blank')
    }
  }
  return (
    <div className={style.support}>
      <h3>Support</h3>
      <List>
        <Item
          prefix={<StarOutline fontSize={22} />}
          arrow={true}
        >Give us feedback</Item>
        <Item
          prefix={<SvgIcon src='/images/me/cust.svg' />}
          onClick={() => router.push({pathname: '/me/support', query: {source_url: '/me'}})}
        >Customer Support</Item>
        <Item
          prefix={<SvgIcon src='/images/common/share.svg' />}
          arrow={true}
        >Recommend this app</Item>
        <Item
          prefix={<SvgIcon src='/images/me/download.svg' />}
          onClick={goApp}
        >Download updated App</Item>
      </List>
    </div>
  )
}

export default Support