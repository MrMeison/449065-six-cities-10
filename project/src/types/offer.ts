export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface Offer {
  bedrooms: number,
  city: {
    location: {
    latitude: number
    longitude: number
    zoom: number
    }
    name: string
  },
  description: string,
  goods: [string],
  host: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  },
  id: number,
  images: [string],
  img: string,
  isPro: boolean,
  name: string,
  price: number,
  type: string,
  title: string,
  isPremium: boolean,
  active: boolean,
  rating: number,
  isFavorite: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
}
