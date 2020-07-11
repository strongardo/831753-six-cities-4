import {createSelector} from "reselect";
import {getServerOffers} from "../data/selectors.js";
import NameSpace from "../name-space.js";
import {sortOffersByType} from "../../utils.js";


const NAME_SPACE = NameSpace.CONDITION;

export const getCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getSortType = (state) => {
  return state[NAME_SPACE].sortType;
};

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

// этот реселектор используется в реселекторе getSortedOffers
export const getFilteredOffers = createSelector(
    getCity,
    getServerOffers,
    (activeCity, serverOffers) => {
      return serverOffers.filter((offer) => {
        return offer.city.name === activeCity.name;
      });
    }
);

// этот реселектор достает сортированные офферы из стора
export const getSortedOffers = createSelector(
    getSortType,
    getFilteredOffers,
    (sortType, filteredOffers) => {
      return sortOffersByType(filteredOffers, sortType);
    }
);
