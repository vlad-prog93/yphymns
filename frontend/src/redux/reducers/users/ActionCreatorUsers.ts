import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, URL_RES } from "@utils/api"
import { IUser } from "@features/users/model/user"

interface LoginData {
  email: string
  password: string
}

// Регистрация
export const toRegisterUser = createAsyncThunk(
  "users/toRegisterUser",
  async (email: string) => {
    const { data } = await api.post<IUser>(URL_RES.USERS.CREATE, { email })
    return data
  }
)

// Логин
export const toLoginUser = createAsyncThunk(
  "users/toLoginUser",
  async (data: LoginData) => {
    const res = await api.post<{ user: IUser; token: string }>(URL_RES.AUTH.LOGIN, data)
    return res.data
  }
)

// Получение текущего пользователя (по id или токен)
export const toGetUser = createAsyncThunk(
  "users/toGetUser",
  async (id: string) => {
    const { data } = await api.get<IUser>(`${URL_RES.USERS.GET_ONE}/${id}`)
    console.log(data)
    return data
  }
)

export const toGetAllUsers = createAsyncThunk(
  "users/toGetAllUsers",
  async () => {
    const { data } = await api.get<IUser[]>(URL_RES.USERS.GET_ALL)
    return data
  }
)

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (email: string) => {
    const res = await api.post<{ message: string }>(URL_RES.USERS.RESET_PASSWORD, { email })
    return res.data
  }
)

export const toDeleteUser = createAsyncThunk(
  "users/toDeleteUser",
  async (id: string) => {
    const { data } = await api.delete<{ email: string, message: string }>(`${URL_RES.USERS.DELETE}/${id}`)
    return data
  }
)