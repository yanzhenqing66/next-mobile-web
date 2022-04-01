import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { NavBar, Form, Input, Switch, Picker, Toast } from 'antd-mobile'
import { getState, getAddressDetail } from '../../../request'
import { updAddress } from '@/api/cart'
import rem from '@/utils/rem'
import style from './edit.module.scss'


function EditAddress({ cancel, addressId }) {
  const [form] = Form.useForm()
  const [stateVis, setStateVis] = useState(false)
  const { mutate } = useSWRConfig()
  const { stateList } = getState()
  const { formData } = getAddressDetail(addressId)

  const onFinish = () => {
    form.validateFields().then(val => {
      const state = val.state[0]
      const isDefault = val.isDefault ? 1 : 0
      const params = { ...val, state, isDefault, id: addressId || '' }

      updAddress(params)
        .then(res => {
          if (res.code === 200) {
            mutate('userAddress/list')
            cancel()
          } else {
            Toast.show({
              content: res.message,
              position: 'bottom'
            })
          }
        })
        .catch(e => {
          Toast.show({
            content: 'Failed to edit, please try again !',
            position: 'bottom'
          })
        })
    })
  }

  return (
    <>
      <NavBar
        back='cancel'
        onBack={cancel}
        backArrow={false}
        right={<span onClick={onFinish}>Save</span>}
      >
        Add Address
      </NavBar>
      <section className={style.form}>
        <p className={style.title}>Please enter your shipping information below</p>
        {
          addressId && stateList && formData
            ?
            <Form
              form={form}
              mode="card"
              initialValues={{
                firstName: formData?.firstName || '',
                lastName: formData?.lastName || '',
                street: formData?.street || '',
                suite: formData?.suite || '',
                city: formData?.city || '',
                state: formData?.state ? [formData.state] : [] || [],
                zipcode: formData?.zipcode || '',
                phone: formData?.phone || '',
                isDefault: formData?.isDefault === 1 ? true : false || true
              }}
            >
              <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'First name is required' }]}
              >
                <Input placeholder='First Name' />
              </Form.Item>
              <Form.Item
                name='lastName'
                rules={[{ required: true, message: 'Last name is required' }]}
              >
                <Input placeholder='Last Name' />
              </Form.Item>
              <Form.Item
                name='street'
                rules={[{ required: true, message: 'Address is required' }]}
              >
                <Input placeholder='Street Name' />
              </Form.Item>
              <Form.Item
                name='suite'
              >
                <Input placeholder='Apt / Suite / Other' />
              </Form.Item>
              <div className={style.flex}>
                <Form.Item
                  name='city'
                  rules={[{ required: true, message: 'City is required' }]}
                >
                  <Input placeholder='City' />
                </Form.Item>
                <Form.Item
                  name='state'
                  rules={[{ required: true, message: 'State is required' }]}
                  trigger='onConfirm'
                  validateTrigger='onConfirm'
                  onClick={() => {
                    setStateVis(true)
                  }}
                  style={{
                    width: rem(190),
                    marginTop: rem(4)
                  }}
                >
                  {
                    stateList ?
                      <Picker
                        columns={[stateList]}
                        visible={stateVis}
                        onClose={() => {
                          setStateVis(false)
                        }}
                        confirmText='Done'
                        cancelText=''
                        getContainer={document.querySelector('#_next')}
                      >
                        {items =>
                          items.length
                            ? items?.map(item => item?.label ? item.label
                              : <span style={{ color: '#ccc' }}>State</span>)
                            : <span style={{ color: '#ccc' }}>State</span>
                        }
                      </Picker> : null
                  }
                </Form.Item>
              </div>
              <div className={style.flex}>
                <Form.Item
                  name='zipcode'
                  rules={[{ required: true, message: 'Zipcode is required' }]}
                >
                  <Input placeholder='Zip code' />
                </Form.Item>
                <Form.Item
                  name='phone'
                  rules={[{ required: true, message: 'Phone Number is required' }]}
                >
                  <Input placeholder='Phone Number' />
                </Form.Item>
              </div>
              <Form.Item
                name='isDefault'
                label='Set Default Address'
                layout='horizontal'
                style={{
                  '--prefix-width': rem(200),
                  '--align-items': 'center',
                }}
              >
                <Switch defaultChecked style={{ '--checked-color': '#222' }} />
              </Form.Item>
            </Form>
            :
            null
        }
      </section>
    </>
  )
}

export default EditAddress