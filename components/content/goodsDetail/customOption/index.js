import React, { Fragment, useMemo, memo, useContext } from 'react'
import { RightOutline } from 'antd-mobile-icons'
import { ProductContext } from '../module'
import style from './customOption.module.scss'

function CustomOption() {
  const {attributes, goBuy} = useContext(ProductContext)
  
  const renderList = () => {
    return (
      <div className={style.customOption}>
        {
          attributes?.slice(0, 1)?.map((item, index) => (
            <Fragment key={index}>
              <section className={style.optionName} onClick={() => goBuy('cart')} >
                <h4>Select {item.name}</h4>
                <RightOutline className={style.rightIcon}/>
              </section>
              {
                item?.values?.length > 2 ? (
                  <ul
                    className={style.optionCard}
                    onClick={() => goBuy('cart')}
                  >
                    {
                      item?.values?.slice(0, 4).map((item2, index2) => (
                        <li key={index2}>{item2.value}</li>
                      ))
                    }
                    {
                      item?.values?.length > 4 ?
                        <li>
                          {'+' + (item.values && item.values.length - 4)}
                        </li>
                        : null
                    }
                  </ul>
                ) : null
              }
            </Fragment>
          ))
        }
      </div>
    )
  }

  const memoRender = useMemo(() => renderList, [attributes])

  return (
    <>{memoRender()}</>
  )
}

export default memo(CustomOption)