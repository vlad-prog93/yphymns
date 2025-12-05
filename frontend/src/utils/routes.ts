export const routes = {
  slash: '/',
  home: '',
  hymns: '/hymns',
  favoriteHymns: '/favoritehymns',
  contentCollections: '/contentCollections',
  searhedHymns: '/searchedhymns',
  historyHymns: '/history',
  settings: '/settings',
  contentHymns: '/contentHymns',
  admin: '/admin',
  hymn: '/hymn',
  newHymn: '/newhymn',
  api: '/api',
  id: "/:id"
}


export class Path_of_Routes {
  static get slash() {
    return routes.slash
  }
  static get home() {
    return routes.home
  }
  static get searhedHymns() {
    return routes.home + routes.searhedHymns
  }
  static get favoriteHymns() {
    return routes.home + routes.favoriteHymns
  }
  static get historyHymns() {
    return routes.home + routes.historyHymns
  }
  static get contentHymns() {
    return routes.home + routes.contentHymns
  }
  static get contentCollections() {
    return routes.home + routes.contentCollections
  }
  static hymn(id: string = ':id') {
    return routes.home + routes.hymns + routes.hymn + '/' + id
  }
  static get settings() {
    return routes.home + routes.settings
  }
  static get admin() {
    return routes.home + routes.admin
  }
  static editHymn(id: string = ':id') {
    return routes.home + routes.admin + routes.hymns + routes.hymn + '/' + id
  }
  static get newHymn() {
    return routes.home + routes.admin + routes.hymns + routes.newHymn
  }
}