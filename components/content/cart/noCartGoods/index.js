import css from 'styled-jsx/css'
import LazyLoad from "@/components/common/lazyLoad"
import rem from "@/utils/rem"

function NoCartGoods () {
  return (
    <div className='nogoods'>
      <LazyLoad 
        src="https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/noCartGoods.svg" 
        width={rem(150)}
        height={rem(150)} 
      />
      <h3>Your bag is empty</h3>
      <style jsx>{nogoodsCss}</style>
    </div>
  )
}

const nogoodsCss = css`
  .nogoods {
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

export default NoCartGoods