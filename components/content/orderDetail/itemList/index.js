import style from './itemList.module.scss'

function ItemList ({title, children}) {
  return (
    <div className={style.itemList}>
      <h4>{title}</h4>
      <div className={style.content}>{children}</div>
      <div className={style.bottom_line}></div>
    </div>
  )
}

export default ItemList