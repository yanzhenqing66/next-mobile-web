import PayPalBtn from "../paypalBtn"
import style from './paypal.module.scss'

function Paypal() {
  // const [{isPending}] = usePayPalScriptReducer()
  return (
    <div className={style.wrap}>
      <p className={style.top}>Express checkout</p>
      <div className={style.content}>
        <PayPalBtn />
      </div>
      <div className={style.bottom}>
        After clicking “PayPal” button, you will be redirected to PayPal to complete your purchase securely.
      </div>
    </div>
  )
}

export default Paypal