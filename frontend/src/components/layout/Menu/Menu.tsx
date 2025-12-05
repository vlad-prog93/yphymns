// стили
import style from './menu.module.css'

// компоненты 
import MenuItem from "../MenuItem/MenuItem";

// redux
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { menuSlice } from "@redux/reducers/menu/MenuSlice";

// utils
import { routes } from "@utils/routes";


const Menu = () => {
  const { isMenuActive } = useAppSelector(state => state.menu)
  const dispatch = useAppDispatch()

  function hideMenu(e: any) {
    dispatch(menuSlice.actions.toogleMenuActive(!isMenuActive))
  }

  return (
    <div id='container' className={isMenuActive ? style.menu + ' ' + style.menu_active : style.menu} onClick={hideMenu} >
      <div className={style.menu__contain}>
        <ul className={style.menu__list}>
          <MenuItem link={routes.home} text='Поиск' />
          <MenuItem link={routes.home + routes.favoriteHymns} text='Избранные гимны' />
          <MenuItem link={routes.home + routes.hymns} text='Содержание' />
          <MenuItem link={routes.home + routes.historyHymns} text='История' />
          <MenuItem link={routes.home + routes.settings} text='Настройки' />
          <MenuItem link={routes.home + routes.admin} text='Админ' />
        </ul>
      </div>
    </div>
  )
}

export default Menu
