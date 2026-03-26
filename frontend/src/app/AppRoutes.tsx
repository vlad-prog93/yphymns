import { Navigate, Route, Routes } from "react-router-dom"
import { Path_of_Routes } from "@utils/routes"

import Search from "@pages/Search/Search"
import Hymn from "@pages/Hymn/Hymn"
import Settings from "@pages/Settings/Setting"
import Admin from "@pages/Admin/Admin"
import EditHymn from "@pages/EditHymn/EditHymn"
import NewHymn from "@pages/NewHymn/NewHymn"
import SearchedHymns from "@pages/SearchedHymns/SearchedHymns"
import FavoriteHymns from "@pages/FavoriteHymns/FavoriteHymns"
import ContentHymns from "@pages/ContentHymns/ContentHymns"
import HistoryHymns from "@pages/HistoryHymns/HistoryHymns"
import ContentCollections from "@pages/ContentCollections/ContentCollections"
import Editor from "@pages/Editor/Editor"
import SignUp from "@pages/SignUp/SignUp"
import SignIn from "@pages/SignIn/SignIn"
import CompareHymn from "@pages/CompareHymn/CompareHymn"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={''} element={<Search />} />
      <Route path={Path_of_Routes.home} element={<Search />} />
      <Route path={Path_of_Routes.searhedHymns} element={<SearchedHymns />} />
      <Route path={Path_of_Routes.favoriteHymns} element={<FavoriteHymns />} />
      <Route path={Path_of_Routes.contentHymns} element={<ContentHymns />} />
      <Route path={Path_of_Routes.historyHymns} element={<HistoryHymns />} />
      <Route path={Path_of_Routes.contentCollections} element={<ContentCollections />} />
      <Route path={Path_of_Routes.hymn()} element={<Hymn />} />
      <Route path={Path_of_Routes.settings} element={<Settings />} />
      <Route path={Path_of_Routes.admin} element={<Admin />} />
      <Route path={Path_of_Routes.compareHymn()} element={<CompareHymn />} />
      <Route path={Path_of_Routes.editHymn()} element={<EditHymn />} />
      <Route path={Path_of_Routes.newHymn} element={<NewHymn />} />
      <Route path={Path_of_Routes.editor} element={<Editor />} />
      <Route path={Path_of_Routes.signUp} element={<SignUp />} />
      <Route path={Path_of_Routes.signIn} element={<SignIn />} />
      <Route path="*" element={<Navigate to="" replace />}
      />
    </Routes>
  )
}

export default AppRoutes