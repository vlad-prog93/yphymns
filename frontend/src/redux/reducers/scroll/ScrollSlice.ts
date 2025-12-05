import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  isShowAutoScroll: boolean
  isScroll: boolean
}

const initialState: ScrollState = {
  isShowAutoScroll: false,
  isScroll: false
}

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setAutoScroll(state, action: PayloadAction<boolean>) {
      state.isShowAutoScroll = action.payload
    },

    toggleAutoScroll(state) {
      state.isShowAutoScroll = !state.isShowAutoScroll
    },

    onScroll(state) {
      state.isScroll = true
    },

    offScroll(state) {
      state.isScroll = false
    }
  }
})

export default scrollSlice.reducer