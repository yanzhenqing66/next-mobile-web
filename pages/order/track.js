import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import Head from "@/components/common/head"
import OrderInfo from '@/components/content/track/orderInfo'
import TrackInfo from '@/components/content/track/trackInfo'
import useGetParams from '@/hooks/useGetParams'
import { getTrackSwr } from '@/components/content/track/request'
import LoadPage from '@/components/common/loadPage'
import ErrorPage from '@/components/common/errorPage'

const renderCon = (loading, error) => {
  if (loading) {
    return <LoadPage fixed />
  } else if (error) {
    return <ErrorPage />
  } else {
    return <>
      <OrderInfo />
      <TrackInfo />
    </>
  }
}


function Track() {
  const router = useRouter()
  const { orderNo } = useGetParams(router.asPath)
  const { error, loading } = getTrackSwr(orderNo)

  return (
    <>
      <Head title='Poppy Shopping | Track' />
      <div>
        <NavBar
          onBack={() => router.back()}
          style={{ '--border-bottom': '1px solid #f8f8f8' }}
        >Track</NavBar>
        <style jsx>{`
          div {
            position: sticky;
            top: 0;
            background: #fff;
          }
        `}</style>
      </div>
      {renderCon(error, loading)}
    </>
  )
}

export default Track