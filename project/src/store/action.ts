import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export enum Action {
  LoadOffers = 'LOAD_OFFERS',
  LoadNearby = 'LOAD_NEARBY',
  ChangeCurrentCity = 'CHANGE_CURRENT_CITY',
  ChangeOffers = 'CHANGE_OFFERS',
  ChangeFilter = 'CHANGE_FILTER',
  setDataLoadedStatus = 'SET_DATA_LOADED_STATUS',
  CurrentHotel = 'CURRENT_HOTEL',
}

// export const getOffers = createAction('offers');
export const changeCurrentCity = createAction(Action.ChangeCurrentCity, (city: City) => ({
  payload: city,
}));
export const changeOffers = createAction(Action.ChangeOffers, (offers: Offer[]) => ({
  payload: offers,
}));
export const changeFilter = createAction(Action.ChangeFilter, (filter: string) => ({
  payload: filter,
}));
export const loadOffers = createAction(Action.LoadOffers, (offers: Offer[]) => ({
  payload: offers,
}));
export const setDataLoadedStatus = createAction(Action.setDataLoadedStatus, (loaded: boolean) => ({
  payload: loaded,
}));
