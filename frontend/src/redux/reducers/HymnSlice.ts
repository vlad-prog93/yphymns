import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHistoryHymn, IHymn, IHymnText, ISearchForm } from "../../models/hymns";
import { LSFavoriteHymns, LSHistoryHymns } from "../../tools/storage";



interface HymnState {
  hymns: IHymn[],
  currentHymn: IHymn | null,
  favoriteHymns: string[],
  historyHymns: IHistoryHymn[],
  searchHymnsBy: ISearchForm,
  foundedHymns: IHymn[] | null,
  isTextWithAccord: boolean,
  isTranposeOpen: boolean,
  isLoading: boolean,
  error: null | string,
}

const initialState: HymnState = {
  hymns: [],
  currentHymn: null,
  favoriteHymns: [],
  historyHymns: [],
  searchHymnsBy: { number: 0, text: '' },
  foundedHymns: [],
  isTextWithAccord: false,
  isTranposeOpen: false,
  isLoading: false,
  error: null,
}

export const hymnsSlice = createSlice({
  name: 'hymn',
  initialState,
  reducers: {

    // запрос
    setLoading(state) {
      state.isLoading = true
    },

    //Запрос с ошибкой
    setError(state, action: PayloadAction<string | null>) {
      state.isLoading = false
      state.error = action.payload
    },

    setSuccess(state) {
      state.isLoading = false
      state.error = null
    },

    setHymns(state, action: PayloadAction<IHymn[]>) {
      state.hymns = [...action.payload.toSorted((a, b) => a.number - b.number)]
    },

    setCurrentHymn(state, action: PayloadAction<IHymn>) {
      state.currentHymn = action.payload
    },

    deleteCurrentHymn(state) {
      state.currentHymn = null
    },

    getFavoriteHymns(state) {
      state.favoriteHymns = LSFavoriteHymns.get()
    },

    setFavoriteHymn(state, action: PayloadAction<string>) {
      LSFavoriteHymns.set(action.payload)
      state.favoriteHymns.push(action.payload)
    },

    deleteFavoriteHymn(state, action: PayloadAction<string>) {
      LSFavoriteHymns.delete(action.payload)
      state.favoriteHymns = state.favoriteHymns.filter(id => id !== action.payload)
    },

    toggleFavoriteHymn(state, action: PayloadAction<string>) {
      const isFavoriteHymn = state.favoriteHymns.includes(action.payload)
      if (isFavoriteHymn) {
        LSFavoriteHymns.delete(action.payload)
        state.favoriteHymns = state.favoriteHymns.filter(id => id !== action.payload)
      } else {
        LSFavoriteHymns.set(action.payload)
        state.favoriteHymns.push(action.payload)
      }
    },

    //перелистывание гимнов
    prevHymn(state) {
      let index = 0
      if (state.currentHymn) {
        state.hymns.forEach((hymn, ind) => {
          if (hymn._id === state.currentHymn?._id) {
            index = ind
          }
        })
      }
      if (index === 0) {
        state.currentHymn = state.hymns[state.hymns.length - 1]
      } else {
        state.currentHymn = state.hymns[index - 1]
      }
    },

    nextHymn(state) {
      let index = 0
      if (state.currentHymn) {
        state.hymns.forEach((hymn, ind) => {
          if (hymn._id === state.currentHymn?._id) {
            index = ind
          }
        })
      }
      if (index === state.hymns.length - 1) {
        state.currentHymn = state.hymns[0]
      } else {
        state.currentHymn = state.hymns[index + 1]
      }
    },

    // транспонирование гимнов
    toggleTranposeMenu(state) {
      state.isTranposeOpen = !state.isTranposeOpen
    },

    transposeAccords(state, action: PayloadAction<IHymnText>) {
      if (state.currentHymn) {
        state.currentHymn.text = action.payload
      }
    },

    setShowHymns(state, action: PayloadAction<IHymn[]>) {
      state.foundedHymns = action.payload
    },

    getHistoryHymns(state) {
      const hymns = LSHistoryHymns.get()
      state.historyHymns = hymns.sort((a, b) => b.time - a.time)
    },

    setHistoryHymn(state, action: PayloadAction<IHistoryHymn>) {
      if (state.historyHymns.length === 5) {
        LSHistoryHymns.deleteLast()
        state.historyHymns = LSHistoryHymns.get()
      }
      state.historyHymns = state.historyHymns.filter(historyHymn => historyHymn._id !== action.payload._id)
      state.historyHymns.push(action.payload)
      LSHistoryHymns.set(action.payload)
    },

    deleteHymn(state, action: PayloadAction<string>) {
      state.hymns = state.hymns.filter(hymn => hymn._id !== action.payload)
    },

    editOneHymn(state, action: PayloadAction<IHymn>) {
      state.hymns = state.hymns.map(hymn => {
        if (hymn._id === action.payload._id) return action.payload
        return hymn
      })
    },

    createHymn(state, action: PayloadAction<IHymn>) {
      state.hymns.push(action.payload)
    },

    setSearchHymnsBy(state, action: PayloadAction<ISearchForm>) {
      state.searchHymnsBy = action.payload
    }
  }
})

export default hymnsSlice.reducer