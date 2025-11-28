import { IHistoryHymn } from "../models/hymns"
import { ISettingsFont } from "../models/settingsFont"


class LSArray<T> {
  constructor(private name: string) { }
  get(): T[] {
    const res = localStorage.getItem(this.name)
    return res ? JSON.parse(res) : []
  }

  set(value: T) {
    const data = this.get()
    data.push(value)
    localStorage.setItem(this.name, JSON.stringify(data))
  }

  delete(value: T) {
    let data = this.get()
    data = data.filter((el: T) => el !== value)
    localStorage.setItem(this.name, JSON.stringify(data))
  }

  deleteLast = () => {
    let data = this.get()
    data = data.filter((_, index) => index !== -1)
    localStorage.setItem(this.name, JSON.stringify(data))
  }

  clear() {
    localStorage.removeItem(this.name)
  }
}

class LSValue<T> {
  constructor(private name: string) { }

  get(): T | null {
    const res = localStorage.getItem(this.name)
    return res ? JSON.parse(res) : null
  }

  set(value: T) {
    localStorage.setItem(this.name, JSON.stringify(value))
  }

  clear() {
    localStorage.removeItem(this.name)
  }
}

export const LSFavoriteHymns = new LSArray<string>('favorite')
export const LSHistoryHymns = new LSArray<IHistoryHymn>('history')
export const LSSettingsFont = new LSValue<ISettingsFont>('settingFont')



// export const getFavoriteHymnsLS = (): string[] => {
//   const hymnsString = localStorage.getItem('favorite')
//   return hymnsString ? JSON.parse(hymnsString) : []
// }

// export const setFavoriteHymnLS = (value: string) => {
//   const hymnsString = localStorage.getItem('favorite')
//   const hymnsList: string[] = hymnsString ? JSON.parse(hymnsString) : []
//   hymnsList.push(value)
//   return localStorage.setItem('favorite', JSON.stringify(hymnsList))
// }

// export const deleteFavoriteHymnLS = (value: string) => {
//   const hymnsString = localStorage.getItem('favorite')
//   const hymnsList: string[] = hymnsString ? JSON.parse(hymnsString) : []
//   return localStorage.setItem('favorite', JSON.stringify(hymnsList.filter((id: string) => id !== value)))
// }


// export const getHistoryHymnsLS = (): IHistoryHymn[] => {
//   const hymnsString = localStorage.getItem('history')
//   return hymnsString ? JSON.parse(hymnsString) : []
// }

// export const setHistoryHymnLS = (value: IHistoryHymn) => {
//   const hymnsString = localStorage.getItem('history')
//   const hymnsList: IHistoryHymn[] = hymnsString ? JSON.parse(hymnsString) : []
//   hymnsList.push(value)
//   return localStorage.setItem('history', JSON.stringify(hymnsList))
// }

// export const deleteHistoryHymnLS = () => {
//   const hymnsString = localStorage.getItem('history')
//   const hymnsList: IHistoryHymn[] = hymnsString ? JSON.parse(hymnsString) : []
//   return localStorage.setItem('history', JSON.stringify(hymnsList.splice(1, hymnsList.length - 1)))
// }

// export const getSettingFontLS = () => {
//   const settingFont = localStorage.getItem('settingFont')
//   return settingFont ? JSON.parse(settingFont) : null
// }

// export const setSettingFontLS = (value: ISettingsFontLS) => {
//   return localStorage.setItem('settingFont', JSON.stringify(value))
// }