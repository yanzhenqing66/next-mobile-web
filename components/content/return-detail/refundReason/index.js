import { Space } from "antd-mobile"
import LazyLoad from "@/components/common/lazyLoad"
import rem from "@/utils/rem"
import { refundDetailSwr } from "../request"

function RefundReason({ refundNo }) {
  const { data } = refundDetailSwr(refundNo)

  return (
    <div className="ptb20">
      <h5 className="f13">Reasons for return/refund</h5>
      <p className="fw400 lh18 mt20">{data.returnReason}</p>
      <Space wrap style={{ '--gap': `${rem(11)}` }} className='mt20'>
        {
          data?.refundResource?.map((item, index) => (
            <LazyLoad key={index} src={item} width={rem(104)} height={rem(104)} className='br8' />
          ))
        }
      </Space>
    </div>
  )
}

export default RefundReason