import { Navigate, Route, Routes } from "react-router-dom"
import { ROUTES } from "../utils/routes"
import Search from "../pages/Search/Search"
import HymnList from "../pages/HymnList/HymnList"
import { Hymn } from "../pages/Hymn/Hymn"
import Settings from "../pages/Settings/Setting"
import Admin from "../pages/Admin/Admin"
import EditHymn from "../pages/EditHymn/EditHymn"
import NewHymn from "../pages/NewHymn/NewHymn"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<Search />} />
      <Route path={ROUTES.home + ROUTES.foundedHymns} element={<HymnList title='Найденные гимны' />} />
      <Route path={ROUTES.home + ROUTES.favoriteHymns} element={<HymnList title='Избранные гимны' />} />
      <Route path={ROUTES.home + ROUTES.sortedHymns} element={<HymnList title='Содержание' />} />
      <Route path={ROUTES.home + ROUTES.history} element={<HymnList title='История' />} />
      <Route path={ROUTES.home + ROUTES.hymns + ROUTES.hymn + ':id'} element={<Hymn />} />
      <Route path={ROUTES.home + ROUTES.settings} element={<Settings />} />
      <Route path={ROUTES.home + ROUTES.admin} element={<Admin />} />
      <Route path={ROUTES.home + ROUTES.admin + ROUTES.hymns + ROUTES.hymn + ':id'} element={<EditHymn />} />
      <Route path={ROUTES.home + ROUTES.admin + ROUTES.hymns + ROUTES.newHymn} element={<NewHymn />} />
      <Route path="*" element={<Navigate to="" replace />}
      />
    </Routes>
  )
}

export default AppRoutes