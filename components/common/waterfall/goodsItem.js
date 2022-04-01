import Video from '../video'
import LazyLoad from '../lazyLoad'
import formatPrice from '@/utils/formatPrice'
import rem from '@/utils/rem'
import like from '@/assets/images/wishList/like.svg'
import unLike from '@/assets/images/wishList/unLike.svg'
import SvgIcon from '../svgIcon'
import style from './waterfall.module.scss'

const getImgHei = (item) => {
  if (item.featuredVideo?.height) {
    return rem(162 * (item.featuredVideo?.height * 1) / (item.featuredVideo?.width * 1))
  } else {
    return rem(162 * (item.featuredImage?.height * 1) / (item.featuredImage?.width * 1))
  }
}

const formatMax = (price) => {
  if (!price) return 0
  const res = formatPrice(price)
  return res.split('.')[0]
}

const formatMin = (price) => {
  if (!price) return '00'
  const res = formatPrice(price)
  return res.split('.')[1]
}

function GoodsItem({ item, followOpt, updFollowGood }) {
  return (
    <div className={style.gItem}>
      <section className={style.goodsImg}>
        {renderMidea(item)}
        <style jsx>{`
          section {
            height: ${getImgHei(item)};
          }
        `}</style>
        <div className={style.brand}>
          {item.brand?.slice(0, 18)}{item.brand?.length > 18 ? '...' : ''}
        </div>
        {
          followOpt ? (
            <div
              className={style.followOpt}
              onClick={(e) => updFollowGood(e, item.id)}
            >
              <SvgIcon src={item.followBool ? like : unLike} className={style.like} />
            </div>
          ) : null
        }
      </section>
      <section className='p5'>
        <h3 className='fw500 lh18 max2Line'>{item.title}</h3>
      </section>
      <section className={style.price}>
        <span className='fw600'>
          <span className='f10 mr2'>{item.currencyMark}</span>
          {formatMax(item.price)}
          <span className='f10 mr2'>{'.' + formatMin(item.price)}</span>
        </span>
        {
          item.compareAtPrice > 0 && item.compareAtPrice != item.price ?
            <span className={style.original_price}>
              <span className='f10 mr2'>{item.currencyMark}</span>
              {formatMax(item.compareAtPrice)}
              <span className='f10 mr2'>{'.' + formatMin(item.compareAtPrice)}</span>
            </span> : null
        }
        {
          item.compareAtPrice > 0 && item.price / item.compareAtPrice < 0.9 ?
            <span className={style.discount}>
              {Math.round((1 - (item.price / item.compareAtPrice)) * 100)}% off
            </span> : null
        }
      </section>
    </div>
  )
}

const renderMidea = (item) => (
  <>
    {
      item.featuredVideo ?
        <Video
          src={item.featuredVideo?.src}
          poster={item.featuredImage?.src}
          autoPlay
          muted
          loop
          style={{ objectFit: 'cover' }}
        />
        :
        <LazyLoad
          src={item.featuredImage?.src}
          alt={item.title}
          lazy
        />
    }
  </>
)

export default GoodsItem