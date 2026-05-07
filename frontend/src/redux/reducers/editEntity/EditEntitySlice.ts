import { createSlice } from "@reduxjs/toolkit";
import { IHymn } from "@features/hymns/model/hymns";
import { isFulfilledAction, isPendingAction, isRejectedAction, setFulfilled, setPending, setRejected } from "@utils/redux";
import { toApproveEdit, toGetAllEdits, toRejectEdit } from "@redux/reducers/editEntity/ActionCreatorEditEntity";
import { ICollection } from "@features/collections/model/collection";



export interface IEntityEdit {
  _id: string,
  type: 'update' | 'create' | 'delete'
  entityType: 'hymn' | 'collection'
  entityId?: string
  data: IHymn | ICollection,
  status: 'pending' | 'approved' | 'rejected',
  proposedBy: string
}

interface State {
  edits: IEntityEdit[]
  isLoading: boolean
  error: string | null
}

const initialState: State = {
  edits: [],
  isLoading: false,
  error: null
}

export const editEntitySlice = createSlice({
  name: 'editEntyti',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(toGetAllEdits.fulfilled, (state, action) => {
        state.edits = action.payload
      })
      .addCase(toApproveEdit.fulfilled, (state, action) => {
        state.edits = state.edits.filter(e => e.entityId !== action.payload._id)
      })
      .addCase(toRejectEdit.fulfilled, (state, action) => {
        state.edits = state.edits.filter(e => e.entityId !== action.payload._id)
      })
      .addMatcher(isPendingAction, setPending)
      .addMatcher(isRejectedAction, setRejected)
      .addMatcher(isFulfilledAction, setFulfilled)
  }

})

export default editEntitySlice.reducer