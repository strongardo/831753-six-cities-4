import cities from "./mocks/cities.js";
import offers from "./mocks/offers.js";
import {extend} from "./utils.js";

const initialState = {
  city: cities[0],
  offers: offers.filter((offer) => {
    return offer.cityIds.includes(cities[0].id);
  }),
};

const ActionType = {
  SET_ACTIVE_CITY: `SET_ACTIVE_CITY`,
};

const setActiveCity = (id) => {
  return {
    type: ActionType.SET_ACTIVE_CITY,
    payload: id,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_CITY:
      return extend(state, {
        city: cities.find((city) => {
          return city.id === action.payload;
        }),
        offers: offers.filter((offer) => {
          return offer.cityIds.includes(action.payload);
        }),
      });
  }

  return state;
};

export {reducer, ActionType, setActiveCity};
