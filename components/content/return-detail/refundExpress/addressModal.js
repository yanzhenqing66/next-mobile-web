import { useState } from 'react'
import { NavBar, Form, Button, Input, Picker, Toast } from 'antd-mobile'
import Modal from '@/components/common/modal'
import { expressSwr, refundDetailSwr } from '../request'
import { updTrackNum } from '@/api/returns'
import { debounce } from '@/utils/optimizeFn'
import rem from '@/utils/rem'

function AddressModal({ addressVis, onClose, refundNo, shippingInfo }) {
  const [expressVis, setExpressVis] = useState(false)
  const { data } = expressSwr()
  const { mutate } = refundDetailSwr(refundNo)

  const onFinish = debounce((val) => {
    const params = {
      refundNo: refundNo,
      trackingNo: val.trackingNo,
      slug: val.slug[0]
    }
    updTrackNum(params).then(() => {
      mutate()
      onClose()
    }).catch(err => {
      Toast.show({
        content: err?.message ?? 'Logistics error, please try again',
        position: 'bottom'
      })
    })
  }, 500)

  return (
    <Modal
      visible={addressVis}
      onClose={onClose}
      bodyStyles={{
        padding: rem(10)
      }}
      destroyOnClose={true}
    >
      <NavBar onBack={onClose} backArrow={<span className='f13'>Cancel</span>}>
        Add Address
      </NavBar>
      <div className='p10'>
        <p className='mtb20'>Please enter your shipping information below</p>
        <Form
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large' shape='rounded'>
              Save
            </Button>
          }
          style={{
            '--border-top': 0
          }}
          initialValues={{
            slug: [shippingInfo?.slug],
            trackingNo: shippingInfo?.trackingNo
          }}
        >
          <Form.Item
            name='slug'
            rules={[{ required: true, message: 'Please select shipping carrier' }]}
            trigger='onConfirm'
            validateTrigger="onConfirm"
            onClick={() => {
              setExpressVis(true)
            }}
          >
            {
              data ?
                <Picker
                  columns={[data]}
                  visible={expressVis}
                  onClose={() => {
                    setExpressVis(false)
                  }}
                  confirmText='Done'
                  cancelText=''
                  getContainer={document.querySelector('#_next')}
                >
                  {items => {
                    if (items.every(item => item === null)) {
                      return 'Please select shipping carrier'
                    } else {
                      return items.map(item => item?.label ?? 'Please select shipping carrier').join(' - ')
                    }
                  }}
                </Picker> : null
            }
          </Form.Item>
          <Form.Item
            name='trackingNo'
            rules={[{ required: true, message: 'Please select tracking number' }]}
          >
            <Input placeholder='Tracking Number' />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default AddressModal