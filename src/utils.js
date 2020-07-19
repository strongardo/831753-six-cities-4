import {SortType} from "./const.js";

export const dateToFormatString = (date) =>
  new Intl.DateTimeFormat(`en-US`, {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
  }).format(date);

export const sortByDate = (array) => {
  return array.slice().sort((a, b) => (new Date(b.date)) - (new Date(a.date)));
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const sortOffersByType = (offers, sortType) => {
  let sortedOffers = [];
  const offersCopy = offers.slice();

  switch (sortType) {
    case SortType.LOW_TO_HIGH:
      sortedOffers = offersCopy.sort((a, b) => a.price - b.price);
      break;
    case SortType.HIGH_TO_LOW:
      sortedOffers = offersCopy.sort((a, b) => b.price - a.price);
      break;
    case SortType.TOP_RATED_FIRST:
      sortedOffers = offersCopy.sort((a, b) => b.starsCount - a.starsCount);
      break;
    case SortType.POPULAR:
      sortedOffers = offersCopy;
      break;
  }
  return sortedOffers;
};

export const getNonRepeatingCities = (arr) => {
  const nonRepeatingCities = arr.reduce(
      (acc, {city}) => {
        acc[city.name] = city;
        return acc;
      }
      , {});

  return Object.values(nonRepeatingCities);
};
