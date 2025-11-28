export interface IHymnText {
  [key: string]: string
}

export interface IHymn {
  _id: string,
  number: number,
  collection: string,
  title: string,
  text: IHymnText,
}

export enum Transpose {
  UP = 'UP',
  DOWN = 'DOWN'
}

export interface IHistoryHymn {
  _id: string
  time: number
}

export interface ISearchForm {
  number: number | null,
  text: string
}
