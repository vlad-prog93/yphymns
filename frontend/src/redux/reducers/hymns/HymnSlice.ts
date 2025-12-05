import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHistoryHymn, IHymn, ISearchForm } from "@models/hymns";
import { getHistoryHymn, setHistoryHymn, toCreateHymn, toDeleteAllHymns, toDeleteOneHymn, toEditOneHymn, toGetAllHymns, toGetOneHymn, toggleFavoriteHymn } from "@redux/reducers/hymns/ActionCreatorHymns";
import { isFulfilledAction, isPendingAction, isRejectedAction, setFulfilled, setPending, setRejected } from "@utils/redux";



interface IHymnState {
  hymns: IHymn[],
  currentHymn: IHymn | null,
  favoriteHymns: string[],
  historyHymns: IHistoryHymn[],
  searchHymnsBy: ISearchForm,
  isTextWithAccord: boolean,
  isLoading: boolean,
  error: null | string,
}

const initialState: IHymnState = {
  hymns: [],
  currentHymn: null,
  favoriteHymns: [],
  historyHymns: [],
  searchHymnsBy: { number: null, text: '' },
  isTextWithAccord: false,
  isLoading: false,
  error: null,
}

export const hymnsSlice = createSlice({
  name: 'hymn',
  initialState,
  reducers: {
    setSearchHymnsBy(state, action: PayloadAction<ISearchForm>) {
      state.searchHymnsBy = action.payload
    },
    clearSearchHymnsBy(state) {
      state.searchHymnsBy = { number: null, text: '' }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(toGetAllHymns.fulfilled, (state, action) => {
        console.log('im here')
        state.hymns = action.payload.sort((a, b) => a.number - b.number)
      })
      .addCase(toCreateHymn.fulfilled, (state, action) => {
        state.hymns = [...state.hymns, action.payload]
      })
      .addCase(toDeleteAllHymns.fulfilled, (state) => {
        state.hymns = []
      })
      .addCase(toGetOneHymn.fulfilled, (state, action) => {
        state.currentHymn = action.payload
      })
      .addCase(toDeleteOneHymn.fulfilled, (state, action) => {
        state.hymns = state.hymns.filter(hymn => hymn._id !== action.payload)
      })
      .addCase(toEditOneHymn.fulfilled, (state, action) => {
        state.hymns = state.hymns.map((hymn: IHymn) => {
          if (hymn._id === action.payload._id) return action.payload
          return hymn
        })
      })
      .addCase(toggleFavoriteHymn.fulfilled, (state, action) => {
        state.favoriteHymns = action.payload
      })
      .addCase(setHistoryHymn.fulfilled, (state, action) => {
        state.historyHymns = action.payload
      })
      .addCase(getHistoryHymn.fulfilled, (state, action) => {
        state.historyHymns = action.payload
      })
      .addCase(getHistoryHymn.rejected, setRejected)
      .addMatcher(isPendingAction, setPending)
      .addMatcher(isRejectedAction, setRejected)
      .addMatcher(isFulfilledAction, setFulfilled)
  }

})

export default hymnsSlice.reducer