import { List } from 'antd-mobile'
import { FileOutlined, SafetyOutlined } from '@ant-design/icons'
import { ReactComponent as Refund } from '@/public/images/me/refund.svg'
import style from './about.module.scss'

const Item = List.Item
function About() {

  const goAgreement = () => {
    location.href = 'https://active.poppyapps.com/userAgreement'
  }

  const goPolicy = () => {
    location.href = 'https://active.poppyapps.com/privacyPolicy'
  }

  const goRefund = () => {
    location.href = 'https://active.poppyapps.com/return'
  }

  return (
    <div className={style.about}>
      <h3>About</h3>
      <List>
        <Item
          prefix={<FileOutlined style={{ fontSize: 20 }} />}
          onClick={goAgreement}
        >User Agreement</Item>
        <Item
          prefix={<SafetyOutlined style={{ fontSize: 20 }} />}
          onClick={goPolicy}
        >Privacy Policy</Item>
        <Item
          prefix={<SafetyOutlined style={{ fontSize: 20 }} />}
          onClick={goRefund}
        >Return and Refund Policy </Item>
      </List>
    </div>
  )
}

export default About