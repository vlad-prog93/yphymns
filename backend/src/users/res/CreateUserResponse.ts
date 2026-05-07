export interface CreateUserResponse {
  user: {
    email: string
    role: string
  },
  message: string
}