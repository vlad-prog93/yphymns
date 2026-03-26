import axios from "axios";
// process.env.REACT_APP_API_URL || 
const IP_SERVER = 'http://localhost:5000/api'
const HYMNS = '/hymns'
const HYMN = '/hymn'
const COLLECTIONS = '/collections'
const COLLECTION = '/collection'
const DATABASE = '/database'
const USERS = '/users'
const USER = '/user'
const RESET_PASSWORD = '/reset-password'
const AUTH = '/auth'
const LOGIN = '/login'
const EDIT_HYMNS = 'hymn-edits'
const APPROVE = (id: string) => `hymn-edits/${id}/approve`
const REJECT = (id: string) => `hymn-edits/${id}/reject`

export const URL_RES = {
  base: IP_SERVER,
  EDIT_HYMNS: {
    GET_All: EDIT_HYMNS,
    EDIT_HYMN: EDIT_HYMNS,
    APPROVE: APPROVE,
    REJECT: REJECT
  },
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
  USERS: {
    GET_ALL: USERS,
    CREATE: USERS,
    DELETE: `${USERS}${USER}`,
    GET_ONE: `${USERS}${USER}`,
    RESET_PASSWORD: `${USERS}${RESET_PASSWORD}`
  },
  AUTH: {
    LOGIN: `${AUTH}${LOGIN}`
  }
}

export const api = axios.create({
  baseURL: URL_RES.base
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});