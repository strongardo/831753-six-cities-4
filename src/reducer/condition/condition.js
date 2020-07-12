import {extend} from "../../utils.js";
import {SortType} from "../../const.js";

const initialState = {
  city: {},
  sortType: SortType.POPULAR,
  offers: null,
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
  SET_CITIES: `SET_CITIES`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_OFFERS: `SET_OFFERS`,
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
  }

  return state;
};

export {reducer, setActiveCity, setCities, setSortType, setOffers};
