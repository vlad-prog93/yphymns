import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccordsState {
    currentAccords: string[] | null,
    isModalActive: boolean,
    isShowAccords: boolean,
    isModalTransposeActive: boolean,
    lvlTranspose: number,
    isRepeatAccords: boolean,
}

const initialState: AccordsState = {
    currentAccords: null,
    isModalActive: false,
    isShowAccords: false,
    isModalTransposeActive: false,
    lvlTranspose: 0,
    isRepeatAccords: false
}

export const accordsSlice = createSlice({
    name: 'accords',
    initialState,
    reducers: {
        // модальное окно с аккордами (возможно это не нужно)
        setModalActive(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload
        },
        toggleModalActive(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload
        },

        // показать окно с аккордами 
        setCurrentAccords(state, action: PayloadAction<string[]>) {
            state.isModalActive = true
            state.currentAccords = action.payload
        },
        clearCurrentAccords(state) {
            state.isModalActive = false
            state.currentAccords = null
        },

        // показать аккорды/скрыть аккорды в тексте
        setShowAccord(state, action: PayloadAction<boolean>) {
            state.isShowAccords = action.payload
        },
        toggleShowAccord(state) {
            state.isShowAccords = !state.isShowAccords
        },

        // показать аккорды/скрыть аккорды в тексте
        setRepeatAccord(state, action: PayloadAction<boolean>) {
            state.isRepeatAccords = action.payload
        },
        toggleRepeatAccord(state) {
            state.isRepeatAccords = !state.isRepeatAccords
        },

        // окно с транспонированием
        setModalTranspose(state, action: PayloadAction<boolean>) {
            state.isModalTransposeActive = action.payload
        },
        toggleModalTranspose(state) {
            state.isModalTransposeActive = !state.isModalTransposeActive
        },

        // эффект кнопок транспонирования
        transposeUp(state) {
            state.lvlTranspose += 1
        },
        transposeDown(state) {
            state.lvlTranspose -= 1
        },
    }
})

export default accordsSlice.reducer