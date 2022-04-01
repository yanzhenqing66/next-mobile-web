import { useEffect, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useImmerReducer } from "use-immer"
import { getCookies, getUrlParams } from "@/utils/formatServreParams"
import {
  ProductContext,
  productInitState,
  productReducer,
} from "@/components/content/goodsDetail/module"
import {
  getDetailData,
  getDetailView
} from "@/api/goodsDetail"
import { getStoreLabel } from "@/api/wishList"
import useGetPlatForm from "@/hooks/useGetPlatForm"
import formatPrice from "@/utils/formatPrice"
import formatParams from "@/utils/formatParams"
import Head from "@/components/common/head"
import HeadGuide from "@/components/common/layout/headGuide"
import Swiper from "@/components/content/goodsDetail/swiper"
import Title from "@/components/content/goodsDetail/title"
import CustomOption from "@/components/content/goodsDetail/customOption"
import ShippingDetail from "@/components/content/goodsDetail/shipping&Detail"
import AboutBrand from "@/components/content/goodsDetail/aboutBrand"
import { fbTrack, pinTrack, adEvent, reportLog } from "@/utils/pixelTrack"
import { debounce } from "@/utils/optimizeFn"
import BuyNow from "@/components/content/goodsDetail/buynow"
const ItemImage = dynamic(() => import("@/components/content/goodsDetail/ItemImage"))
const Scroll = dynamic(() => import("@/components/common/scroll"))
const OptionModal = dynamic(
  () => import("@/components/content/goodsDetail/optionModal")
)
const NavBar = dynamic(() => import("@/components/content/goodsDetail/navBar"))
const MoreBrandGoods = dynamic(
  () => import("@/components/content/goodsDetail/moreBrandGoods")
);
import style from "./goodsDetail.module.scss"
import storeUtils from "@/utils/storageUtil"

