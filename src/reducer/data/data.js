import {extend} from "../../utils.js";
import adaptOffers from "../../adapters/offers.js";
import adaptReviews from "../../adapters/reviews.js";
import {setActiveCity} from "../condition/condition.js";
import {sortByDate, getNonRepeatingCities} from "../../utils.js";
import {ServerUrls, maxNumberOfReviews} from "../../const.js";

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
  TOGGLE_FAVORITE: `TOGGLE_FAVORITE`,
  SET_REVIEWS: `SET_REVIEWS`,
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

const toggleFavorite = (id) => {
  return {
    type: ActionType.TOGGLE_FAVORITE,
    payload: id,
  };
};

const setReviews = (reviews, id) => {
  return {
    type: ActionType.SET_REVIEWS,
    payload: reviews,
    id,
  };
};

const getOffersAsync = () => (dispatch, getState, api) => {
  return api.get(ServerUrls.HOTELS)
    .then((response) => {
      const serverOffers = adaptOffers(response.data);
      dispatch(setServerOffers(serverOffers));

      const cities = getNonRepeatingCities(serverOffers);
      dispatch(setActiveCity(cities[0]));

      dispatch(setIsDataLoaded(true));
    });
};

const getNearestOffersAsync = (id) => (dispatch, getState, api) => {
  return api.get(`${ServerUrls.HOTELS}${id}${ServerUrls.NEARBY}`)
    .then((response) => {
      dispatch(setNearestOffers(adaptOffers(response.data)));
    });
};

const getFavoriteOffersAsync = () => (dispatch, getState, api) => {
  return api.get(ServerUrls.FAVORITE)
    .then((response) => {
      dispatch(setFavoriteOffers(adaptOffers(response.data)));
    });
};

const toggleFavoriteAsync = (id, status) => (dispatch, getState, api) => {
  return api.post(`${ServerUrls.FAVORITE}${id}/${status}`)
    .then((response) => {
      dispatch(toggleFavorite({
        id: response.data.id,
        isFavorite: response.data.is_favorite,
      }));
    });
};

const getReviewsAsync = (id) => (dispatch, getState, api) => {
  return api.get(`${ServerUrls.COMMENTS}${id}`)
    .then((response) => {
      const serverReviews = adaptReviews(response.data);
      const reviews = (serverReviews.length <= maxNumberOfReviews) ? serverReviews : serverReviews.slice(0, maxNumberOfReviews);
      const sortedReviews = sortByDate(reviews);
      dispatch(setReviews(sortedReviews, id));
    });
};

const setReviewsAsync = (id, data) => (dispatch, getState, api) => {
  return api.post(`${ServerUrls.COMMENTS}${id}`, data)
    .then((response) => {
      const serverReviews = adaptReviews(response.data);
      const reviews = (serverReviews.length <= maxNumberOfReviews) ? serverReviews : serverReviews.slice(0, maxNumberOfReviews);
      const sortedReviews = sortByDate(reviews);
      dispatch(setReviews(sortedReviews, id));
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
    case ActionType.TOGGLE_FAVORITE:
      const offers = state.serverOffers.map((offer) => {
        if (offer.id === action.payload.id) {
          offer.isFavorite = action.payload.isFavorite;
        }
        return offer;
      });
      return extend(state, {
        serverOffers: offers,
      });
    case ActionType.SET_REVIEWS:
      const offersWithReviews = state.serverOffers.map((offer) => {
        if (offer.id === action.id) {
          offer.reviews = action.payload;
        }
        return offer;
      });
      return extend(state, {
        serverOffers: offersWithReviews,
      });

    default: return state;
  }
};

export {
  reducer,
  getOffersAsync,
  getReviewsAsync,
  setReviewsAsync,
  toggleFavoriteAsync,
  getFavoriteOffersAsync,
  getNearestOffersAsync,
};
