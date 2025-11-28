import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// стили
import style from './hymnList.module.css'

//redux
import { useAppDispatch } from '../../redux/hooks'
import { hymnsSlice } from '../../redux/reducers/HymnSlice'

// models
import { IHymn } from '../../models/hymns'

// utils
import { ROUTES } from '../../utils/routes'
import { useSelectHymns } from '../../hooks/useSelectHymns'


interface IHymnListProps {
  title: string
}

const HymnList = ({ title }: IHymnListProps) => {
  const location = useLocation()
  const hymns: IHymn[] = useSelectHymns(location.pathname)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [selectSort, setSelectSort] = useState<string>('номер')

  const sortedHymns = useMemo(() => {
    return [...hymns].sort((a, b) => {
      if (selectSort === 'номер') return a.number - b.number
      if (selectSort === 'название') return a.title.localeCompare(b.title)
      if (selectSort === 'сборник') return a.collection.localeCompare(b.collection)
      return 0
    })
  }, [hymns, selectSort])


  useEffect(() => {
    if (location.pathname !== ROUTES.foundedHymns) return

    if (!hymns.length) {
      dispatch(hymnsSlice.actions.setError('Гимн не найден'))
      navigate(ROUTES.home)
    }

    if (hymns.length === 1) {
      navigate(ROUTES.hymns + ROUTES.hymn + hymns[0]._id)
    }

  }, [hymns, location.pathname, dispatch, navigate])

  if (!hymns.length) {
    return (
      <div className={style.hymnList}>

        <h2 className={style.hymnList__title}>{title}</h2>
        <p className={style.hymnList__info}>Гимны не найдены</p>
      </div>
    )
  }
  return (
    <div className={style.hymnList}>
      <h2 className={style.hymnList__title}>{title}</h2>
      {location.pathname === ROUTES.sortedHymns &&
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
          sortedHymns.map(hymn => {
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


    </div>
  )
}

export default HymnList