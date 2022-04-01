import { memo } from 'react'
import Head from 'next/head'

function Header({ title, desc, keywords, amount, currency, image, children }) {

  return (
    <Head>
      <title>{title?.slice(0, 70)}</title>
      <meta name="description" content={desc?.slice(0, 320)} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content="product" />
      <meta property="og:title" content={title?.slice(0, 70)} />
      <meta
        property="og:description"
        content={desc?.slice(0, 320)}
      />
      {
        image ? <meta property="og:image" content={image} /> : null
      }
      <meta property="og:site_name" content="Poppy Shopping" />
      <meta property="product:price:amount" content={amount} />
      <meta property="product:price:currency" content={currency} />
      <meta property="og:availability" content="instock" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title?.slice(0, 70)} />
      <meta name="twitter:description" content={desc?.slice(0, 320)} />
      {
        image ? <meta name="twitter:image" content={image} /> : null
      }
      {children}
    </Head>
  )
}

Header.defaultProps = {
  title: 'Poppy Shopping | Discover fashion and lifestyle on the go',
  desc: 'Poppy: inspirational shopping for fashion and lifestyle. Find and create the perfect wishlist for you from over 100 million items including Fashion, Home Decor, Men Fashion, Jewelry, Beauty, Accessories, Homewear, Sports, Bags, Wedding, Shoes, Maternity, Hair, Garden, Watches, Furniture, Gadgets, Food, Virtual, Toys',
  keywords: 'Poppy poppyapps.com, wishlist, Online Shopping, Fashion, Home Decor, Men Fashion, Jewelry, Beauty, Accessories, Homewear, Sports, Bags, Wedding, Shoes, Maternity, Hair, Garden, Watches, Furniture, Gadgets, Food, Virtual, Toys',
  amount: '',
  currency: 'USD',
  image: ''
}

export default memo(Header)