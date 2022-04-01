import { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { List } from 'antd-mobile'
const AddressModal = dynamic(import('./addressModal'))
import rem from '@/utils/rem'
import { refundDetailSwr } from '../request'

const AdressInfo = ({ name, street, phone, city }) => {
  return (
    <div className='mt10'>
      <p>{name}</p>
      <p>{street}</p>
      <p>{city}</p>
      <p>{phone}</p>
    </div>
  )
}

function RefundExpress({ refundNo }) {
  const { data: { refundAddress, shippingInfo } } = refundDetailSwr(refundNo)
  const [addressVis, setAddressVis] = useState(false)

  const onClose = useCallback(() => {
    setAddressVis(false)
  }, [])

  const ModalMemo = useMemo(() => {
    return (
      <AddressModal 
        addressVis={addressVis} 
        onClose={onClose} 
        refundNo={refundNo}
        shippingInfo={shippingInfo}
      />
    )
  }, [addressVis, refundNo, shippingInfo])

  return (
    <div>
      <section className="fw400 col91 mt20">
        <p
          className="pb10 borBot pointer flexBetween"
          onClick={() => setAddressVis(true)}
        >
          <span>
            {shippingInfo?.name + ' ' + shippingInfo?.trackingNo ?? 'Please enter tracking number'}
          </span>
          <span>{shippingInfo?.trackingNo ? 'Edit' : ''}</span>
        </p>
        <p className="f10 mt10">Providing tracking information helps accelerate refund process</p>
      </section>
      <section>
        <List
          style={{
            '--padding-left': 0,
            '--font-size': rem(13),
            '--border-top': 0
          }}
          className="mt20"
        >
          <List.Item
            description={
              <AdressInfo
                name={refundAddress.firstName + ' ' + refundAddress.lastName}
                street={refundAddress.suite + ' ' + refundAddress.street}
                city={refundAddress.city + ',' + refundAddress.state + ' ' + refundAddress.zipcode}
                phone={refundAddress.phone}
              />
            }
            clickable
          >
            <p className='fw600'>Return address</p>
          </List.Item>
        </List>
      </section>
      {ModalMemo}
    </div>
  )
}

export default RefundExpress
