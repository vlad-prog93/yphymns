import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ICollection } from "../../models/collection"

interface ICollectionState {
  collections: ICollection[],
  isLoading: boolean,
  error: null | string,
  isModalShow: boolean,
  currentCollection: null | ICollection

}


const initialState: ICollectionState = {
  collections: [],
  isLoading: false,
  error: null,
  isModalShow: false,
  currentCollection: null
}

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true
    },

    setSuccess(state) {
      state.isLoading = false
      state.error = null
    },

    setCollections(state, action: PayloadAction<ICollection[]>) {
      state.collections = action.payload
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.isLoading = false
    },

    create(state, action: PayloadAction<ICollection>) {
      state.collections.push(action.payload)
      state.isModalShow = false
    },

    deleteOne(state, action: PayloadAction<string>) {
      state.collections.filter(el => el._id !== action.payload)
    },

    deleteAll(state) {
      state.collections = []
    },

    showModal(state) {
      state.isModalShow = true
    },

    hideModal(state) {
      state.isModalShow = false
      state.currentCollection = null
    },

    setCurrentCollection(state, action: PayloadAction<ICollection | null>) {
      state.currentCollection = action.payload
    },

    editCollection(state, action: PayloadAction<ICollection>) {
      state.collections = state.collections.map(col => {
        if (col._id === action.payload._id) return action.payload
        return col
      })
    }
  }
})

export default collectionSlice.reducer