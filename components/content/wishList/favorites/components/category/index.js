
import { useState } from 'react'
import style from './category.module.scss'

const cates = [
  {id: 0, cate: 'All'},
  {id: 1, cate: 'My favorite'},
  {id: 2, cate: 'Other favorites'}
]

function Category({getType}) {

  const [activeCate, setActiveCate] = useState(0)

  const cateClick = (id) => {
    setActiveCate(id)
    getType(id)
  }

  return (
    <ul className={style.category}>
      {
        cates.map(item => (
          <li 
            key={item.id}
            className={activeCate == item.id ? style.active : ''} 
            onClick={() => cateClick(item.id)}
          >
            {item.cate}
          </li>
        ))
      }
    </ul>
  )
}

export default Category