import { createAsyncThunk } from "@reduxjs/toolkit"

import { IHistoryHymn, IHymn } from "@features/hymns/model/hymns"

import { api, URL_RES } from "@utils/api"
import { LSFavoriteHymns, LSHistoryHymns, LSHymns } from "@tools/storage"
import { IEntityEdit } from "@redux/reducers/editEntity/EditEntitySlice"

export const toGetAllHymns = createAsyncThunk(
  "hymns/toGetAllHymns",
  async () => {
    const { data } = await api.get<IHymn[]>(URL_RES.HYMNS.GET_ALL)
    LSHymns.setList(data)
    return data
  }
)
export const toGetOneHymn = createAsyncThunk(
  "hymns/toGetOneHymn",
  async (id: string) => {
    const { data } = await api.get<IHymn>(`${URL_RES.HYMNS.GET_ONE}/${id}`)
    LSHymns.set(data)
    return data
  }
)

export const toCreateHymn = createAsyncThunk(
  "hymns/toCreateHymn",
  async (hymn: Omit<IHymn, '_id'>) => {
    const { data } = await api.post<IHymn>(URL_RES.HYMNS.CREATE, hymn)
    return data
  }
)

export const toEditOneHymn = createAsyncThunk(
  "hymns/toEditOneHymn",
  async (hymn: Partial<IEntityEdit>) => {
    const { data } = await api.post<IHymn>(URL_RES.EDIT_HYMNS.EDIT_HYMN, hymn)
    return data
  }
)

export const toDeleteAllHymns = createAsyncThunk(
  "hymns/toDeleteAllHymns",
  async () => {
    const { data } = await api.delete<string>(URL_RES.HYMNS.DELETE_ALL)
    return data
  }
)

export const toDeleteOneHymn = createAsyncThunk(
  "hymns/toDeleteOneHymn",
  async (id: string) => {
    const { data } = await api.delete<IHymn>(`${URL_RES.HYMNS.DELETE_ONE}/${id}`)
    return data
  }
)

export const toPullDataHymns = createAsyncThunk(
  "hymns/toPullDataHymns",
  async () => {
    const { data } = await api.get<Blob>(URL_RES.HYMNS.PULL_DATA_BASE, { responseType: 'blob' })

    const url = URL.createObjectURL(data)
    const a = document.createElement('a')
    const date_for_name_file = new Date()

    a.href = url
    a.setAttribute('download', `${date_for_name_file.getFullYear()}_${date_for_name_file.getMonth()}_${date_for_name_file.getDate()}_yphymns.json`)
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()

    a.remove()
    URL.revokeObjectURL(url)
  }
)

export const toPushDataHymns = createAsyncThunk(
  "hymns/toPushDataHymns",
  async (file: File) => {
    const formData = new FormData();
    formData.append('file', file)

    await api.post(URL_RES.HYMNS.PUSH_DATA_BASE, formData)
  }
)

export const toggleFavoriteHymn = createAsyncThunk(
  "hymns/toggleFavoriteHymn",
  async (id: string) => LSFavoriteHymns.toggle(id)
)

export const setHistoryHymn = createAsyncThunk(
  "hymns/setHistoryHymn",
  async (id: string) => {
    let data: IHistoryHymn[] = LSHistoryHymns.get()
    if (data.length === 5) data = LSHistoryHymns.deleteLast()
    data = [...data.filter(historyHymn => historyHymn._id !== id), { _id: id, time: Date.now() }]

    LSHistoryHymns.setList(data)
    return data.sort((a, b) => b.time - a.time)
  }
)

export const getHistoryHymn = createAsyncThunk(
  "hymns/getHistoryHymn",
  async () => LSHistoryHymns.get()
)