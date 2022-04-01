import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Form, Button, Input, Toast } from 'antd-mobile'
import { AddCircleOutline } from 'antd-mobile-icons'
import { uplaodGoodsUrls } from '@/api/wishList'
const Modal = dynamic(import('@/components/common/modal'), { ssr: false })
import IconFont from '@/components/common/IconFont'

function AddWish() {
  const [addVis, setAddVis] = useState(false)

  const addWish = () => {
    setAddVis(true)
  }

  const close = () => {
    setAddVis(false)
  }

  const labelTip = (
    <IconFont style={{fontSize: 24}} type="icon-edit" />
  )

  const onFinish = async (val) => {
    const res = await uplaodGoodsUrls(val)
    if(res.code === 200) {
      close()
      Toast.show({
        content: 'Thanks for uploading! Please wait for 24 hours to check.',
        position: 'bottom',
        icon: 'success'
      })
    }
  }

  return (
    <>
      <AddCircleOutline fontSize={24} onClick={addWish} />
      <Modal visible={addVis} onClose={close}>
        <Form
          onFinish={onFinish}
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          footer={
            <Button block type='submit' style={{
              width: 100,
              height: 44,
              borderRadius: 30,
              marginTop: 30,
              backgroundColor: '#222',
              color: '#fff',

            }}>
              Upload
            </Button>
          }
          layout="horizontal"
        >
          <Form.Item
            name='productUrl'
            label={labelTip}
            rules={[{ required: true, message: 'website link is required' }]}
          >
            <Input placeholder='Enter a website link' />
          </Form.Item>
          <Form.Item
            label=" "
          >
            Enter the website link of the product you want to add on Poppy Shopping
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddWish