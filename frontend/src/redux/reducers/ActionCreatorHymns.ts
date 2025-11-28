import { AppDispatch } from "../store"
import { hymnsSlice } from "./HymnSlice"

import { IHymn } from "../../models/hymns"

import { api, URL_RES } from "../../utils/api"

const toCatchError = (dispatch: AppDispatch, error: any) => {
  if (error instanceof TypeError) {
    dispatch(hymnsSlice.actions.setError(error.message))
  }
  console.log(error)
}

export const toGetAllHymns = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())
    const { data } = await api.get<IHymn[]>(URL_RES.HYMNS.GET_ALL)
    dispatch(hymnsSlice.actions.setHymns(data))
    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toCreateHymn = async (dispatch: AppDispatch, hymn: IHymn): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())
    const { data } = await api.post<IHymn>(URL_RES.HYMNS.CREATE, { ...hymn })
    dispatch(hymnsSlice.actions.createHymn(data))
    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toDeleteAllHymns = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())
    const { data } = await api.delete<string>(URL_RES.HYMNS.DELETE_ALL)
    dispatch(hymnsSlice.actions.deleteHymn(data))
    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}



export const toPullDataHymns = async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())

    const { data } = await api.get<Blob>(URL_RES.HYMNS.PULL_DATA_BASE, { responseType: 'blob' })

    const url = URL.createObjectURL(data)
    const a = document.createElement('a')

    a.href = url
    a.setAttribute('download', 'db.json')
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()

    a.remove()
    URL.revokeObjectURL(url)

    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toPushDataHymns = async (file: File, dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())

    const formData = new FormData();
    formData.append('file', file)

    api.post(URL_RES.HYMNS.PUSH_DATA_BASE, formData)

    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}



export const toGetOneHymn = async (dispatch: AppDispatch, id: string): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())

    const { data } = await api.get<IHymn, any>(`${URL_RES.HYMNS.GET_ONE}${id}`)
    if (!data) throw new Error('Гимн не найден')
    dispatch(hymnsSlice.actions.setCurrentHymn(data))

    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toDeleteOneHymn = async (dispatch: AppDispatch, id: string): Promise<void> => {
  try {

    dispatch(hymnsSlice.actions.setLoading())

    const { data } = await api.delete<string>(`${URL_RES.HYMNS.DELETE_ONE}${id}`)
    dispatch(hymnsSlice.actions.deleteHymn(data))

    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toEditOneHymn = async (dispatch: AppDispatch, hymn: IHymn): Promise<void> => {
  try {
    dispatch(hymnsSlice.actions.setLoading())

    const { data } = await api.patch<IHymn>(`${URL_RES.HYMNS.EDIT_ONE}${hymn._id}`, { ...hymn })
    dispatch(hymnsSlice.actions.editOneHymn(data))

    dispatch(hymnsSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}








// export const toFetchHymns = async (dispatch: AppDispatch) => {
//   try {
//     dispatch(hymnsSlice.actions.hymnsFetching())
//     const { data } = await axios.get<IHymn[], any>(`${IP_SERVER}/api/hymns`)
//     dispatch(hymnsSlice.actions.hymnsFetchingSuccess(data))
//     // dispatch(hymnsSlice.actions.sortHymns())

//   } catch (error) {
//     console.log(error)
//   }
// }



// export const toUpdateHymn = async (dispatch: AppDispatch, hymn: IHymn) => {
//   try {
//     const { data } = await axios.patch<IHymn>(`${IP_SERVER}/api/hymns/${hymn._id}`, { ...hymn })
//     dispatch(hymnsSlice.actions.updateHymn(data))
//   } catch (error) {
//     console.log(error)
//   }
// }


// export const toDownloadFileWithHymns = async () => {
//   try {
//     const { data } = await axios.get<any>(`${IP_SERVER}/api/hymns/database`, { responseType: 'blob' })
//     const url = URL.createObjectURL(data)
//     const a = document.createElement('a')
//     a.href = url
//     a.setAttribute('download', 'db.json')
//     a.style.display = 'none'
//     document.body.appendChild(a)
//     a.click()
//     a.remove()
//     URL.revokeObjectURL(url)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const toUploadFile = async (file: any) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file)
//     axios.post(`${IP_SERVER}/api/hymns/database`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const toFetchHymn = async (dispatch: AppDispatch, id: string) => {
//   dispatch(hymnsSlice.actions.hymnFetching())
//   const { data } = await axios.get<IHymn, any>(`${IP_SERVER}/api/hymns/${id}`)
//   if (!data) {
//     throw new Error('Гимн не найден')
//   }
//   dispatch(hymnsSlice.actions.hymnFetchingSuccess(data))
//   dispatch(hymnsSlice.actions.setCurrentHymn(data))
// }