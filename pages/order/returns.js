import { useState, useMemo, useCallback } from 'react'
import { useImmer } from 'use-immer'
import { useRouter } from "next/router"
import { NavBar, Dialog, Toast } from "antd-mobile"
import css from 'styled-jsx/css'
import Head from "@/components/common/head"
import ReturnItem from "@/components/content/returns/returnItem"
import RefundAmount from "@/components/content/returns/refundAmount"
import ReturnReason from "@/components/content/returns/returnReason"
import SubmitReturn from "@/components/content/returns/submitReturn"
import SelectItem from "@/components/content/returns/selectItem"
import { ReturnContext } from '@/components/content/returns/module'
import { preReturnInfoSwr } from '@/components/content/returns/request'
import { submitRefund } from '@/api/returns'
import useGetParams from '@/hooks/useGetParams'
import rem from "@/utils/rem"

function Returns() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const { orderNo, orderInfoId } = useGetParams(router.asPath)
  const [returnParams, setReturnParams] = useImmer({
    orderInfoIds: [orderInfoId],
    refundResources: [],
    returnReason: ''
  })

  const { data } = preReturnInfoSwr({
    orderNo,
    orderInfoIds: [orderInfoId],
    entireRefund: 0
  })

  const store = useMemo(() => ({
    visible,
    setVisible,
    orderNo,
    orderInfoId,
    refundFee: data?.refundFee
  }), [visible, orderNo, orderInfoId, data])

  const getReason = (val) => {
    setReturnParams(draft => {
      draft.returnReason = val
    })
  }

  const getPhote = (val) => {
    setReturnParams(draft => {
      draft.refundResources = val.map(item => item.url)
    })
  }

  const submitReturn = useCallback(() => {
    submitRefund(returnParams).then(() => {
      Dialog.alert({
        content: 'Return request submitted! Please go to the Return Center to check your return order status.',
        confirmText: 'Go to Return Center',
        onConfirm: () => {
          router.replace('refund-list')
        }
      })
    }).catch(() => {
      Toast.show({
        content: 'Failed to apply for refund. Please try again!',
        position: 'bottom'
      })
    })
  })

  return (
    <>
      <Head title="Poppy Shopping | Returns" />
      <div className="navbar">
        <NavBar
          onBack={() => router.back()}
          style={{ '--border-bottom': '1px solid #f6f6f6' }}
        >
          Return
        </NavBar>
        <style jsx>{`
          .navbar {
            position: sticky;
            top: 0;
            background: #fff;
          }
      `}</style>
      </div>
      <ReturnContext.Provider value={store}>
        <main>
          <ReturnItem />
          <RefundAmount />
          <ReturnReason getReason={getReason} getPhote={getPhote} />
          <style jsx>{mainCss}</style>
        </main>
        <SubmitReturn submitReturn={submitReturn} />
        <SelectItem />
      </ReturnContext.Provider>
    </>
  )
}

const mainCss = css`
  padding: ${rem(20)};
  position: absolute;
  top: 95px;
  bottom: ${rem(70)};
  overflow: auto;
  width: 100%;
`

export default Returns