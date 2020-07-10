import {extend} from "../../utils.js";
import adaptOffers from "../../adapters/offers.js";
import {setActiveCity} from "../condition/condition.js";
import {setOffers} from "../condition/condition.js";
import {setCities} from "../condition/condition.js";
import {getSortedOffers} from "../condition/selectors.js";

const initialState = {
  serverOffers: null,
  isDataLoaded: false,
};

const ActionType = {
  SET_SERVER_OFFERS: `SET_SERVER_OFFERS`,
  SET_IS_DATA_LOADED: `SET_IS_DATA_LOADED`,
};

const setServerOffers = (serverOffers) => {
  return {
    type: ActionType.SET_SERVER_OFFERS,
    payload: serverOffers,
  };
};

const setIsDataLoaded = (isDataLoaded) => {
  return {
    type: ActionType.SET_IS_DATA_LOADED,
    payload: isDataLoaded,
  };
};


const serverOffersOperation = () => (dispatch, getState, api) => {
  return api.get(`/hotels`)
    .then((response) => {
      const serverOffers = adaptOffers(response.data);

      dispatch(setServerOffers(serverOffers));

      const serverCities = serverOffers.map((offer) => {
        return offer.city;
      });

      const cities = [serverCities[0]];
      const doesCityExist = (city) => {
        return cities.some((item) => {
          return item.name === city.name;
        });
      };
      serverCities.forEach((city) => {
        if (!doesCityExist(city)) {
          cities.push(city);
        }
      });
      dispatch(setCities(cities));

      const activeCity = cities[0];
      dispatch(setActiveCity(activeCity));

      const sortedOffers = getSortedOffers(getState());
      dispatch(setOffers(sortedOffers));

      dispatch(setIsDataLoaded(true));
    });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SERVER_OFFERS:
      return extend(state, {
        serverOffers: action.payload,
      });
    case ActionType.SET_IS_DATA_LOADED:
      return extend(state, {
        isDataLoaded: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, serverOffersOperation};
