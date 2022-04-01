import { useRouter } from "next/router"
import { Button } from "antd-mobile"
import rem from "@/utils/rem"
import LazyLoad from "../lazyLoad"
import storeUtils from "@/utils/storageUtil"
import css from 'styled-jsx/css'

function GoLogin () {
  const router = useRouter()

  const goLogin = () => {
    storeUtils.setStore('redirect', router.asPath)
    router.push({ pathname: '/login', query: { redirect: router.asPath } })
  }

  return (
    <div>
      <LazyLoad 
        src='https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/brand.svg'
        width={rem(78)}
        height={rem(78)} 
      />
      <h3>Please log in</h3>
      <p>Log In to check your cart!</p>
      <Button 
        shape="rounded" 
        color="primary"
        onClick={goLogin}
      >Log in</Button>
      <style jsx>{goLoginCss}</style>
    </div>
  )
}

const goLoginCss = css`
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
    margin: ${rem(15)} 0;
  }

  p {
    font-size: ${rem(14)};
    font-weight: 400;
    margin-bottom: ${rem(15)};
  }
`

export default GoLogin