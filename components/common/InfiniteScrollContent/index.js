import {Loading} from 'antd-mobile'
import css from 'styled-jsx/css'

const infiConStyle = css`
  div {
    text-align: center;
    color: #666;
  }
`


const InfiniteScrollContent = ({ hasMore }) => {
  return (
    <div>
      {hasMore ? (
        <>
          <span>Loading</span>
          <Loading />
        </>
      ) : (
        <span>--- There's nothing more ---</span>
      )}
      <style jsx>{infiConStyle}</style>
    </div>
  )
}

InfiniteScrollContent.defaultProps = {
  hasMore: false,
}


export default InfiniteScrollContent