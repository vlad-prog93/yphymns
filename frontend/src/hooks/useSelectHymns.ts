import { useAppSelector } from "../redux/hooks"
import { IHymn } from "../models/hymns"
import { ROUTES } from "../utils/routes"

export const useSelectHymns = (pathname: string): IHymn[] => {
  const { hymns, favoriteHymns, historyHymns, searchHymnsBy } = useAppSelector(state => state.hymnReducer)

  const map = new Map(hymns.map((h) => [h._id, h]))
  if (pathname === ROUTES.favoriteHymns) {
    return favoriteHymns.map(id => map.get(id)).filter((h): h is IHymn => Boolean(h))
  }

  if (pathname === ROUTES.history) {
    return historyHymns.map(h => map.get(h._id)).filter((h): h is IHymn => Boolean(h))
  }

  if (pathname === ROUTES.foundedHymns && searchHymnsBy.number) {
    return hymns.filter(h => h.number === searchHymnsBy.number)
  }

  if (pathname === ROUTES.foundedHymns && searchHymnsBy.text) {
    return hymns.filter(h => {
      const text = Object.values(h.text).join('')
      return text.toLowerCase().indexOf(searchHymnsBy.text.toLowerCase()) === -1 ? false : true
    })
  }

  return hymns
}