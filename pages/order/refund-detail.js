import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import Head from '@/components/common/head'
import Submitted from '@/components/content/return-detail/submitted'
import SellBtn from '@/components/content/return-detail/sellbtn'
import RequestInfo from '@/components/content/return-detail/requestInfo'
import ItemDetail from '@/components/content/return-detail/itemDetail'
import RefundReason from '@/components/content/return-detail/refundReason'
import useGetParams from '@/hooks/useGetParams'
import LoadPage from '@/components/common/loadPage'
import ErrorPage from '@/components/common/errorPage'
import { refundDetailSwr } from '@/components/content/return-detail/request'
import RefundExpress from '@/components/content/return-detail/refundExpress'

const renderDetail = (data, error, refundNo) => {
  if (!data && !error) {
    return <LoadPage fixed />
  } else if (error) {
    return <ErrorPage />
  } else {
    return (
      <main className='p20'>
        <Submitted refundNo={refundNo} />
        <SellBtn refundNo={refundNo} />
        {
          data.type === 2 && data.status !== 1 && data.status !== 3 ? <RefundExpress refundNo={refundNo} /> : null
        }
        <RequestInfo refundNo={refundNo} />
        <ItemDetail refundNo={refundNo} />
        <RefundReason refundNo={refundNo} />
      </main>
    )
  }
}

function RefundDetail() {
  const router = useRouter()
  const { refundNo } = useGetParams(router.asPath)
  const { data, error } = refundDetailSwr(refundNo)

  return (
    <>
      <Head title='Poppy Shopping | Return Details' />
      <NavBar
        onBack={() => router.back()}
        style={{ '--border-bottom': '1px solid #f6f6f6' }}
        className='stickyTop bgf'
      >Return Details</NavBar>
      {renderDetail(data, error, refundNo)}
    </>
  )
}

export default RefundDetail
