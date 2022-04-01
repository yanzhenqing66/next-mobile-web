import dynamic from "next/dynamic"
const Modal = dynamic(import("@/components/common/modal"), { ssr: false })
import AddAddress from "../add"
import EditAddress from "../edit"

function AddModal({ addressVis, close, addressId }) {
  return (
    <Modal
      visible={addressVis}
      colse={close}
      bodyStyles={{
        height: '85vh'
      }}
      destroyOnClose={true}
    >
      {
        addressId
          ?
          <EditAddress addressId={addressId} cancel={close} />
          :
          <AddAddress cancel={close} />
      }
    </Modal>
  )
}

export default AddModal
