import { Fragment, memo } from "react"
import { Space, Button, Stepper } from "antd-mobile"
import { useDetailState } from "../module"
import Scroll from "@/components/common/scroll"
import style from './optionModal.module.scss'

function OptItem({ selOptions, showSku, selOptionInfo, stock, stockChange, skuNum }) {
  const { data: { attributes } } = useDetailState()

  return (
    <Scroll className={style.goodOption}>
      <div hidden={showSku}>
        {
          attributes?.map((item, index) => (
            <Fragment key={index}>
              <h4>{item.name} ({item?.values?.length})</h4>
              <Space wrap>
                {
                  item?.values?.map((item2, index2) => (
                    <Button
                      key={index2}
                      onClick={() => selOptions(item2.value, item.name)}
                      style={{
                        '--border-color':
                          item2.value == selOptionInfo[item.name]
                            ? '#999'
                            : '#f6f6f6',
                        '--background-color':
                          item2.value == selOptionInfo[item.name]
                            ? '#fff'
                            : '#f6f6f6',
                        '--border-radius': '8px',
                      }}
                      className={style.attr_option}
                      size="mini"
                    >
                      {item2.value}
                    </Button>
                  ))
                }
              </Space>
            </Fragment>
          ))
        }
        <div className="mt20 flexBetween">
          <p className="f14 fw600">Quantity</p>
          <Stepper
            value={skuNum}
            min={1}
            max={stock}
            inputReadOnly
            onChange={stockChange}
            style={{
              '--button-text-color': '#222'
            }}
          />
        </div>
      </div>
    </Scroll>
  )
}

export default memo(OptItem)
