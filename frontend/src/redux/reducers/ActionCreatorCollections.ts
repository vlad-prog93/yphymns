import { ICollection } from "../../models/collection"
import { IHymn } from "../../models/hymns"

import { collectionSlice } from "./CollectionSlice"
import { AppDispatch } from "../store"

import { api, URL_RES } from "../../utils/api"

const toCatchError = (dispatch: AppDispatch, error: any) => {
  if (error instanceof TypeError) {
    dispatch(collectionSlice.actions.setError(error.message))
  }
  console.log(error)
}

export const toGetAllCols = async (dispatch: AppDispatch) => {
  try {
    dispatch(collectionSlice.actions.setLoading())

    const { data } = await api.get<ICollection[]>(URL_RES.COLLECTIONS.GET_ALL)
    dispatch(collectionSlice.actions.setCollections(data))

    dispatch(collectionSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toCreateCol = async (dispatch: AppDispatch, collection: ICollection) => {
  try {
    dispatch(collectionSlice.actions.setLoading())

    const { data } = await api.post<ICollection>(URL_RES.COLLECTIONS.CREATE, { name: collection })
    dispatch(collectionSlice.actions.create(data))

    dispatch(collectionSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toDeleteAllCols = async (dispatch: AppDispatch) => {
  try {
    dispatch(collectionSlice.actions.setLoading())

    await api.delete<string>(URL_RES.COLLECTIONS.DELETE_ALL)
    dispatch(collectionSlice.actions.deleteAll())

    dispatch(collectionSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}




export const toPullDataCols = async () => {
  return
}

export const toPushDataCols = async (file: File) => {
  return
}



export const toGetOneCol = async (dispatch: AppDispatch, id: string) => {
  return
}

export const toDeleteOneCol = async (dispatch: AppDispatch, id: string) => {
  try {
    dispatch(collectionSlice.actions.setLoading())

    const { data } = await api.delete<string>(`${URL_RES.COLLECTIONS.DELETE_ONE}${id}`)
    dispatch(collectionSlice.actions.deleteOne(data))

    dispatch(collectionSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}

export const toEditOneCol = async (dispatch: AppDispatch, hymn: IHymn) => {
  try {
    dispatch(collectionSlice.actions.setLoading())

    const { data } = await api.patch<ICollection>(`${URL_RES.HYMNS.EDIT_ONE}${hymn._id}`, { ...hymn })
    dispatch(collectionSlice.actions.editCollection(data))

    dispatch(collectionSlice.actions.setSuccess())
  } catch (error) {
    toCatchError(dispatch, error)
  }
}




// export const toFetchCollections = async (dispatch: Dispatch) => {
//   try {
//     dispatch(CollectionSlice.actions.fetching())
//     const { data } = await axios.get<ICollection[]>(`${IP_SERVER}/api/collections`)
//     dispatch(CollectionSlice.actions.fetchingSuccess(data))
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(CollectionSlice.actions.fetchingError(error.message))
//     }
//     console.log(error)
//   }
// }


// export const toCreateCollection = async (dispatch: Dispatch, collection: string) => {
//   try {
//     dispatch(CollectionSlice.actions.fetching())
//     const { data } = await axios.post<ICollection>(`${IP_SERVER}/api/collections`, { name: collection })
//     dispatch(CollectionSlice.actions.createSuccess(data))
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(CollectionSlice.actions.createError(error.message))
//     }
//     console.log(error)
//   }
// }

// export const toDeleteCollection = async (dispatch: Dispatch, id: string) => {
//   try {
//     dispatch(CollectionSlice.actions.fetching())
//     const { data } = await axios.delete<string>(`${IP_SERVER}/api/collections/${id}`)
//     dispatch(CollectionSlice.actions.deleteSuccess(data))
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(CollectionSlice.actions.deleteError(error.message))
//     }
//     console.log(error)
//   }
// }

// export const toEditCollection = async (dispatch: Dispatch, collection: ICollection) => {
//   try {
//     const { data } = await axios.patch<ICollection>(`${IP_SERVER}/api/collections/${collection._id}`, { collection })
//     dispatch(CollectionSlice.actions.updateSuccess(data))
//   } catch (error) {
//     console.log(error)

//   } finally {
//     dispatch(CollectionSlice.actions.setCurrentCollection(null))
//     dispatch(CollectionSlice.actions.hideModal())
//   }
// }