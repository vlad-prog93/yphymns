import axios from "axios"
import { ICollection } from "../../models/collection"
import { IP_SERVER } from "../../utils/const"
import { CollectionSlice } from "./CollectionSlice"
import { Dispatch } from "@reduxjs/toolkit"



export const toFetchCollections = async (dispatch: Dispatch) => {
  try {
    dispatch(CollectionSlice.actions.fetching())
    const { data } = await axios.get<ICollection[]>(`${IP_SERVER}/api/collections`)
    dispatch(CollectionSlice.actions.fetchingSuccess(data))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(CollectionSlice.actions.fetchingError(error.message))
    }
    console.log(error)
  }
}


export const toCreateCollection = async (dispatch: Dispatch, collection: string) => {
  try {
    dispatch(CollectionSlice.actions.fetching())
    const { data } = await axios.post<ICollection>(`${IP_SERVER}/api/collections`, { name: collection })
    dispatch(CollectionSlice.actions.createSuccess(data))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(CollectionSlice.actions.createError(error.message))
    }
    console.log(error)
  }
}

export const toDeleteCollection = async (dispatch: Dispatch, id: string) => {
  try {
    dispatch(CollectionSlice.actions.fetching())
    const { data } = await axios.delete<string>(`${IP_SERVER}/api/collections/${id}`)
    dispatch(CollectionSlice.actions.deleteSuccess(data))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(CollectionSlice.actions.deleteError(error.message))
    }
    console.log(error)
  }
}

export const toEditCollection = async (dispatch: Dispatch, collection: ICollection) => {
  try {
    const { data } = await axios.patch<ICollection>(`${IP_SERVER}/api/collections/${collection._id}`, { collection })
    dispatch(CollectionSlice.actions.updateSuccess(data))
  } catch (error) {
    console.log(error)

  } finally {
    dispatch(CollectionSlice.actions.setCurrentCollection(null))
    dispatch(CollectionSlice.actions.hideModal())
  }
}