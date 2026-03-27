import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "@features/users/model/user"
import { toRegisterUser, toLoginUser, toGetUser, toGetAllUsers, toDeleteUser } from "@redux/reducers/users/ActionCreatorUsers"
import { isFulfilledAction, isPendingAction, isRejectedAction, setFulfilled, setPending, setRejected } from "@utils/redux"

interface IUserState {
  users: IUser[]
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: IUserState = {
  users: [],
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token')
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(toDeleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.email !== action.payload.email)
      })
      .addCase(toGetAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(toRegisterUser.fulfilled, (state, action) => {
        // можно просто оставить пустым или показывать сообщение об успехе
      })
      .addCase(toLoginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user_id', action.payload.user.id)
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(toGetUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(isPendingAction, setPending)
      .addMatcher(isRejectedAction, setRejected)
      .addMatcher(isFulfilledAction, setFulfilled)
  }
})

export const { logout, setError, clearError } = userSlice.actions
export default userSlice.reducer