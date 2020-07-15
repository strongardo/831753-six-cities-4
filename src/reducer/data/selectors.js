import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getServerOffers = (state) => {
  return state[NAME_SPACE].serverOffers;
};

export const getIsDataLoaded = (state) => {
  return state[NAME_SPACE].isDataLoaded;
};

export const getReviews = (state) => {
  return state[NAME_SPACE].serverOffers.reviews;
};
