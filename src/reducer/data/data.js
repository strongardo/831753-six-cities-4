import {extend} from "../../utils.js";
import adaptOffers from "../../adapters/offers.js";
import adaptReviews from "../../adapters/reviews.js";
import {setActiveCity} from "../condition/condition.js";
import {sortByDate, getNonRepeatingCities} from "../../utils.js";
import {ServerUrl, MAX_NUMBER_OF_REVIEWS} from "../../const.js";
import {getServerOffers} from "./selectors.js";

const initialState = {
  serverOffers: null,
  isDataLoaded: false,
  favoriteOffers: [],
  nearestOffers: [],
};

const ActionType = {
  SET_SERVER_OFFERS: `SET_SERVER_OFFERS`,
  SET_IS_DATA_LOADED: `SET_IS_DATA_LOADED`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
  SET_NEAREST_OFFERS: `SET_NEAREST_OFFERS`,
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

const setFavoriteOffers = (offers) => {
  return {
    type: ActionType.SET_FAVORITE_OFFERS,
    payload: offers,
  };
};

const setNearestOffers = (nearestOffers) => {
  return {
    type: ActionType.SET_NEAREST_OFFERS,
    payload: nearestOffers,
  };
};

const getOffersAsync = () => (dispatch, getState, api) => {
  return api.get(ServerUrl.HOTELS)
    .then((response) => {
      const serverOffers = adaptOffers(response.data);
      dispatch(setServerOffers(serverOffers));

      const cities = getNonRepeatingCities(serverOffers);
      dispatch(setActiveCity(cities[0]));

      dispatch(setIsDataLoaded(true));
    });
};

const getNearestOffersAsync = (id) => (dispatch, getState, api) => {
  return api.get(`${ServerUrl.HOTELS}${id}${ServerUrl.NEARBY}`)
    .then((response) => {
      dispatch(setNearestOffers(adaptOffers(response.data)));
    });
};

const getFavoriteOffersAsync = () => (dispatch, getState, api) => {
  return api.get(ServerUrl.FAVORITE)
    .then((response) => {
      dispatch(setFavoriteOffers(adaptOffers(response.data)));
    });
};

const toggleFavoriteAsync = (id, status) => (dispatch, getState, api) => {
  return api.post(`${ServerUrl.FAVORITE}${id}/${status}`)
    .then((response) => {
      const offers = getServerOffers(getState()).map((offer) => {
        if (offer.id === id) {
          offer.isFavorite = response.data.is_favorite;
        }
        return offer;
      });
      dispatch(setServerOffers(offers));
    });
};

const onDownloadReviews = (data, id, dispatch, getState) => {
  const serverReviews = adaptReviews(data);
  const sortedReviews = sortByDate(serverReviews);
  const reviews = (sortedReviews.length <= MAX_NUMBER_OF_REVIEWS)
    ? sortedReviews
    : sortedReviews.slice(0, MAX_NUMBER_OF_REVIEWS);
  const offersWithReviews = getServerOffers(getState()).map((offer) => {
    if (offer.id === id) {
      offer.reviews = reviews;
    }
    return offer;
  });
  dispatch(setServerOffers(offersWithReviews));
};

const getReviewsAsync = (id) => (dispatch, getState, api) => {
  return api.get(`${ServerUrl.COMMENTS}${id}`)
    .then((response) => {
      onDownloadReviews(response.data, id, dispatch, getState);
    });
};

const setReviewsAsync = (id, data) => (dispatch, getState, api) => {
  return api.post(`${ServerUrl.COMMENTS}${id}`, data)
    .then((response) => {
      onDownloadReviews(response.data, id, dispatch, getState);
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
    case ActionType.SET_FAVORITE_OFFERS:
      return extend(state, {
        favoriteOffers: action.payload,
      });
    case ActionType.SET_NEAREST_OFFERS:
      return extend(state, {
        nearestOffers: action.payload,
      });
    default: return state;
  }
};

export {
  reducer,
  ActionType,
  getOffersAsync,
  getReviewsAsync,
  setReviewsAsync,
  toggleFavoriteAsync,
  getFavoriteOffersAsync,
  getNearestOffersAsync,
};
