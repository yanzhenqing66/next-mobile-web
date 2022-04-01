import { NavBar, List, SwipeAction, Radio } from "antd-mobile"
import { AddOutline } from 'antd-mobile-icons'
import { useSelector, useDispatch } from "react-redux"
import { get_checkInfo_async, edit_address_id } from "@/store/checkout/action"
import { debounce } from "@/utils/optimizeFn"
import { getAddress } from '../../../request'
import { delAddress } from "@/api/cart"
import rem from "@/utils/rem"
import LoadPage from "@/components/common/loadPage"
import ErrorPage from "@/components/common/errorPage"
import style from './selAddress.module.scss'


function SelAddress({ close, openAddModal }) {
  const orderInfo = useSelector(state => state.checkoutReducer)
  const dispatch = useDispatch()
  const { data, error, loading, mutate } = getAddress()

  const rightActions = (item) => {
    if (item.isDefault) {
      return [
        {
          key: 'edit',
          text: 'edit',
          color: 'light',
          onClick: () => openAddModal(item.id)
        }
      ]
    } else {
      return [
        {
          key: 'delete',
          text: 'delete',
          color: 'danger',
          onClick: () => delAddressHandle(item.id)
        },
        {
          key: 'edit',
          text: 'edit',
          color: 'light',
          onClick: () => openAddModal(item.id)
        },
      ]
    }
  }

  const updAddressInfo = debounce((id) => {
    dispatch(get_checkInfo_async(id))
    dispatch(edit_address_id(id))
    close()
  })

  const delAddressHandle = async (id) => {
    await delAddress({ id })
    if(orderInfo?.userAddress?.id === id) {
      dispatch(get_checkInfo_async())
    }
    const filterData = data.filter(item => item.id !== id)
    mutate([...filterData])
  }

  const renderCon = () => {
    if (loading) {
      return <LoadPage fixed />
    } else if (error) {
      return <ErrorPage />
    } else {
      return (
        <div className={style.main}>
          <header className={style.header}>
            <h4>Addresses</h4>
            <p>Swipe to Edit</p>
          </header>
          <List
            style={{
              '--border-top': 'none',
              fontSize: rem(12)
            }}
          >
            {
              data?.map(item => (
                <SwipeAction
                  key={item.id}
                  rightActions={rightActions(item)}
                >
                  <List.Item
                    description={
                      <span style={{ lineHeight: rem(18), fontSize: rem(12) }}>
                        {item.suite} {item.street}<br />
                        {item.city}, {item.state} {item.zipcode}<br />
                        {item.phone}<br />
                        {
                          item.isDefault === 1 ? <span className={style.isDefault}>Default Address</span> : null
                        }
                      </span>
                    }
                    extra={<Radio
                      checked={item.id == orderInfo?.userAddress?.id ? true : false}
                      onChange={() => updAddressInfo(item.id)}
                    />}
                  >
                    <p style={{ marginBottom: rem(12) }}>{item.firstName} {item.lastName}</p>
                  </List.Item>
                </SwipeAction>
              ))
            }
          </List>
          <List style={{ '--border-top': 'none', marginTop: rem(15) }}>
            <List.Item
              extra={<AddOutline fontSize={18} />}
              onClick={() => openAddModal(null)}
              arrow={false}
              style={{ fontSize: rem(12) }}
            >
              Enter a New Billing Address
            </List.Item>
          </List>
        </div>
      )
    }
  }



  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <NavBar onBack={close}>Select Address</NavBar>
      {renderCon()}
    </div>
  )
}

export default SelAddress