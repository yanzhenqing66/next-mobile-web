import css from 'styled-jsx/css'
import LazyLoad from "@/components/common/lazyLoad"
import rem from "@/utils/rem"

function NoOrder() {
  return (
    <div>
      <LazyLoad
        src='https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/onOrder.svg'
        width={rem(150)}
        height={rem(150)}
      />
      <h3>No orders yet</h3>
      <style jsx>{noOrderCss}</style>
    </div>
  )
}

const noOrderCss = css`
  div {
    width: ${rem(335)}
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20vh;
  }

  h3 {
    font-size: ${rem(18)};
  }
`

export default NoOrder