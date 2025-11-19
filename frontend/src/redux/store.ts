import { configureStore } from '@reduxjs/toolkit'
import hymnReducer from './reducers/HymnSlice'
import menuReducer from './reducers/MenuSlice'
import accordsReducer from './reducers/AccordsSlice'

export const store = configureStore({
  reducer: {
    hymnReducer,
    menuReducer,
    accordsReducer,
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']