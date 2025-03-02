import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// стили
import style from './hymnList.module.css'

//redux
import { useAppDispatch } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'

// models
import { IHymn } from '../../models/hymns'

// utils
import { ROUTES } from '../../utils/routes'


interface IHymnListProps {
  isLoading: boolean,
  list: IHymn[],
  title: string
}

const HymnList = ({ list, isLoading, title }: IHymnListProps) => {

  const [selectSort, setSelectSort] = useState<string>('номер')

  const dispatch = useAppDispatch()

  return (
    <div className={style.hymnList}>
      <h2 className={style.hymnList__title}>{title}</h2>
      {isLoading
        ?
        'Идет загрузка...'
        :
        <div>
          <label className={style.hymnList__selectTitle}>Сортировать по:
            <select
              value={selectSort}
              className={style.hymnList__select}
              name='selectSort'
              onChange={e => setSelectSort(e.target.value)}>
              <option value="номер">номер</option>
              <option value="название">название</option>
              <option value="сборник">сборник</option>
            </select>
          </label>

          <ul className={style.hymnList__list}>
            {list.toSorted((a, b) => {
              if (selectSort === 'номер') {
                return a.number - b.number
              }
              if (selectSort === 'название') {
                return a.shortText.localeCompare(b.shortText)
              }
              if (selectSort === 'сборник') {
                return a.collection.localeCompare(b.collection)
              }
              return -1
            }).map(hymn => {
              return <li key={hymn._id} className={style.hymnList__Item}>
                <Link className={style.hymnList__link} onClick={() => dispatch(hymnsSlice.actions.setCurrentHymn(hymn))} to={ROUTES.home + ROUTES.hymns + '/' + hymn._id}>
                  <span>{hymn.collection}:</span><span>{hymn.shortText}</span><span>{hymn.number}</span>
                </Link>
              </li>
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default HymnList