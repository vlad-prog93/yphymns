import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'

// стили
import './styles/index.css'

// компоненты 
import Search from './pages/Search/Search';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import HymnList from './pages/HymnList/HymnList';
import Hymn from './pages/Hymn/Hymn';
import Arrows from './components/Arrows/Arrows';
import Admin from './pages/Admin/Admin';
import EditHymn from './pages/EditHymn/EditHymn';

// redux
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { hymnsSlice } from './redux/reducers/HymnSlice'
import { toFetchHymns } from './redux/reducers/ActionCreator';

// context
import { contextSettingsFont, stateSettingsFont } from './context/settingsSize';

// utils
import { ROUTES } from './utils/routes';

// localStorage
import { getFavoriteHymnsLS, getSettingFontLS, setSettingFontLS } from './tools/storage';
import Settings from './pages/Settings/Setting';

// models
import { ISettingsFont } from './models/settingsFont'
import Popup from './components/Popup/Popup';
import ButtonScroll from './components/ButtonScroll/ButtonScroll';
import NewHymn from './pages/NewHymn/NewHymn';
import ModalAccords from './components/ModalAccords/ModalAccords';

function App() {
  const [refView, inView] = useInView({ rootMargin: '0px 0px' })

  const { hymns, isLoading, error, favoriteHymns, foundedHymns, currentHymn, historyHymns, isShowAutoScroll } = useAppSelector(state => state.hymnReducer)
  const { isModalActive } = useAppSelector(state => state.accordsReducer)
  const dispatch = useAppDispatch()

  const [settingsFont, setSettingsFont] = useState<ISettingsFont>(getSettingFontLS() || stateSettingsFont)

  useEffect(() => {
    toFetchHymns(dispatch)
    dispatch(hymnsSlice.actions.setFavoriteHymnsList(getFavoriteHymnsLS()))
    dispatch(hymnsSlice.actions.getHistoryHymns())
  }, [hymns.length])

  return (
    <contextSettingsFont.Provider value={{ ...settingsFont, setSettingsFont }}>

      <BrowserRouter>
        {error && <Popup />}
        <Menu />
        <Header />
        {isModalActive && <ModalAccords />}
        <div className='App' >
          <div className='App__header'>
            {isShowAutoScroll && <ButtonScroll alreadyBottom={inView} />}
          </div>
          <Routes>
            <Route path={ROUTES.home} element={<Search />} />
            <Route path={ROUTES.home + ROUTES.foundedHymns} element={<HymnList title='Найденные гимны' isLoading={isLoading} list={foundedHymns} />} />
            <Route path={ROUTES.home + ROUTES.favoriteHymns} element={<HymnList title='Избранные гимны' isLoading={isLoading} list={favoriteHymns} />} />
            <Route path={ROUTES.home + ROUTES.sortedHymns} element={<HymnList title='Содержание' isLoading={isLoading} list={hymns} />} />
            <Route path={ROUTES.home + ROUTES.history} element={<HymnList title='История' isLoading={isLoading} list={historyHymns} />} />
            <Route path={ROUTES.home + ROUTES.hymns + ROUTES.hymn} element={<Hymn />} />
            <Route path={ROUTES.home + ROUTES.settings} element={<Settings />} />
            <Route path={ROUTES.home + ROUTES.admin} element={<Admin />} />
            <Route path={ROUTES.home + ROUTES.admin + ROUTES.hymns + ROUTES.hymn} element={<EditHymn />} />
            <Route path={ROUTES.home + ROUTES.admin + ROUTES.hymns + ROUTES.newHymn} element={<NewHymn />} />
            <Route path="*" element={<Navigate to="" replace />}
            />
          </Routes>
          {currentHymn && <div style={{ height: '1px' }} ref={refView} />}
          <div className='App__footer'>
            {currentHymn && <Arrows />}
          </div>

        </div>
      </BrowserRouter>
    </contextSettingsFont.Provider>

  );

}

export default App;