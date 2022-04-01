import dynamic from "next/dynamic"
const Modal = dynamic(import("@/components/common/modal"), { ssr: false })
import formatPrice from "@/utils/formatPrice"

const shipType = (type, price, freePrice) => {
  switch (type) {
    case 2: return <p className="fw400 mt10">Free Shipping on All Orders </p>
    case 3: return (
      <>
        <p className="fw400 mt10">
          Shipping fee ${formatPrice(price)}<br />
          Free Shipping on Orders Over ${formatPrice(freePrice)}
        </p>
      </>
    )
    case 4: return <p className="fw400 mt10">Shipping fee $10 on all orders</p>
  }
}

function ShippingRules({ visible, close, shipRules }) {

  return (
    <Modal
      visible={visible}
      onClose={close}
      bodyStyles={{
        height: '30vh'
      }}
    >
      <div className="p20 lh18">
        <p className="f13">Shipping Policy</p>
        {
          shipType(shipRules.templateFreeType, shipRules.templateShippingFee, shipRules.freeShippingPrice)
        }
      </div>
    </Modal>
  )
}

export default ShippingRules
