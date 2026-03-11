import { Link } from 'react-router-dom'
import style from './HymnList.module.css'
import { IHymn } from '../model/hymns'
import { Path_of_Routes } from '@utils/routes'

interface IHymnListProps {
  hymns: IHymn[]
  collections: Map<string, string>
}

const HymnList = ({ hymns, collections }: IHymnListProps) => {
  return (
    <ul className={style.hymnList__list}>
      <li className={style.hymnList__header}>
        <span className={style.hymnList__headerItem}>Сборник</span>
        <span className={style.hymnList__headerItem}>Название</span>
        <span className={style.hymnList__headerItem}>№</span>
      </li>

      {hymns.map(hymn => (
        <li key={hymn._id} className={style.hymnList__item}>
          <Link
            to={Path_of_Routes.hymn(hymn._id)}
            className={style.hymnList__link}
          >
            <span className={style.hymnList__itemCollection}>
              {collections.get(hymn.collection) || hymn.collection}
            </span>
            <span className={style.hymnList__itemTitle}>{hymn.title}</span>
            <span className={style.hymnList__itemNumber}>{hymn.number}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default HymnList
