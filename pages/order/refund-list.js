import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import RefundList from '@/components/content/refundList'
import Head from '@/components/common/head'

function Refundlist () {
  const router = useRouter()
  const refundListMemo = useMemo(() => <RefundList />, [])
  return (
    <>
      <Head title='Poppy Shopping | Return / Refund' />
      <NavBar 
        onBack={() => router.back()}
        style={{'--border-bottom': '1px solid #f6f6f6'}}
        className='stickyTop bgf'
      >Return / Refund</NavBar>
      {refundListMemo}
    </>
  )
}

export default Refundlist