import { useRouter } from 'next/router'
import Link from 'next/link'
import { ErrorBlock, Button } from 'antd-mobile'
import style from './errorPage.module.scss'

function ErrorPage({statusCode}) {

  const router = useRouter()
  const tryAgain = () => {
    router.reload()
  }

  return (
    <div className={style.errorPage}>
      <ErrorBlock
        status='disconnected'
        image={'https://cndpoppyapps.oss-us-west-1.aliyuncs.com/poppy_h5/images/nologo.svg'}
        style={{
          '--image-height': `${87 / 75}rem`,
        }}
        title={<h2 className={style.title}>Whoops !</h2>}
        description={<p className={style.desc}>The page you're looking for doesn't exist ({statusCode}). Head back to the Homepage.
          <Link href='/'>
            <a className={style.continue}>Continue Shopping</a>
          </Link>
        </p>
        }
      >
        <Button
          shape='rounded'
          fill='outline'
          style={{ width: 130, height: 45 }}
          onClick={tryAgain}
        >Try Again</Button>
      </ErrorBlock>
    </div>
  )
}

export default ErrorPage