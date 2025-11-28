import { createSlice } from "@reduxjs/toolkit";

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
    showAutoScroll(state) {
      state.isShowAutoScroll = true
    },

    hideAutoScroll(state) {
      state.isShowAutoScroll = false
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