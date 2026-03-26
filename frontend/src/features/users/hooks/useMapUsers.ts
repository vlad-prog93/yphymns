import { useAppSelector } from "@redux/hooks"

export const useMapUsers = () => {
  const users = useAppSelector(s => s.user.users)

  return new Map(users.map(user => [user._id.toString(), user.email]))
}


