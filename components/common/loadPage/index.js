import { Loading } from 'antd-mobile'



function LoadPage({ fixed, top }) {

  const styles = (
    fixed ?
      {
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      } : ''
  )

  return (
    <div
      style={{
        width: `${350 / 75}rem`,
        margin: '0 auto',
        ...styles,
        paddingTop: top && !fixed ? top : '',
        textAlign: 'center',
        fontSize: 16,
        color: '#999'
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Loading style={{ fontSize: 24 }} color="#555" />
      </div>
      A wave of good things is coming
    </div>
  )
}

export default LoadPage