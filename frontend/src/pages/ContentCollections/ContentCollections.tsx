import { Path_of_Routes } from '@utils/routes'
import style from './ContentCollections.module.css'
import { useAppSelector } from '@redux/hooks'
import { Link } from 'react-router-dom'

const ContentCollections = () => {
  const { hymns } = useAppSelector(s => s.hymn)
  const { collections } = useAppSelector(s => s.collections)

  return (
    <div className={style.collections}>
      <h2 className={style.collections__title}>Сборники</h2>

      {collections.map((collection) => {
        const hymnsInCollection = hymns.filter(h => h.collection === collection._id)
        return (
          <details key={collection._id} className={style.collections__details}>
            <summary className={style.collections__summary}>
              {collection.name || `Сборник ${collection._id}`} — {hymnsInCollection.length} гимнов
            </summary>
            <ul className={style.collections__list}>
              {hymnsInCollection.map(h => (
                <li key={h._id} className={style.collections__item}>
                  <Link className={style.collections__link} to={Path_of_Routes.hymn(h._id)}>
                    <span className={style.collections__itemTitle}>{h.title}</span>
                    <span className={style.collections__itemNumber}>{h.number}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        )
      })}
    </div>
  )
}

export default ContentCollections
