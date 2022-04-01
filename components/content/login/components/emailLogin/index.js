import dynamic from 'next/dynamic'
import {Form, Button, Input} from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import TopHead from "@/components/common/topHead"
const Modal = dynamic(import('@/components/common/modal'),{ssr: false})
import style from './emailLogin.module.scss'

function EmailLogin({ emailVis, onClose }) {

  const onFinish = (val) => {
    // console.log(val);
  }

  return (
    <Modal
      visible={emailVis}
      onClose={onClose}
      styles={{ zIndex: 999 }}
    >
      <TopHead
        left={<LeftOutline fontSize={20} />}
        center="Log in with email"
      />
      <Form
        onFinish={onFinish}
        footer={
          <Button block type='submit' className={style.finishBtn}>
            Log in
          </Button>
        }
      >
        <Form.Item
          name='email'
          label='Email address'
          rules={[{ required: true, message: 'Please enter a valid email' }]}
        >
          <Input placeholder='Enter your email address' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EmailLogin