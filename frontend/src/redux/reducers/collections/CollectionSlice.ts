import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ICollection } from "@models/collection"
import { toCreateCol, toDeleteAllCols, toDeleteOneCol, toEditOneCol, toGetAllCols, toGetOneCol } from "@redux/reducers/collections/ActionCreatorCollections"
import { isFulfilledAction, isPendingAction, isRejectedAction, setFulfilled, setPending, setRejected } from "@utils/redux"

interface ICollectionState {
  collections: ICollection[],
  isLoading: boolean,
  error: null | string,
  isModalActive: boolean,
  currentCollection: null | ICollection
}


const initialState: ICollectionState = {
  collections: [],
  isLoading: false,
  error: null,
  isModalActive: false,
  currentCollection: null
}

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    showModal(state) {
      state.isModalActive = true
    },
    hideModal(state) {
      state.isModalActive = false
      state.currentCollection = null
    },
    setCurrentCollection(state, action: PayloadAction<ICollection | null>) {
      state.currentCollection = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(toGetAllCols.fulfilled, (state, action) => {
        state.collections = action.payload
      })
      .addCase(toGetOneCol.fulfilled, (state, action) => {
        state.currentCollection = action.payload
      })
      .addCase(toCreateCol.fulfilled, (state, action) => {
        state.isModalActive = false
        state.collections.push(action.payload)
      })
      .addCase(toEditOneCol.fulfilled, (state, action) => {
        state.collections = state.collections.map(col => {
          if (col._id === action.payload._id) return action.payload
          return col
        })
      })
      .addCase(toDeleteAllCols.fulfilled, (state) => {
        state.collections = []
      })
      .addCase(toDeleteOneCol.fulfilled, (state, action) => {
        state.collections = state.collections.filter(col => col._id !== action.payload)
      })
      .addMatcher(isPendingAction, setPending)
      .addMatcher(isRejectedAction, setRejected)
      .addMatcher(isFulfilledAction, setFulfilled)
  }
})

export default collectionSlice.reducer