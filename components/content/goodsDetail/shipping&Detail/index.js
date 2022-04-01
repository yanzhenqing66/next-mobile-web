import dynamic from 'next/dynamic'
import React, { useState, memo } from 'react'
import { Collapse } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
const Modal = dynamic(import('@/components/common/modal'), { ssr: false })
import TopHead from '@/components/common/topHead'
import { useDetailState } from '../module'
import Review from '../review'
import style from './shipping.module.scss'

function Shipping() {
  const [detailVis, setDetailVis] = useState(false)
  const { store, desc } = useDetailState()

  return (
    <div className={style.shipping}>
      <Collapse defaultActiveKey={['3']}>
        <Collapse.Panel key='1' title='Shipping and returns'>
          <section className={style.info}>
            <span className={style.info_pol} dangerouslySetInnerHTML={{ __html: store.shippingAndReturnPolicy }}></span>
            <p className={style.more} onClick={() => setDetailVis(true)}>
              {'more detail >'}
            </p>
            <style jsx>{`
              p {
                display: ${store.shippingAndReturnPolicyDtl ? '' : 'none'}
              }
            `}</style>
          </section>
        </Collapse.Panel>
        <Collapse.Panel key='2' title='Item details'>
          <div className={style.item_detail} dangerouslySetInnerHTML={{ __html: desc }}></div>
        </Collapse.Panel>
        <Collapse.Panel key='3' title='Reviews'>
          <Review />
        </Collapse.Panel>
      </Collapse>

      <Modal visible={detailVis} onClose={() => setDetailVis(false)}>
        <TopHead right={<CloseOutline
          fontSize={20}
          onClick={() => setDetailVis(false)}
        />}
        />
        <div className={style.detail_info}>
          <span className={style.detail_info_pol} dangerouslySetInnerHTML={{ __html: store.shippingAndReturnPolicyDtl }}></span>
        </div>
      </Modal>
    </div>
  )
}

export default memo(Shipping)