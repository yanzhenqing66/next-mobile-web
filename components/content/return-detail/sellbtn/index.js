import rem from '@/utils/rem'
import { Button, Dialog, Toast } from 'antd-mobile'
import { cancelRefund } from '@/api/returns'
import { refundDetailSwr } from '../request'
import css from 'styled-jsx/css'

function SellBtn({ refundNo }) {
  const { data, mutate } = refundDetailSwr(refundNo)
  const goApp = () => {
    location.href = 'https://active.poppyapps.com/app'
  }

  const cancelRequest = () => {
    Dialog.confirm({
      content: 'If you cancel the return request, this item will not be eligible for return again.',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      onConfirm: async () => {
        cancelRefund({ refundNo }).then(() => {
          mutate()
        }).catch(err => {
          Toast.show({
            content: err?.message || 'Refund failed, please try again',
            position: 'bottom'
          })
        })
      },
    })
  }

  return (
    <div>
      <Button
        style={{
          '--background-color': '#222',
          '--text-color': '#fff',
        }}
        size='large'
        shape="rounded"
        className='btn'
        onClick={goApp}
      >Contact Seller</Button>
      {
        data?.status !== 4 && data?.status !== 5 ?
          <Button
            shape="rounded"
            className='btn'
            onClick={cancelRequest}
          >Cancel Request</Button> : null
      }
      <style jsx>{divCss}</style>
    </div>
  )
}

const divCss = css`
  div {
    margin-top: ${rem(20)};
    display: flex;
    justify-content: space-evenly;
  }
  
  div :global(.btn) {
    width: ${rem(148)};
  }
`

export default SellBtn