import cities from "../mocks/cities.js";
import serverOffers from "../mocks/offers.js";
import {extend} from "../utils.js";
import {SortType} from "../const.js";

const initialOffers = serverOffers.filter((offer) => {
  return offer.cityIds.includes(cities[0].id);
});

const initialState = {
  serverOffers,
  city: cities[0],
  sortType: SortType.POPULAR,
  offers: initialOffers,
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
};

const setActiveCity = (city, offers) => {
  return {
    type: ActionType.SET_ACTIVE_CITY,
    payload: {
      city,
      offers,
    },
  };
};

const setSortType = (sortType, offers) => {
  return {
    type: ActionType.SET_SORT_TYPE,
    payload: {
      sortType,
      offers,
    },
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {
        city: action.payload.city,
        offers: action.payload.offers,
      });
    case ActionType.SET_SORT_TYPE:
      return extend(state, {
        sortType: action.payload.sortType,
        offers: action.payload.offers,
      });
  }

  return state;
};

export {reducer, ActionType, setActiveCity, setSortType};
