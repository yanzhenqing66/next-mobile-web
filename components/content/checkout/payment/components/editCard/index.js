import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useSWRConfig } from 'swr'
import { NavBar, Form, Input, Switch, Checkbox, Picker, Toast } from 'antd-mobile'
import { AddOutline } from 'antd-mobile-icons'
import { getAddress, getPayCardItemDetail } from '../../../request'
import { updPayCard } from '@/api/cart'
import rem from '@/utils/rem'
const AddModal = dynamic(import('../../../address/components/addModal'))
import cardlist from '@/assets/images/cart/cardlist.svg'
import style from './editCard.module.scss'

const dateColumns = () => {
  const nowyear = new Date().getFullYear()
  const yearList = []
  for (let i = 0; i < 10; i++) {
    yearList.push({ value: nowyear + i, label: nowyear + i })
  }

  return [
    [
      { value: 1, label: '01 - January' },
      { value: 2, label: '02 - February' },
      { value: 3, label: '03 - March' },
      { value: 4, label: '04 - April' },
      { value: 5, label: '05 - May' },
      { value: 6, label: '06 - June' },
      { value: 7, label: '07 - July' },
      { value: 8, label: '08 - August' },
      { value: 9, label: '09 - September' },
      { value: 10, label: '10 - October' },
      { value: 11, label: '11 - November' },
      { value: 12, label: '12 - December' },
    ],
    [...yearList]
  ]
}

function EditCard({ cardId, cancel }) {

  const { mutate } = useSWRConfig()
  const { data: addressData } = getAddress()
  const { data: formData } = getPayCardItemDetail(cardId)
  const [form] = Form.useForm()
  const [addModalVis, setAddModalVis] = useState(false)
  const [dateVis, setDateVis] = useState(false)

  const onFinish = () => {
    form.validateFields().then(res => {
      const params = {
        id: cardId,
        userAddressId: addressData[0]?.id,
        ...res,
        expirationMonth: res.date[0],
        expirationYear: res.date[1],
        isDefault: res.isDefault ? 1 : 0
      }

      try {
        updPayCard(params).then(res => {
          if (res.code === 200) {
            mutate('payment/paymentList?type=1')
            cancel()
          } else {
            Toast.show({
              content: res.message,
              position: 'bottom'
            })
          }
        })
      } catch (error) {
        Toast.show({
          content: 'Failed to add, please try again !',
          position: 'bottom'
        })
      }
    })
  }

  const closeAddModal = useCallback(() => {
    setAddModalVis(false)
  }, [])

  return (
    <>
      <NavBar
        back='cancel'
        onBack={cancel}
        backArrow={false}
        right={<span onClick={onFinish}>Save</span>}
      >
        Add Credit Card
      </NavBar>
      <div className={style.wrap}>
        <div className={style.header}>
          <p className={style.card_info}>Card Information</p>
          <img className={style.cardlist} src={cardlist} />
        </div>
        {
          formData ?
            <Form
              form={form}
              mode='card'
              className={style.form}
              initialValues={{
                nameOnCard: formData?.nameOnCard || '',
                cardNumber: formData?.cardNumber || '',
                date: [formData?.expirationMonth || '', formData?.expirationYear || ''],
                cvv: formData?.cvv || '',
                isDefault: formData.isDefault ? true : false,
              }}
            >
              <Form.Item
                name='nameOnCard'
                rules={[{ required: true, message: 'CardHolder Name is required' }]}
              >
                <Input placeholder='CardHolder Name' />
              </Form.Item>
              <Form.Item
                name='cardNumber'
                rules={[{ required: true, message: 'Card Number is required' }]}
              >
                <Input placeholder='Card Number' />
              </Form.Item>
              <div className={style.flex}>
                <Form.Item
                  name='date'
                  rules={[{ required: true, message: 'Exp. Date is required' }]}
                  trigger='onConfirm'
                  validateTrigger='onConfirm'
                  onClick={() => {
                    setDateVis(true)
                  }}
                  style={{
                    width: rem(190),
                    marginTop: rem(5)
                  }}
                >
                  <Picker
                    columns={dateColumns()}
                    visible={dateVis}
                    onClose={() => {
                      setDateVis(false)
                    }}
                    getContainer={document.querySelector('#_next')}
                    confirmText='Done'
                    cancelText=''
                  >
                    {items => {
                      if (items.every(item => item === null)) {
                        return <span style={{ color: '#ccc' }}>Exp. Date</span>
                      } else {
                        return '0' + items[0]?.value + '/' + items[1]?.label
                      }
                    }}
                  </Picker>
                </Form.Item>
                <Form.Item
                  name='cvv'
                  rules={[{ required: true, message: 'CVV is required' }]}
                >
                  <Input placeholder='CVV' />
                </Form.Item>
              </div>
              <Form.Item
                name='isDefault'
                label='Set as default credit card'
                layout='horizontal'
                style={{
                  '--prefix-width': rem(270),
                  '--align-items': 'center',
                  margin: `${rem(15)} 0`
                }}
              >
                <Switch defaultChecked style={{ '--checked-color': '#222' }} />
              </Form.Item>
              <Form.Item
                label={<span style={{ fontSize: rem(13) }}>Billing Address</span>}
              >
                {
                  addressData && addressData[0]
                    ?
                    <div className={style.address}>
                      <div className={style.left}>
                        <p
                          style={{
                            margin: `${rem(15)} 0`,
                            color: '#222'
                          }}>
                          {addressData[0].firstName} {addressData[0].lastName}
                        </p>
                        <span style={{ lineHeight: rem(18), color: '#666' }}>
                          {addressData[0].street}<br />
                          {addressData[0].city}, {addressData[0].state} {addressData[0].zipcode}<br />
                          {addressData[0].phone}
                        </span>
                      </div>
                      <div className={style.right}>
                        <Checkbox defaultChecked />
                      </div>
                    </div>
                    : null
                }
              </Form.Item>
              <Form.Item
                extra={<AddOutline fontSize={18} />}
                onClick={() => setAddModalVis(true)}
                arrow={false}
                style={{
                  marginTop: rem(15),
                  fontSize: rem(12)
                }}>
                Enter a New Billing Address
              </Form.Item>
            </Form>
            : null
        }
      </div>
      <AddModal addressVis={addModalVis} close={closeAddModal} />
    </>
  )
}

export default EditCard