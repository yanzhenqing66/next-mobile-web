
import { useRouter } from "next/router"
import { NavBar } from "antd-mobile"
import Head from "@/components/common/head"
import ItemDetailList from "@/components/content/orders/itemDetailList.js"

function ItemDetail() {
  const router = useRouter()
  return (
    <>
      <Head title='Poppy Shopping | Item Detail' />
      <NavBar
        onBack={() => router.back()}
        style={{ '--border-bottom': '1px solid #f6f6f6' }}
        className='stickyTop bgf'
      >Item Details</NavBar>
      <ItemDetailList />
    </>
  )
}

export default ItemDetail