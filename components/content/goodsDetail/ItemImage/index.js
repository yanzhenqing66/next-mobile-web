import { Fragment, memo } from "react"
import styled from "@emotion/styled"
import LazyLoad from "@/components/common/lazyLoad"
import { useDetailState } from "../module"
import rem from "@/utils/rem"

const ImgList = styled.div`
  .img {
    padding: ${rem(12)};
    margin-bottom: ${rem(15)};
  }
`

const MemoItemImage = memo(({ images }) => {
  return (
    <section className="borBot">
      <h3 className="f14 mtb20">Item image gallery</h3>
      <ImgList>
        {
          images.map(item => {
            return (
              <Fragment key={item.id}>
                {
                  item.mediaType === 'image' ? <LazyLoad src={item.src} className='img bgf8' /> : null
                }
              </Fragment>
            )
          })
        }
      </ImgList>
    </section>
  )
})

function ItemImage() {
  const { images } = useDetailState()
  return (
    <MemoItemImage images={images} />
  )
}

export default ItemImage
