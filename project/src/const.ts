export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export interface Place {
  id: number,
  img: string,
  name: string,
  price: number,
  type: string,
  isPremium: boolean,
  active: boolean,
  stars: string
}

export type Places = Place[]

export enum APIRoute {
  Offers = '/hotels',
  Hotel = '/hotels/{hotelId}',
  Nearby = '/hotels/{hotelId}/nearby',
  Favorite = '/favorite',
  FavoriteChange = '/favorite/{hotelId}/{status}',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}
