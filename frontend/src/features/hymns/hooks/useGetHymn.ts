import { useAppSelector } from "@redux/hooks"

export const useGetHymn = (id: string | undefined) => {
  const { hymns } = useAppSelector(s => s.hymn)
  const hymn = hymns.find(h => h._id === id)
  if (!hymn) return null
  return hymn
}