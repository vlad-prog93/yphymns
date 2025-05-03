import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccordsState {
    currentAccords: string[] | null,
    isModalActive: boolean,
}

const initialState: AccordsState = {
    currentAccords: null,
    isModalActive: false,
}

export const accordsSlice = createSlice({
    name: 'accords',
    initialState,
    reducers: {
        toogleModalActive(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload
        },
        setCurrentAccords(state, action: PayloadAction<string[]>) {
            state.currentAccords = action.payload
        },
        deleteCurrentAccords(state) {
            state.currentAccords = null
        }

    }
})

export default accordsSlice.reducer