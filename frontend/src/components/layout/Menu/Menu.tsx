import style from './Menu.module.css'
import MenuItem from "../MenuItem/MenuItem"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { menuSlice } from "@redux/reducers/menu/MenuSlice"
import { Path_of_Routes } from "@utils/routes"

const Menu = () => {
  const { isMenuActive } = useAppSelector(s => s.menu)
  const { user, isAuthenticated } = useAppSelector(s => s.user)
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
          <MenuItem link={Path_of_Routes.signUp} text='Регистрация' />
          <MenuItem link={Path_of_Routes.signIn} text='Вход' />
          {isAuthenticated && user?.role === 'admin' && <MenuItem link={Path_of_Routes.admin} text='Админ' />}
          {isAuthenticated && <MenuItem link={Path_of_Routes.editor} text='Редактирование' />}
        </ul>
      </div>
    </div>
  )
}

export default Menu
