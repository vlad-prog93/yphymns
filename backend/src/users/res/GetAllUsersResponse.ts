export interface IUser {
  _id: string,
  email: string,
  role: string
}

export type GetAllUsersResponse = IUser[]