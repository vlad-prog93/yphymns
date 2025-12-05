import { useAppSelector } from "@redux/hooks"

export const useMapCollections = () => {
  const { collections } = useAppSelector(s => s.collections)

  return new Map(collections.map(col => [col._id.toString(), col.name]))
}


