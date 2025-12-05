import { useNavigate } from "react-router-dom"

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

function Header() {
  const { currentHymn, isTextWithAccord } = useAppSelector(state => state.hymn)
  const { isModalTransposeActive } = useAppSelector(state => state.accords)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const toggleFavoriteHymn = (): void | null => {
    if (!currentHymn) {
      return null
    }
  }

  const returnToSearch = () => {
    navigate('/')
  }

  const isCurrentHymnFavorite = (): boolean => {
    return true
    // if (!currentHymn) {
    //   return false
    // }
    // return !!favoriteHymns.find(hymn => hymn._id === currentHymn._id)
  }

  return (
    <header className={style.header}>
      <nav className={style.header__nav}>
        <ul className={style.header__list}>
          <li className={style.header__item}><Burger /></li>
          <li className={style.header__item}><span>{currentHymn ? <Link className={style.header__link} to={Path_of_Routes.hymn(currentHymn._id)}>Гимн {currentHymn.number}</Link> : 'Гимны'}</span></li>
        </ul>
        {currentHymn &&
          <ul className={style.header__list}>
            {isTextWithAccord &&
              <li className={`${style.header__item} ${style.header__itemCheckbox}`}>
                <input
                  className={style.header__itemInput}
                  defaultChecked={isModalTransposeActive}
                  type="checkbox"
                  onChange={() => dispatch(accordsSlice.actions.toggleModalTranspose())} />
                <span className={`${style.header__itemSpan} ${style.header__itemSpanTranspose}`} />
                {currentHymn && isModalTransposeActive && isTextWithAccord && <Transposes />}

              </li>}
            <li className={style.header__item}>
              <button
                className={`${style.header__button} ${isCurrentHymnFavorite() ? style.header__buttonFavorite_active : style.header__buttonFavorite}`}
                onClick={toggleFavoriteHymn} />
            </li>
            <li className={style.header__item}>
              <button
                className={`${style.header__button} ${style.header__buttonSearch}`}
                onClick={returnToSearch} />
            </li>
            <li className={`${style.header__item} ${style.header__itemCheckbox}`}>
              <input
                className={style.header__itemInput}
                defaultChecked={isTextWithAccord}
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