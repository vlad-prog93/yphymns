import { createSlice } from "@reduxjs/toolkit";
import { IHymnText } from "@features/hymns/model/hymns";
import { isFulfilledAction, isPendingAction, isRejectedAction, setFulfilled, setPending, setRejected } from "@utils/redux";
import { toApproveEdit, toGetAllEdits, toRejectEdit } from "@redux/reducers/editHymns/ActionCreatorEditHymns";



export interface IHymnEdit {
  type: 'update' | 'create' | 'delete'
  hymnId: string,
  data: {
    _id: string
    collection: string
    number: number
    title: string
    text: IHymnText
  },
  status: 'pending' | 'approved' | 'rejected',
  proposedBy: string
}

interface State {
  edits: IHymnEdit[]
  isLoading: boolean
  error: string | null
}

const initialState: State = {
  edits: [],
  isLoading: false,
  error: null
}

export const editHymnsSlice = createSlice({
  name: 'editHymns',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(toGetAllEdits.fulfilled, (state, action) => {
        state.edits = action.payload
      })
      .addCase(toApproveEdit.fulfilled, (state, action) => {
        state.edits = state.edits.filter(e => e.hymnId !== action.payload._id)
      })
      .addCase(toRejectEdit.fulfilled, (state, action) => {
        state.edits = state.edits.filter(e => e.hymnId !== action.payload._id)
      })
      .addMatcher(isPendingAction, setPending)
      .addMatcher(isRejectedAction, setRejected)
      .addMatcher(isFulfilledAction, setFulfilled)
  }

})

export default editHymnsSlice.reducer