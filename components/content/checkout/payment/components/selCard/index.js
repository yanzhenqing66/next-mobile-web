import dynamic from "next/dynamic"
import { NavBar, List, SwipeAction, Radio } from "antd-mobile"
import { AddOutline } from "antd-mobile-icons"
import rem from "@/utils/rem"
import { updPayCard, delPayCard } from "@/api/cart"
import { getPayCard } from "../../../request"
import LoadPage from "@/components/common/loadPage"
import ErrorPage from "@/components/common/errorPage"
const Modal = dynamic(import("@/components/common/modal"), { ssr: false })
import style from './selCard.module.scss'

function SelCard({ selCardVis, close, openAddModal }) {
  const { data, error, loading, mutate } = getPayCard()

  const rightActions = (item) => {
    if (item.isDefault) {
      return [
        {
          key: 'edit',
          text: 'edit',
          color: 'light',
          onClick: () => openAddModal(item.id)
        },
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

  const updPayCardDefault = async (val, id) => {
    const params = {
      isDefault: val ? 1 : 0,
      id
    }
    await updPayCard(params)
    mutate()
  }

  const delAddressHandle = async (id) => {
    await delPayCard(id)
    const filterData = data.filter(item => item.id !== id)
    mutate([...filterData])
  }

  const renderList = () => {
    if (loading) {
      return <LoadPage fixed />
    } else if (error) {
      return <ErrorPage />
    } else {
      return (
        <List
          style={{
            '--border-top': 'none',
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
                    <p style={{ lineHeight: rem(18) }}>
                      {'ending in'+ ' ' + item.cardNumber.substr(item.cardNumber.length-4) }<br />
                      {item.nameOnCard}<br />
                      {item.street}<br />
                      {item.city}, {item.state} {item.zipcode}<br />
                      {item.phone}<br />
                      {
                        item.isDefault ? <span className={style.isDefault}>Default Card</span> : null
                      }
                    </p>
                  }
                  extra={<Radio
                    checked={item.isDefault === 1 ? true : false}
                    onChange={(val) => updPayCardDefault(val, item.id)}
                  />}
                >
                </List.Item>
              </SwipeAction>
            ))
          }
        </List>
      )
    }
  }

  return (
    <Modal
      visible={selCardVis}
      onClose={close}
      bodyStyles={{
        height: '85vh',
        overflowY: 'auto'
      }}
    >
      <NavBar
        backArrow={false}
        back="cancel"
        onBack={close}
      >
        Select Payment
      </NavBar>
      <div className={style.main}>
        <header className={style.header}>
          <h4>Credit Cards</h4>
          <p>Swipe to Edit</p>
        </header>
        {renderList()}
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
    </Modal>
  )
}

export default SelCard