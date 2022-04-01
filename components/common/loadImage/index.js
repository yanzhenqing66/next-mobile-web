import loading from '@/public/images/load.png'

const lazyImage = () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (img) {
        if (img.isIntersecting) {
          const { target } = img
          const { src } = target.dataset
          target.src = src
          target.classList.remove("lazy")
          lazyImageObserver.unobserve(target)
        }
      })
    })

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage)
    })
  }
}

const onload = () => {
  lazyImage()
}

const LazyImage = ({ src, width, height, style, alt, onClick, className }) => {
  return (
    <div className={className}>
      <img
        className='lazy'
        onLoad={onload}
        onError={e => {
          const { target } = e
          target.src = loading
        }}
        onMouseDown={e => {
          e.preventDefault()
        }}
        draggable="false"
        style={{
          objectFit: 'cover',
          ...style,
          width,
          height
        }}
        src={loading}
        data-src={src}
        alt={alt}
        onClick={onClick}
      />
    </div>
  )
}

LazyImage.defaultProps = {
  width: '100%',
  height: '100%',
  alt: 'null'
}

export default LazyImage


// const threshold = [0.01] // 触发时机

// const io = new IntersectionObserver(
//   entries => {
//     entries.forEach(ele => {
//       if (ele.intersectionRatio <= 0) return // intersectionRatio 可见度
//       const { target } = ele
//       const { load, src } = target.dataset
//       if (!load && src && target.src !== src) {
//         target.src = src
//         target.dataset.load = true
//       }
//     })
//   },
//   {
//     threshold
//   }
// )

// const onload = e => {
//   io.observe(e.target)
//   window.dispatchEvent(new Event('resize'))
// }