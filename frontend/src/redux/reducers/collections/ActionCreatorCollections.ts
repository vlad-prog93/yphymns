import { createAsyncThunk } from "@reduxjs/toolkit"

import { ICollection } from "@models/collection"
import { api, URL_RES } from "@utils/api"
import { LSCollections } from "@tools/storage"


export const toGetAllCols = createAsyncThunk(
  "collections/toGetAllCols",
  async () => {
    const { data } = await api.get<ICollection[]>(URL_RES.COLLECTIONS.GET_ALL)
    LSCollections.setList(data)
    return data
  })

export const toGetOneCol = createAsyncThunk(
  "collections/toGetOneCol",
  async (id: string) => {
    const { data } = await api.get<ICollection>(`${URL_RES.COLLECTIONS.GET_ONE}${id}`)
    return data
  })


export const toCreateCol = createAsyncThunk(
  "collections/toCreateCol",
  async (name: string) => {
    const { data } = await api.post<ICollection>(URL_RES.COLLECTIONS.CREATE, { name })
    return data
  })

export const toEditOneCol = createAsyncThunk(
  "collections/toEditOneCol",
  async (collection: ICollection) => {
    const { data } = await api.patch<ICollection>(`${URL_RES.COLLECTIONS.EDIT_ONE}/${collection._id}`, { ...collection })
    return data
  })

export const toDeleteAllCols = createAsyncThunk(
  "collections/toDeleteAllCols",
  async () => {
    await api.delete<string>(URL_RES.COLLECTIONS.DELETE_ALL)
    return true
  })


export const toDeleteOneCol = createAsyncThunk(
  "collections/toDeleteOneCol",
  async (id: string) => {
    const { data } = await api.delete<ICollection>(`${URL_RES.COLLECTIONS.DELETE_ONE}/${id}`)
    return data
  })


// export const toPullDataCols = async () => {
//   // В бекенде пока что не реализовано
//   return
// }

// export const toPushDataCols = async (file: File) => {
//   // В бекенде пока что не реализовано
//   return
// }
