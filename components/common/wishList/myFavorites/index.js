import Link from "next/link"
import dynamic from "next/dynamic"
import WishLay from "../wishLay"
const LazyLoad = dynamic(import("../../lazyLoad"), {ssr: false})
import { formatUrl } from "@/utils/formatUrl"
import SvgIcon from "../../svgIcon"
import style from './myFavorites.module.scss'

function MyFavorites({ data }) {

  return (
    <div className={style.my_favorites}>
      {
        data?.map(item => (
          <Link
            href={{
              pathname: `/wishList/${formatUrl(item.name) + '_q_' + item.id}`,
              query: { action: `/wishList/${item.id}` }
            }}
            key={item.id}
          >
            <a className={style.content}>
              <WishLay
                first={<LazyLoad src={item.images?.[0]} alt={item.name} />}
                second={<LazyLoad src={item.images?.[1]} alt={item.name} />}
                third={<LazyLoad src={item.images?.[2]} alt={item.name} />}
                fourth={<LazyLoad src={item.images?.[3]} alt={item.name} />}
              />
              {
                item.isShow ? <SvgIcon src='/images/wishlist/lockwish.svg' className={style.lock} /> : null
              }
              <section className={style.title}>
                <div className={style.title_name}>
                  <h2>{item.name}</h2>
                  <p className={style.title_count}>{item.count} items</p>
                </div>
                <div className={style.bottom}>
                  <p className={style.bottom_createBy}>Created by {item.nickName}</p>
                  <ul className={style.bottom_follow}>
                    {
                      item.followUsers?.slice(0, 2).map((item2, idx2) => (
                        <li key={idx2}><LazyLoad src={item2.headPicture} /></li>
                      ))
                    }
                    {
                      item.favorCount > 2 ? <li>{item.favorCount}</li> : null
                    }
                  </ul>
                </div>
              </section>
            </a>
          </Link>
        ))
      }
    </div>
  )
}

export default MyFavorites