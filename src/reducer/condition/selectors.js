import {createSelector} from "reselect";
import {getServerOffers} from "../data/selectors.js";
import NameSpace from "../name-space.js";
import {sortOffersByType, getNonRepeatingCities} from "../../utils.js";


const NAME_SPACE = NameSpace.CONDITION;

export const getCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getSortType = (state) => {
  return state[NAME_SPACE].sortType;
};

export const getOffers = createSelector(
    getServerOffers,
    getCity,
    getSortType,
    (serverOffers, activeCity, sortType) => {
      const filteredOffers = serverOffers.filter((offer) => {
        return offer.city.name === activeCity.name;
      });
      return sortOffersByType(filteredOffers, sortType);
    }
);

export const getCities = createSelector(
    getServerOffers,
    (serverOffers) => {
      return getNonRepeatingCities(serverOffers);
    }
);
