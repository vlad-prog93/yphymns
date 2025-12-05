import { IHymn, ISearchForm } from "@models/hymns"

export const filterHymns = (hymns: IHymn[], searchHymnsBy: ISearchForm) => {
  if (searchHymnsBy.number) {
    return hymns.filter(h => h.number === Number(searchHymnsBy.number))
  }
  return hymns.filter(h => {
    const text = Object.values(h.text).join('')
    return text.toLowerCase().indexOf(searchHymnsBy.text.toLowerCase()) === -1 ? false : true
  })
}
