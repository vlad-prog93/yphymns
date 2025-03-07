import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
  const location = useLocation()

  return (
    <div className={style.hymnList}>
      <h2 className={style.hymnList__title}>{title}</h2>
      {isLoading
        ?
        'Идет загрузка...'
        :
        <div>
          {
            location.pathname === ROUTES.sortedHymns
            &&
            list.length !== 0
            &&
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
          }

          <ul className={style.hymnList__list}>

            {list.length !== 0
              &&
              <li className={style.hymnList__Item}>
                <div className={style.hymnList__Item_head}>
                  <span>Сборник</span>
                  <span>Название</span>
                  <span>№</span>
                </div>
              </li>}

            {
              list.length !== 0
                ?
                list.toSorted((a, b) => {
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
                    <Link
                      className={style.hymnList__link}
                      onClick={() => dispatch(hymnsSlice.actions.setCurrentHymn(hymn))}
                      to={ROUTES.home + ROUTES.hymns + '/' + hymn._id}
                    >
                      <span>
                        {hymn.collection}:
                      </span>
                      <span>
                        {hymn.shortText}
                      </span>
                      <span>
                        {hymn.number}
                      </span>
                    </Link>
                  </li>
                })
                :
                <p className={style.hymnList__info}>Не найдено</p>
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default HymnList