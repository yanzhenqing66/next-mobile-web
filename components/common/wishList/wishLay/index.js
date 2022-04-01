import style from './wishLay.module.scss'

function WishLay ({first, second, third, fourth, onClick}) {
  return (
    <ul className={style.wishLay} onClick={onClick}>
      <li className={style.first}>{first}</li>
      <li className={style.second}>{second}</li>
      <li className={style.third}>
        <div className={style.top}>{third}</div>
        <div className={style.bottom}>{fourth}</div>
      </li>
    </ul>
  )
}

export default WishLay