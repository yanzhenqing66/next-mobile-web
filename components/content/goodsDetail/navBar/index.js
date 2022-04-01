import { useContext, memo } from 'react'
import { Space } from 'antd-mobile'
import { ProductContext } from '../module'
import { ShopbagOutline, LeftOutline } from 'antd-mobile-icons'
import TopHead from '@/components/common/topHead'
import Share from '@/components/common/share'
import styled from '@emotion/styled'
import rem from '@/utils/rem'

function NavBar({ type }) {
  const { resolvedUrl, goBack, router, data, activeHeader } = useContext(ProductContext)

  const Nav = styled.div`
    .top {
      position: fixed;
      top: 0;
      max-width: 500px;
      width: 100%;
      height: 48px;
      background-color: #fff;
      opacity: ${activeHeader ? 1 : 0};
      z-index: ${activeHeader ? '9' : '-9'};
      transition: opacity 0.3s;
    }
    
    .bot {
      position: absolute;
      width: 100%;
      top: ${rem(50)};
      z-index: 10;
    }
  `

  const Btn = styled.div`
    .bgc {
      background-color: rgba(255, 255, 255, 0.9);
      margin-left: ${rem(5)};
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `

  return (
    <Nav>
      <div className={type ? 'top' : 'bot'}>
        <TopHead
          left={
            <Btn>
              <div className={type ? '' : 'bgc'}>
                <LeftOutline fontSize={22} onClick={goBack} />
              </div>
            </Btn>
          }
          center={type ? data.title : null}
          right={
            <Space align='center' style={{ '--gap-horizontal': rem(20) }}>
              <Btn>
                <div className={type ? '' : 'bgc'} onClick={() => router.push('/cart')}>
                  <ShopbagOutline fontSize={22} />
                </div>
              </Btn>
              <Btn>
                <div className={type ? '' : 'bgc'}>
                  <Share url={resolvedUrl} />
                </div>
              </Btn>
            </Space>
          }
        />
      </div>
    </Nav>
  )
}

export default memo(NavBar)
