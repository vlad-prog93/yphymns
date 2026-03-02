import style from './Menu.module.css'
import MenuItem from "../MenuItem/MenuItem"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { menuSlice } from "@redux/reducers/menu/MenuSlice"
import { Path_of_Routes } from "@utils/routes"

const Menu = () => {
  const { isMenuActive } = useAppSelector(state => state.menu)
  const dispatch = useAppDispatch()

  function hideMenu() {
    dispatch(menuSlice.actions.toogleMenuActive(false))
  }

  return (
    <div className={`${style.menu} ${isMenuActive ? style.menu_active : ''}`} onClick={hideMenu}>
      <div className={style.menu__content}>
        <ul className={style.menu__list}>
          <MenuItem link={Path_of_Routes.slash} text='Поиск' />
          <MenuItem link={Path_of_Routes.favoriteHymns} text='Избранные гимны' />
          <MenuItem link={Path_of_Routes.contentHymns} text='Содержание' />
          <MenuItem link={Path_of_Routes.contentCollections} text='Сборники' />
          <MenuItem link={Path_of_Routes.historyHymns} text='История' />
          <MenuItem link={Path_of_Routes.settings} text='Настройки' />
          <MenuItem link={Path_of_Routes.admin} text='Админ' />
        </ul>
      </div>
    </div>
  )
}

export default Menu
