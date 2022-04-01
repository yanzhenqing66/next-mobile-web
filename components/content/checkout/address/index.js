import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { List } from 'antd-mobile'
import { useSelector } from 'react-redux'
const SelModal = dynamic(import('./components/selModal'))
const AddModal = dynamic(import('./components/addModal'))
import EventBus from '@/utils/eventBus'
import style from './address.module.scss'

function Address() {
  const orderInfo = useSelector(state => state.checkoutReducer)
  const [selressVis, setSelressVis] = useState(false)
  const [addressVis, setAddressVis] = useState(false)
  const [addressId, setAddressId] = useState('')

  const closeAddress = useCallback((val) => {
    if (val === '1') {
      setSelressVis(false)
    } else {
      setAddressVis(false)
    }
  }, [])

  const openAddModal = useCallback((addressId) => {
    setAddressId(addressId)
    setAddressVis(true)
  }, [])

  useEffect(() => {
    EventBus.on('openAddress', () => {
      setAddressVis(true)
    })
  }, [])


  return (
    <>
      <h3 className={style.title}>Shipping Address</h3>
      <List style={{ '--border-top': 'none' }}>
        <List.Item
          onClick={() => setSelressVis(true)}>
          <div className={style.content}>
            {
              orderInfo?.userAddress?.id
                ?
                <>
                  <span className={style.name}>
                    {orderInfo?.userAddress?.firstName} {orderInfo?.userAddress?.lastName}
                  </span>
                  <span>
                    {orderInfo?.userAddress?.suite} {orderInfo?.userAddress?.street}<br />
                    {orderInfo?.userAddress?.city}, {orderInfo?.userAddress?.state} {orderInfo?.userAddress?.zipcode}<br />
                    {orderInfo?.userAddress?.phone}
                  </span>
                </>
                : <span>Ship your order to an address you choose</span>
            }
            <style jsx>{`
              div {
                color: ${orderInfo?.userAddress ? '#222' : '#ccc'};
              }
            `}</style>
          </div>
        </List.Item>
      </List>
      <SelModal
        selAddressVis={selressVis}
        close={() => closeAddress('1')}
        openAddModal={openAddModal}
      />
      <AddModal
        addressId={addressId}
        addressVis={addressVis}
        close={() => closeAddress('2')}
      />
    </>
  )
}

export default Address