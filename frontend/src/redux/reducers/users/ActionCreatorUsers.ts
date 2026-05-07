import { createAsyncThunk } from "@reduxjs/toolkit"
import { api, URL_RES } from "@utils/api"
import { IUser } from "@features/users/model/user"

interface LoginRequets {
  email: string
  password: string
}

interface LoginResponse {
  user: IUser
  token: string
}

interface RegisterRequest {
  email: string
}

interface RegisterResponse {
  user: {
    email: string
  }
  message: string
}

interface ResetPasswordResponse {
  message: string
}

interface deleteUserResponse {
  email: string
  message: string
}

// Регистрация
export const toRegisterUser = createAsyncThunk(
  "users/toRegisterUser",
  async (data: RegisterRequest) => {
    const res = await api.post<RegisterResponse>(URL_RES.USERS.CREATE, data)
    return res.data
  }
)

// Логин
export const toLoginUser = createAsyncThunk(
  "users/toLoginUser",
  async (data: LoginRequets) => {
    const res = await api.post<LoginResponse>(URL_RES.AUTH.LOGIN, data)
    return res.data
  }
)

// Получение текущего пользователя (по id или токен)
export const toGetUser = createAsyncThunk(
  "users/toGetUser",
  async (id: string) => {
    const res = await api.get<IUser>(`${URL_RES.USERS.GET_ONE}/${id}`)
    return res.data
  }
)

export const toGetAllUsers = createAsyncThunk(
  "users/toGetAllUsers",
  async () => {
    const res = await api.get<IUser[]>(URL_RES.USERS.GET_ALL)
    return res.data
  }
)

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (email: string) => {
    const res = await api.post<ResetPasswordResponse>(URL_RES.USERS.RESET_PASSWORD, { email })
    return res.data
  }
)

export const toDeleteUser = createAsyncThunk(
  "users/toDeleteUser",
  async (id: string) => {
    const res = await api.delete<deleteUserResponse>(`${URL_RES.USERS.DELETE}/${id}`)
    return res.data
  }
)