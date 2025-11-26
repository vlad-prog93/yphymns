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

export const CollectionSlice = createSlice({
  'name': 'collection',
  initialState,
  reducers: {
    fetching(state) {
      state.isLoading = true
    },

    fetchingSuccess(state, action: PayloadAction<ICollection[]>) {
      state.collections = action.payload
      state.isLoading = false
      state.error = ''
    },

    fetchingError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.isLoading = false
    },

    createSuccess(state, action: PayloadAction<ICollection>) {
      state.collections.push(action.payload)
      state.isModalShow = false
      state.error = ''
    },

    createError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },

    deleteSuccess(state, action: PayloadAction<string>) {
      state.collections.filter(el => el._id !== action.payload)
      state.error = ''
    },

    deleteError(state, action: PayloadAction<string>) {
      state.error = action.payload
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

    updateSuccess(state, action: PayloadAction<ICollection>) {
      state.collections = state.collections.map(col => {
        if (col._id === action.payload._id) {
          return action.payload
        }
        return col
      })
    }




  }

})

export default CollectionSlice.reducer