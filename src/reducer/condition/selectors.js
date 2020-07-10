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

export const getFilteredOffers = createSelector(
    getCity,
    getServerOffers,
    (activeCity, serverOffers) => {
      return serverOffers.filter((offer) => {
        return offer.city.name === activeCity.name;
      });
    }
);

export const getSortedOffers = createSelector(
    getSortType,
    getFilteredOffers,
    (sortType, filteredOffers) => {
      return sortOffersByType(filteredOffers, sortType);
    }
);

export const getNonRepeatingCities = createSelector(
    getServerOffers,
    (serverOffers) => {
      const serverCities = serverOffers.map((offer) => {
        return offer.city;
      });

      const nonRepeatingCities = [serverCities[0]];
      const doesCityExist = (city) => {
        return nonRepeatingCities.some((item) => {
          return item.name === city.name;
        });
      };
      serverCities.forEach((city) => {
        if (!doesCityExist(city)) {
          nonRepeatingCities.push(city);
        }
      });

      return nonRepeatingCities;
    }
);
