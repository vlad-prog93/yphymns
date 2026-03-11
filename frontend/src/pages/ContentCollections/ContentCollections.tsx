import { Path_of_Routes } from '@utils/routes'
import style from './ContentCollections.module.css'
import { useAppSelector } from '@redux/hooks'
import { Link } from 'react-router-dom'
import Title from '@components/UI/Title/Title'
import Details from '@components/UI/Details/Details'
import Summary from '@components/UI/Summary/Summary'

const ContentCollections = () => {
  const { hymns } = useAppSelector(s => s.hymn)
  const { collections } = useAppSelector(s => s.collections)

  return (
    <>
      <Title>Сборники</Title>

      {collections.map((collection) => {
        const hymnsInCollection = hymns.filter(h => h.collection === collection._id)
        return (
          <Details key={collection._id}>
            <Summary>
              {collection.name || `Сборник ${collection._id}`} — {hymnsInCollection.length} гимнов
            </Summary>
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
          </Details>
        )
      })}
    </>
  )
}

export default ContentCollections
