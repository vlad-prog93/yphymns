import axios from "axios";
// process.env.REACT_APP_API_URL || 
const IP_SERVER = 'http://localhost:5000/api'
const HYMNS = '/hymns'
const HYMN = '/hymn'
const COLLECTIONS = '/collections'
const COLLECTION = '/collection'
const DATABASE = '/database'

export const URL_RES = {
  base: IP_SERVER,
  HYMNS: {
    GET_ALL: HYMNS,
    DELETE_ALL: HYMNS,
    CREATE: HYMNS,

    PULL_DATA_BASE: `${HYMNS}${DATABASE}`,
    PUSH_DATA_BASE: `${HYMNS}${DATABASE}`,

    GET_ONE: `${HYMNS}${HYMN}`,
    DELETE_ONE: `${HYMNS}${HYMN}`,
    EDIT_ONE: `${HYMNS}${HYMN}`
  },
  COLLECTIONS: {
    GET_ALL: COLLECTIONS,
    DELETE_ALL: COLLECTIONS,
    CREATE: COLLECTIONS,

    PULL_DATA_BASE: `${COLLECTIONS}${DATABASE}`,
    PUSH_DATA_BASE: `${COLLECTIONS}${DATABASE}`,

    GET_ONE: `${COLLECTIONS}${COLLECTION}`,
    DELETE_ONE: `${COLLECTIONS}${COLLECTION}`,
    EDIT_ONE: `${COLLECTIONS}${COLLECTION}`
  },
}

export const api = axios.create({
  baseURL: URL_RES.base
})