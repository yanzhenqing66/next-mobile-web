import WishLayout from '@/components/content/wishList/wishLayout'
import TopBar from '@/components/common/topBar'
import RecentLayout from '@/components/content/wishList/recentView/recentLayout'
// import WishDefault from '@/components/content/wishList/wishDefault'
// import noRecent from '@/assets/wishList/noRecent.svg'

function RecentView() {

  return (
    <WishLayout>
      <RecentLayout />
      <TopBar />
    </WishLayout>
  )
}

export default RecentView