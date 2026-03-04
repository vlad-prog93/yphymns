import { useLocation, useNavigate } from "react-router-dom"

// стили
import style from './Header.module.css'

// компоненты
import Burger from "@components/layout/Burger/Burger"
import Transposes from "@components/common/Transposes/Transposes"

// redux
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { accordsSlice } from "@redux/reducers/accords/AccordsSlice"

// models
import { Link } from "react-router-dom"

//components
import { Path_of_Routes } from "@utils/routes"
import { useGetHymn } from "@features/hymns/hooks/useGetHymn"
import { toggleFavoriteHymn } from "@redux/reducers/hymns/ActionCreatorHymns"

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { favoriteHymns } = useAppSelector(s => s.hymn)
  const { isModalTransposeActive } = useAppSelector(s => s.accords)
  const { isShowAccords } = useAppSelector(s => s.accords)
  const dispatch = useAppDispatch()
  const id = location.pathname.split("/")[3]
  const hymn = useGetHymn(id)

  const returnToSearch = () => {
    navigate('/')
  }

  const isCurrentHymnFavorite = (): boolean => {
    if (!hymn) return false
    return !!favoriteHymns.find(h => h === hymn._id)
  }

  return (
    <header className={style.header}>
      <nav className={style.header__nav}>
        <ul className={style.header__list}>
          <li className={style.header__item}>
            <Burger />
          </li>
          <li className={style.header__item}>
            <span>
              {hymn
                ?
                <Link className={style.header__link} to={Path_of_Routes.hymn(hymn._id)} >
                  Гимн №{hymn.number}
                </Link>
                :
                'Гимны'}
            </span>
          </li>
        </ul>
        {hymn &&
          <ul className={style.header__list}>
            {isShowAccords &&
              <li className={`${style.header__item} ${style.header__itemCheckbox}`}>
                <input
                  className={style.header__itemInput}
                  defaultChecked={isModalTransposeActive}
                  type="checkbox"
                  onChange={() => dispatch(accordsSlice.actions.toggleModalTranspose())} />
                <span className={`${style.header__itemSpan} ${style.header__itemSpanTranspose}`} />
                {/* {isModalTransposeActive && isShowAccords && <Transposes />} */}
              </li>}
            <li className={style.header__item}>
              <button
                className={`${style.header__button} ${isCurrentHymnFavorite() ? style.header__buttonFavorite_active : style.header__buttonFavorite}`}
                onClick={() => dispatch(toggleFavoriteHymn(hymn?._id))} />
            </li>
            <li className={style.header__item}>
              <button
                className={`${style.header__button} ${style.header__buttonSearch}`}
                onClick={returnToSearch} />
            </li>
            <li className={`${style.header__item} ${style.header__itemCheckbox}`}>
              <input
                className={style.header__itemInput}
                defaultChecked={isShowAccords}
                type="checkbox"
                onChange={() => dispatch(accordsSlice.actions.toggleShowAccord())} />
              <span className={`${style.header__itemSpan} ${style.header__itemSpanAccord}`} />
            </li>
          </ul>
        }
      </nav>
    </header >
  )
}

export default Header