import IconFont from '@/components/common/IconFont'

function RenderScore({data}) {
  const renderScore = () => {
    let imgs = []
    for (let i = 0; i < Number(data); i++) {
      imgs.push(i)
    }
    return imgs.map(item => (<IconFont type="icon-follow" key={item} />))
  }
  return (
    <>
      {renderScore()}
    </>
  )
}

export default RenderScore