function GoodsDetail({ detailData: data, reviews, store, id, resolvedUrl }) {
  const router = useRouter()
  const token = useSelector(state => state.tokenReducer)
  const { activeTab } = useSelector((state) => state.goodsReducer)

  const [
    { optionVisible, activeHeader },
    dispatch
  ] = useImmerReducer(productReducer, productInitState)

  const goBuy = useCallback(() => {
    if (data.productSource) {
      dispatch({ type: "setOptionVisible", data: true })

      adEvent('md3v5d', {
        product_id: id,
        currency: "USD",
        price: formatPrice(data.price),
        active_tab: activeTab
      })

      reportLog({
        event: "click_button",
        page: "detail",
        item_id: id,
        button: "buy",
        item_type: "inner",
      })

    } else {
      const ua = useGetPlatForm()
      if (ua === "mobile") {
        op?.wakeupOrInstall()
      } else {
        window.open("https://active.poppyapps.com/", "_blank")
      }
    }
  }, [])

  const goBack = useCallback(() => {
    const referrer = document.referrer
    if (referrer) {
      router.back()
      return
    }
    router.push('/')
  }, [])

  useEffect(() => {
    storeUtils.setStore('action', `/productDetail/${id}`)

    setRichTxt(data, reviews)

    fbTrack("ViewContent", {
      content_type: 'product',
      contents: [id],
      currency: "USD",
      value: formatPrice(data.price),
    })

    pinTrack("PageVisit", {
      promo_code: "product_detail",
      product_id: id,
      lead_type: activeTab || "0",
      product_price: formatPrice(data.price),
      currency: "USD",
    })

    adEvent('pb3sn3', {
      product_id: id,
      currency: "USD",
      price: formatPrice(data.price),
      title: data.title,
      active_tab: activeTab
    })

    reportLog({ event: "page_show", page: "detail", item_id: id })

    const start_ts = new Date().getTime()
    return () => {
      const end_ts = new Date().getTime()
      reportLog({
        event: "page_duration",
        page: "detail",
        item_id: id,
        start_ts,
        end_ts,
      })
    }
  }, [])

  const getPosition = debounce((e) => {
    if (-e.y > 150) {
      dispatch({ type: "setActiveHeader", data: true })
    } else {
      dispatch({ type: "setActiveHeader", data: false })
    }
  }, 200)

  const context = useMemo(() => ({
    id,
    data,
    title: data.title,
    resolvedUrl,
    optionVisible,
    activeHeader,
    dispatch,
    goBack,
    router,
    reviewScore: reviews?.averageScore?.toString()?.slice(0, 3),
    reviewTotal: reviews.total,
    attributes: data.attributes,
    goBuy,
    images: data.images,
    store,
    desc: data.description,
    reviews,
    featuredImage: data?.featuredImage?.src,
    activeTab,
    token,
  }), [
    id,
    data,
    resolvedUrl,
    optionVisible,
    activeHeader,
    router,
    store,
    reviews,
    activeTab,
    token,
    dispatch,
    goBack,
    goBuy
  ])

  return (
    <div className={style.wrap}>
      <Head
        title={store?.brand + ': ' + data.title}
        desc={data.detailDesc}
        keywords={data.title}
        amount={formatPrice(data.price)}
        currency={data.currencyMark}
        image={data?.featuredImage?.src}
      >
        <meta
          property="og:url"
          content={`https://www.poppyapps.com/${resolvedUrl}`}
        />
        <meta
          property="og:brand"
          content={store.brand}
        />
      </Head>
      <ProductContext.Provider value={context}>
        <NavBar type={1} />
        <Scroll className={style.scroll} getPosition={getPosition}>
          <div className={style.container}>
            <HeadGuide />
            <NavBar type={0} />
            <Swiper />
            <main className={style.main}>
              <Title />
              <CustomOption />
              <AboutBrand />
              <ShippingDetail />
              <ItemImage />
            </main>
            <MoreBrandGoods id={id} />
          </div>
        </Scroll>
        <BuyNow />
        <OptionModal />
      </ProductContext.Provider>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const {
    query: { id: ids },
    req,
    resolvedUrl,
  } = ctx
  const id = getUrlParams(ids)
  const cookies = getCookies(req)
  const headers = {
    "device-id": cookies["device-id"] || "",
    "X-Poppy-Token": cookies.poppy_token || "",
    "platform-id": "web",
  }

  const params = formatParams({
    curPage: 1,
    pageSize: 3,
    productId: id,
  })

  const res = await Promise.all([getDetailData({ id }, headers), getDetailView(params, headers)])
  const detailData = {
    ...res?.[0]?.data,
    detailDesc: res?.[0]?.data?.description?.replace(/<.*?>/gi, "")
  }
  const { data: storeLabel } = await getStoreLabel(detailData.storeId)

  if (!res) {
    return {
      redirect: {
        destination: '/_error',
        permanent: false
      },
    }
  }

  return {
    props: {
      id,
      resolvedUrl,
      detailData,
      reviews: res?.[1].data,
      store: { ...detailData.store, storeLabel },
      key: id
    },
  };
}

// 设置数据格式化结构
const setRichTxt = (data, reviews) => {
  let s = document.querySelector("#json_ld");
  s && s.parentNode.removeChild(s);
  let script = document.createElement("script");
  let webJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    sku: data.id,
    name: data.title,

    image: data.images
      .filter((item) => item.mediaType !== "video")
      .map((i) => i.src),
    offers: {
      "@type": "Offer",
      price: formatPrice(data.price),
      url: `https://www.poppyapps.com/productDetail/${data.id}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
    brand: {
      "@type": "Brand",
      name: "Poppy",
    },
  };
  if (reviews.averageScore) {
    webJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.averageScore.toString().slice(0, 3),
      reviewCount: reviews.total,
    }
  }
  script.id = "json_ld";
  script.type = "application/ld+json";
  script.text = JSON.stringify(webJsonLd);
  document.querySelector("head").appendChild(script);
}

export default GoodsDetail


{/* <MsgPrompt
        leftrender={
          <LazyLoad
            src={data?.featuredImage?.src}
            width={60}
            height={
              60 * (data?.featuredImage?.height / data?.featuredImage?.width)
            }
          />
        }
        title="Changes Saved"
        load={loadMsg}
        closeLoad={() => dispatch({ type: "setLoadMsg", data: false })}
      /> */}
