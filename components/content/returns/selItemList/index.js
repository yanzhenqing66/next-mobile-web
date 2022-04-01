
import LazyLoad from '@/components/common/lazyLoad'
import rem from '@/utils/rem'
import { Checkbox } from 'antd-mobile'
import style from './selItemList.module.scss'

function SelItemList() {
  return (
    <div className={style.sel_list}>
      <Checkbox style={{ '--icon-size': rem(14) }} />
      <LazyLoad src='' className={style.sel_list_pic} />
      <div className={style.sel_list_info}>
        <p className={style.sel_list_title}>Bishop Sleeve Off The Shoulder Ruched</p>
        <p className={style.sel_list_attr}>gold-rose</p>
        <p className={style.sel_list_price}>$ 7.45 <span>x2</span></p>
      </div>
    </div>
  )
}

export default SelItemList