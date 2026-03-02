import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  isShowAutoScroll: boolean
  isScroll: boolean,
  speedScroll: number,
}

const initialState: ScrollState = {
  isShowAutoScroll: false,
  isScroll: false,
  speedScroll: 0,
}

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    openAutoScroll(state) {
      state.isShowAutoScroll = true
    },

    closeAutoScroll(state) {
      state.isShowAutoScroll = false
    },

    onScroll(state) {
      state.isScroll = true
    },

    offScroll(state) {
      state.isScroll = false
    },

    setSpeedScroll(state, action: PayloadAction<number>) {
      state.speedScroll = action.payload
    }
  }
})

export default scrollSlice.reducer