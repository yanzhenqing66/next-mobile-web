import { Button } from 'antd-mobile'
import { useDetailState } from '../module'
import rem from '@/utils/rem'

function BuyNow() {
  const { goBuy, data } = useDetailState()

  return (
    <div className='footer fixedBot plr20 bgf boxShadow flexBetween'>
      {
        data?.productSource ?
          <Button
            shape='rounded'
            block
            color='primary'
            className='btn'
            onClick={goBuy}
          >Buy Now</Button>
          :
          <Button
            shape='rounded'
            block
            color='primary'
            className='btn'
            onClick={goBuy}
          >Open App to Discover More</Button>
      }

      <style jsx>{`
        .footer {
          height: ${rem(50)};
        }

        .footer :global(.btn) {
          height: ${rem(37)};
        }
      `}</style>
    </div>
  )
}

export default BuyNow