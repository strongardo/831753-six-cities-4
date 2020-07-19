import {extend} from "../../utils.js";
import adaptOffers from "../../adapters/offers.js";
import adaptReviews from "../../adapters/reviews.js";
import {setActiveCity, setOffers, setCities, setReviews} from "../condition/condition.js";
import {sortByDate, getNonRepeatingCities} from "../../utils.js";
import {getSortedOffers} from "../condition/selectors.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const initialState = {
  serverOffers: null,
  isDataLoaded: false,
  favoriteOffers: [],
};

const ActionType = {
  SET_SERVER_OFFERS: `SET_SERVER_OFFERS`,
  SET_IS_DATA_LOADED: `SET_IS_DATA_LOADED`,
  SET_FAVORITE_OFFERS: `SET_FAVORITE_OFFERS`,
  TOGGLE_FAVORITE: `TOGGLE_FAVORITE`,
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

const toggleFavorite = (id) => {
  return {
    type: ActionType.TOGGLE_FAVORITE,
    payload: id,
  };
};

const getOffersAsync = () => (dispatch, getState, api) => {
  return api.get(`/hotels`)
    .then((response) => {
      const serverOffers = adaptOffers(response.data);
      dispatch(setServerOffers(serverOffers));

      const cities = getNonRepeatingCities(serverOffers);
      dispatch(setCities(cities));

      const activeCity = cities[0];
      dispatch(setActiveCity(activeCity));

      const sortedOffers = getSortedOffers(getState());
      dispatch(setOffers(sortedOffers));

      dispatch(setIsDataLoaded(true));
    });
};

const getFavoriteOffersAsync = () => (dispatch, getState, api) => {
  return api.get(`/favorite`)
    .then((response) => {
      dispatch(setFavoriteOffers(adaptOffers(response.data)));
    });
};

const toggleFavoriteAsync = (id, status) => (dispatch, getState, api) => {
  return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      history.push(AppRoute.LOGIN);
      dispatch(toggleFavorite({
        id: response.data.id,
        isFavorite: response.data.is_favorite,
      }));
    })
    .catch(() => {
    });
};

const getReviewsAsync = (id) => (dispatch, getState, api) => {
  return api.get(`/comments/${id}`)
    .then((response) => {
      const serverReviews = adaptReviews(response.data);
      const reviews = (serverReviews.length <= 10) ? serverReviews : serverReviews.slice(0, 10);
      const sortedReviews = sortByDate(reviews);
      dispatch(setReviews(sortedReviews, id));
    });
};

const setReviewsAsync = (id, data) => (dispatch, getState, api) => {
  return api.post(`/comments/${id}`, data)
    .then((response) => {
      const reviews = adaptReviews(response.data);
      dispatch(setReviews(reviews, id));
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
  }

  return state;
};

export {reducer, getOffersAsync, getReviewsAsync, setReviewsAsync, toggleFavoriteAsync, getFavoriteOffersAsync};
