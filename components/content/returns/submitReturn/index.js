import { Button } from 'antd-mobile'
import style from './submitReturn.module.scss'

function SubmitReturn({ submitReturn }) {
  return (
    <footer className={style.container}>
      <Button color="primary" className={style.btn} onClick={submitReturn}>Submit</Button>
    </footer>
  )
}

export default SubmitReturn