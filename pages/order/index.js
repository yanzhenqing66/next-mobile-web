import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NavBar, Tabs } from 'antd-mobile'
import rem from '@/utils/rem'
import Head from "@/components/common/head"
import useGetParams from '@/hooks/useGetParams'
import OrderList from "@/components/content/orders/orderList"

const statusList = [
  { key: '0', title: 'All orders' },
  { key: '2', title: 'Processing' },
  { key: '3', title: 'Shipped' },
  { key: '4', title: 'Completed' },
  { key: '1', title: 'Pending' }
]

function Orders() {
  const router = useRouter()
  const { key } = useGetParams(router.asPath)

  const activeChange = (key) => {
    router.push({
      pathname: '/order',
      query: { key }
    })
    router.events.on('routeChangeComplete', handleRouteChange)
  }

  const handleRouteChange = (url, { shallow }) => {
    router.reload()
  }

  useEffect(() => {

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  return (
    <>
      <Head title='Poppy Shopping | Orders' />
      <header>
        <NavBar onBack={() => router.push('/me')}>Orders</NavBar>
        <Tabs
          activeKey={key}
          onChange={activeChange}
          style={{
            '--title-font-size': rem(13),
            '--adm-color-primary': '#222'
          }}>
          {
            statusList.map(item => (
              <Tabs.Tab title={item.title} key={item.key} />
            ))
          }
        </Tabs>
        <style jsx>{`
          header {
            position: sticky;
            top: 0;
            background-color: #fff;
          }
        `}</style>
      </header>
      <OrderList />
    </>
  )
}

export default Orders