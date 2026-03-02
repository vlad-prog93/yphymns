import { useLocation } from "react-router-dom"

import { useAppSelector } from "@redux/hooks"
import { IHymn } from "@models/hymns"
import { Path_of_Routes } from "@utils/routes"
import { filterHymns } from "@features/hymns/filterHymns"

export const useSelectHymns = (): IHymn[] => {
  const { pathname } = useLocation()
  const { hymns, favoriteHymns, historyHymns, searchHymnsBy } = useAppSelector(s => s.hymn)

  const map = new Map(hymns.map((h) => [h._id, h]))
  if (pathname === Path_of_Routes.favoriteHymns) {
    return favoriteHymns.map(id => map.get(id)).filter((h): h is IHymn => Boolean(h))
  }

  if (pathname === Path_of_Routes.historyHymns) {
    return historyHymns.map(h => map.get(h._id)).filter((h): h is IHymn => Boolean(h))
  }

  if (pathname === Path_of_Routes.searhedHymns) {
    return filterHymns(hymns, searchHymnsBy)
  }

  return hymns
}