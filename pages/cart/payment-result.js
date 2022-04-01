import { useRouter } from "next/router"
import { NavBar } from "antd-mobile"
import Head from "@/components/common/head"
import PayRes from "@/components/content/payment/payRes"

function PaymentResult() {
  const router = useRouter()
  return (
    <>
      <Head title='Poppy Shopping | Payment Result' />
      <NavBar onBack={() => router.push('/cart')} />
      <PayRes />
    </>
  )
}

export default PaymentResult