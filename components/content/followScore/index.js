import { memo } from 'react'
import { Rate } from 'antd-mobile'
import IconFont from '@/components/common/IconFont'
import rem from '@/utils/rem'

function FollowScore({ score, total }) {
  return (
    <div className='follow'>
      <Rate
        readOnly
        character={<IconFont type="icon-follow" />}
        allowHalf
        value={Number(score)}
        style={{
          '--star-size': rem(12)
        }}
        className='mr2'
      />
      <b className='f11'>{score} {' '}</b>
      <span>{total ? '(' + total + ')' : ''}</span>
      <style jsx>{`
        .follow {
          display: ${Number(score) > 0 ? 'block' : 'none'};
          // margin-top: ${rem(5)};
        }
      `}</style>
    </div>
  )
}

export default memo(FollowScore)
