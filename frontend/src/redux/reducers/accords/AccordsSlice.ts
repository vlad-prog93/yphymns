import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccordsState {
    currentAccords: string[] | null,
    isModalActive: boolean,
    isShowAccords: boolean,
    isModalTransposeActive: boolean,
}

const initialState: AccordsState = {
    currentAccords: null,
    isModalActive: false,
    isShowAccords: false,
    isModalTransposeActive: false,
}

export const accordsSlice = createSlice({
    name: 'accords',
    initialState,
    reducers: {
        setModalActive(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload
        },
        toggleModalActive(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload
        },
        setCurrentAccords(state, action: PayloadAction<string[]>) {
            state.currentAccords = action.payload
        },
        clearCurrentAccords(state) {
            state.currentAccords = null
        },
        setShowAccord(state, action: PayloadAction<boolean>) {
            state.isShowAccords = action.payload
        },
        toggleShowAccord(state) {
            state.isShowAccords = !state.isShowAccords
        },
        setModalTranspose(state, action: PayloadAction<boolean>) {
            state.isModalTransposeActive = action.payload
        },
        toggleModalTranspose(state) {
            state.isModalTransposeActive = !state.isModalTransposeActive
        },

    }
})

export default accordsSlice.reducer