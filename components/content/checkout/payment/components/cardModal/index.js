import dynamic from "next/dynamic"
const Modal = dynamic(import("@/components/common/modal"), {ssr: false})
import EditCard from "../editCard"
import AddCard from "../addCard"

function AddCardModal ({addCardVis, onClose, cardId}) {
  return (
    <Modal
      visible={addCardVis}
      onClose={onClose}
      bodyStyles={{
        height: '85vh'
      }}
    >
      {
        cardId ? <EditCard cancel={onClose} cardId={cardId} /> : <AddCard cancel={onClose} />
      }
    </Modal>
  )
}

export default AddCardModal