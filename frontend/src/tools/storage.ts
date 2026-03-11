import { ICollection } from "@features/collections/model/collection"
import { IHistoryHymn, IHymn } from "../features/hymns/model/hymns"
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
    return data
  }

  delete(value: T) {
    let data = this.get()
    data = data.filter((el: T) => el !== value)
    localStorage.setItem(this.name, JSON.stringify(data))
    return data
  }

  deleteLast = () => {
    let data = this.get()
    data.pop()
    localStorage.setItem(this.name, JSON.stringify(data))
    return data
  }

  clear() {
    localStorage.removeItem(this.name)
  }

  toggle(value: T) {
    let data = this.get()

    if (data.includes(value)) {
      data = data.filter(el => el !== value)
    } else {
      data = [...data, value]
    }

    localStorage.setItem(this.name, JSON.stringify(data))
    return data
  }

  setList(value: T[]) {
    const data = localStorage.setItem(this.name, JSON.stringify(value))
    return value
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
export const LSHymns = new LSArray<IHymn>('hymns')
export const LSCollections = new LSArray<ICollection>('collections')