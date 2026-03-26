import { configureStore } from '@reduxjs/toolkit'
import hymnReducer from '@redux/reducers/hymns/HymnSlice'
import menuReducer from '@redux/reducers/menu/MenuSlice'
import accordsReducer from '@redux/reducers/accords/AccordsSlice'
import collectionsReducer from '@redux/reducers/collections/CollectionSlice'
import scrollReducer from '@redux/reducers/scroll/ScrollSlice'
import userReducer from '@redux/reducers/users/UsersSlice'
import editHymnsReducer from '@redux/reducers/editHymns/EditHymnsSlice'

export const store = configureStore({
  reducer: {
    hymn: hymnReducer,
    menu: menuReducer,
    accords: accordsReducer,
    collections: collectionsReducer,
    scroll: scrollReducer,
    user: userReducer,
    editHymns: editHymnsReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch