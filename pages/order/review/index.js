import { useRouter } from "next/router"

import { NavBar, Tabs } from "antd-mobile"
import Head from "@/components/common/head"
import ToReviewList from "@/components/content/review/toReviewList"

const tabs = [
  {key: '0', title: 'To be reviewed'},
  {key: '1', title: 'Reviewed'}
]

function Review() {
  const router = useRouter()

  return (
    <>
      <Head title='Poppy Shopping | Review' />
      <header>
        <NavBar onBack={() => router.back()}>Review</NavBar>
        <Tabs style={{'--adm-color-primary': '#222'}}>
          {
            tabs.map(item => (
              <Tabs.Tab title={item.title} key={item.key} />
            ))
          }
        </Tabs>
        <style jsx>{`
          header {
            position: sticky;
            top: 0;
          }
        `}</style>
      </header>
      <ToReviewList />
    </>
  )
}

export default Review