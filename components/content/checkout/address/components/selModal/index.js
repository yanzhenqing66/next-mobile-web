import dynamic from "next/dynamic"
const Modal = dynamic(import("@/components/common/modal"), { ssr: false })
import SelAddress from "../selAddress"

function AddressModal({ selAddressVis, close, openAddModal }) {

  return (
    <>
      <Modal
        visible={selAddressVis}
        onClose={close}
        bodyStyles={{ height: '85vh' }}
      >
        <SelAddress close={close} openAddModal={openAddModal} />
      </Modal>
    </>
  )
}

export default AddressModal