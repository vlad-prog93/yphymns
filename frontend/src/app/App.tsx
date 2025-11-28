import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'

// стили
import './styles/index.css'

// компоненты 
import Search from '../pages/Search/Search';
import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';
import HymnList from '../pages/HymnList/HymnList';
import Hymn from '../pages/Hymn/Hymn';
import Arrows from '../components/Arrows/Arrows';
import Admin from '../pages/Admin/Admin';
import EditHymn from '../pages/EditHymn/EditHymn';
import Settings from '../pages/Settings/Setting';

// redux
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { hymnsSlice } from '../redux/reducers/HymnSlice'

// context
import { contextSettingsFont, stateSettingsFont } from '../context/settingsSize';

// utils
import { ROUTES } from '../utils/routes';

// localStorage
import { LSSettingsFont } from '../tools/storage';

// models
import { ISettingsFont } from '../models/settingsFont'
import PopupError from '../components/PopupError/PopupError';
import ButtonScroll from '../features/scroll/ButtonScroll/ButtonScroll';
import NewHymn from '../pages/NewHymn/NewHymn';
import ModalAccords from '../components/ModalAccords/ModalAccords';
import { ModalCreateCollection } from '../features/collections/ModalCreateCollection/ModalCreateCollection';
import { toGetAllHymns } from '../redux/reducers/ActionCreatorHymns';
import { toGetAllCols } from '../redux/reducers/ActionCreatorCollections';
import AppRoutes from './AppRoutes';
import AppLayout from './AppLayout';
import AppProviders from './AppProviders';



function App() {
  const [refView, inView] = useInView({ rootMargin: '0px 0px' })

  const { hymnReducer } = useAppSelector(state => state)
  const { collectionsReducer } = useAppSelector(state => state)
  const { isModalActive } = useAppSelector(state => state.accordsReducer)
  const { scrollReducer } = useAppSelector(state => state)

  const dispatch = useAppDispatch()

  const [settingsFont, setSettingsFont] = useState<ISettingsFont>(LSSettingsFont.get() || stateSettingsFont)
  const contextValue = useMemo(() => ({
    settingsFont,
    setSettingsFont
  }), [settingsFont])


  useEffect(() => {
    toGetAllHymns(dispatch)
    toGetAllCols(dispatch)

    dispatch(hymnsSlice.actions.getFavoriteHymns())
    dispatch(hymnsSlice.actions.getHistoryHymns())
  }, [dispatch])

  return (
    <AppProviders>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppProviders>

  );

}

export default App;