import {extend} from "../../utils.js";
import {SortType} from "../../const.js";

const initialState = {
  city: {},
  sortType: SortType.POPULAR,
  offers: null,
  favoriteOffers: [],
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  SET_CITIES: `SET_CITIES`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_OFFERS: `SET_OFFERS`,
  SET_REVIEWS: `SET_REVIEWS`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
};

const setActiveCity = (city) => {
  return {
    type: ActionType.SET_ACTIVE_CITY,
    payload: city,
  };
};

const setCities = (cities) => {
  return {
    type: ActionType.SET_CITIES,
    payload: cities,
  };
};

const setSortType = (sortType) => {
  return {
    type: ActionType.SET_SORT_TYPE,
    payload: sortType,
  };
};

const setOffers = (offers) => {
  return {
    type: ActionType.SET_OFFERS,
    payload: offers,
  };
};

const setReviews = (reviews, id) => {
  return {
    type: ActionType.SET_REVIEWS,
    payload: reviews,
    id,
  };
};

const setFavoriteOffers = (offer) => {
  return {
    type: ActionType.SET_FAVORITE_OFFERS,
    payload: offer,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {
        city: action.payload,
      });
    case ActionType.SET_CITIES:
      return extend(state, {
        cities: action.payload,
      });
    case ActionType.SET_SORT_TYPE:
      return extend(state, {
        sortType: action.payload,
      });
    case ActionType.SET_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.SET_REVIEWS:
      const offers = state.offers.map((offer) => {
        if (offer.id === action.id) {
          offer.reviews = action.payload;
        }
        return offer;
      });
      return extend(state, {
        offers,
      });
    case ActionType.SET_FAVORITE_OFFERS:
      const favoriteOffers = state.favoriteOffers;
      const index = favoriteOffers.findIndex((favoriteOffer) => {
        return favoriteOffer.payload.id === action.payload.id;
      });

      if (index === -1) {
        favoriteOffers.push(action);
      } else {
        favoriteOffers.splice(index, 1);
      }
      return extend(state, {
        favoriteOffers,
      });
  }

  return state;
};

export {reducer, setActiveCity, setCities, setSortType, setOffers, setReviews, setFavoriteOffers};
