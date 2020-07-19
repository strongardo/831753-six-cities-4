import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getServerOffers = (state) => {
  return state[NAME_SPACE].serverOffers;
};

export const getIsDataLoaded = (state) => {
  return state[NAME_SPACE].isDataLoaded;
};

export const getFavoriteOffers = (state) => {
  return state[NAME_SPACE].favoriteOffers;
};

export const getNearestOffers = (state) => {
  return state[NAME_SPACE].nearestOffers;
};

export const getOffer = (state, id) => {
  return getServerOffers(state).find((offer) => {
    return offer.id === id;
  });
};
