import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { CloseOutline } from 'antd-mobile-icons'
import { Button, Checkbox, Input } from 'antd-mobile'
const Modal = dynamic(import('@/components/common/modal'), { ssr: false })
import style from './filterPrice.module.scss'

function FilterPrice({ filterVisible, onClose, searchFilter }) {
  const [checkData, setCheckData] = useState({
    freeShipping: false,
    pictureReview: false,
    storeAge: false,
    // onSale: false
  })

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const checkChange = (e, name) => {
    setCheckData({ ...checkData, [name]: e })
  }

  const search = () => {
    const params = {
      freeShipping: checkData.freeShipping ? 1 : 0,
      pictureReview: checkData.pictureReview ? 1 : 0,
      storeAge: checkData.storeAge ? 1 : 0,
      minPrice: minPrice ? minPrice * 100 : null,
      maxPrice: maxPrice ? maxPrice * 100 : null
    }
    searchFilter(params)
  }

  const reset = () => {
    setCheckData({
      freeShipping: false,
      pictureReview: false,
      storeAge: false,
    })
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <Modal
      visible={filterVisible}
      onClose={onClose}
      bodyStyles={{
        height: '55vh',
      }}
    >
      <div className={style.filterPrice}>
        <header className={style.header}>
          <CloseOutline onClick={onClose} fontSize={20} />
          <h3>Filter</h3>
          <p onClick={reset} style={{ cursor: 'pointer' }}>Reset</p>
        </header>
        <main className={style.main}>
          <h4>Service</h4>
          <ul>
            <li>
              <p>Free shipping</p>
              <Checkbox checked={checkData.freeShipping} onChange={(e) => checkChange(e, 'freeShipping')} />
            </li>
            <li>
              <p>Picture review</p>
              <Checkbox checked={checkData.pictureReview} onChange={(e) => checkChange(e, 'pictureReview')} />
            </li>
            <li>
              <p>3 years history</p>
              <Checkbox checked={checkData.storeAge} onChange={(e) => checkChange(e, 'storeAge')} />
            </li>
          </ul>
        </main>
        <article className={style.price}>
          <h4>Price</h4>
          <section className={style.rangeShow}>
            <div className={style.show}>
              <span className={style.tip}>$ </span>
              <Input
                type="number"
                value={minPrice}
                placeholder="Min price"
                onChange={(e) => setMinPrice(e)}
                style={{
                  '--font-size': 13
                }}
                min={0}
              />
            </div>
            <span> 一 </span>
            <div className={style.show}>
              <span className={style.tip}>$ </span>
              <Input
                type="number"
                value={maxPrice}
                placeholder="Max price"
                onChange={e => setMaxPrice(e)}
                style={{ '--font-size': 13 }}
                min={0}
              />
            </div>
          </section>
        </article>
        <footer className={style.footBtn}>
          <Button block className={style.searchBtn} onClick={search}>Show results</Button>
        </footer>
      </div>
    </Modal>
  )
}

export default FilterPrice