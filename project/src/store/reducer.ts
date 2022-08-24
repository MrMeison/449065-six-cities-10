import { createReducer } from '@reduxjs/toolkit';
import { changeCurrentCity, changeOffers, changeFilter, loadOffers, setDataLoadedStatus } from './action';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import city from '../mocks/city';

type InitialState = {
  city: City,
  offers: Offer[],
  currentFilter: string,
  loaded: boolean,
};

const initialState: InitialState = {
  city: city,
  offers: [],
  currentFilter: 'Popular',
  loaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeFilter, (state, action) => {
      state.currentFilter = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.loaded = action.payload;
    })
});

export {reducer};
