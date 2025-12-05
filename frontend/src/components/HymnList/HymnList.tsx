import { Link } from 'react-router-dom'

// стили
import style from './hymnList.module.css'

// models
import { IHymn } from '../../models/hymns'
import { Path_of_Routes } from '@utils/routes'


interface IHymnListProps {
  hymns: IHymn[],
  collections: any
}

const HymnList = ({ hymns, collections }: IHymnListProps) => {

  return (
    <ul className={style.hymnList__list}>
      {
        <li className={style.hymnList__Item}>
          <div className={style.hymnList__Item_head}>
            <span>Сборник</span>
            <span>Название</span>
            <span>№</span>
          </div>
        </li>
      }
      {
        hymns.map(hymn => {
          return <li key={hymn._id} className={style.hymnList__Item}>
            <Link
              className={style.hymnList__link}
              to={Path_of_Routes.hymn(hymn._id)}
            >
              <span>
                {collections.get(hymn.collection) || hymn.collection}:
              </span>
              <span>
                {hymn.title}
              </span>
              <span>
                {hymn.number}
              </span>
            </Link>
          </li>
        })
      }
    </ul>
  )
}

export default HymnList