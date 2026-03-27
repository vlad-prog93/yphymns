export interface IUser {
  id: string
  email: string
  role: "admin" | "editor" | "user"
}