import { memo } from "react"
import dynamic from "next/dynamic"
import { NavBar } from "antd-mobile"
const Modal = dynamic(import("@/components/common/modal"), { ssr: false })
import SelItemList from "../selItemList"
import { useRefundContext } from "../module"

function SelectItem() {
  const { visible, setVisible } = useRefundContext()

  return (
    <Modal
      visible={visible}
      onClose={() => setVisible(false)}
      bodyStyles={{
        height: '100vh',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }}
    >
      <NavBar
        onBack={() => setVisible(false)}
        style={{ '--border-bottom': '1px solid #f6f6f6' }}
      >Select items</NavBar>
      <SelItemList />
    </Modal>
  )
}

export default memo(SelectItem)