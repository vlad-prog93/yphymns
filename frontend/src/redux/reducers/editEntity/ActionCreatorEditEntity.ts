import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, URL_RES } from "@utils/api"


export const toGetAllEdits = createAsyncThunk(
  "hymnEdits/toGetAllEdits",
  async () => {
    const { data } = await api.get(URL_RES.EDIT_HYMNS.GET_All)
    return data
  }
)

export const toApproveEdit = createAsyncThunk(
  "hymnEdits/toApproveEdit",
  async (id: string) => {
    const { data } = await api.patch(URL_RES.EDIT_HYMNS.APPROVE(id))
    return data
  }
)

export const toRejectEdit = createAsyncThunk(
  "hymnEdits/toRejectEdit",
  async (id: string) => {
    const { data } = await api.patch(URL_RES.EDIT_HYMNS.REJECT(id))
    return data
  }
)