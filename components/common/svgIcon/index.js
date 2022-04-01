import { ReactSVG } from 'react-svg'

function SvgIcon ({ src, className, wrapper, onClick }) {
  return (
    <ReactSVG src={src} wrapper={wrapper} className={className} onClick={onClick} />
  )
}

SvgIcon.defaultProps = {
  wrapper: 'span'
}

export default SvgIcon
