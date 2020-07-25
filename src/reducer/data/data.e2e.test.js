import {reducer, ActionType} from "./data.js";

const offers = [
  {
    name: `The house among olive`,
    descriptions: [`The house among olive`],
    type: `house`,
    owner: {
      url: `/img/avatar-angelina.jpg`,
      name: `Angelina`,
      isSuper: false,
    },
    advantages: [`Laptop friendly workspace`],
    price: 813,
    url: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`,
    urls: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
    starsCount: 4.2,
    bedroomsCount: 3,
    guestsCount: 6,
    isPremium: true,
    isFavorite: true,
    coordinates: [52.3909553943508, 4.85309666406198],
    city: {
      name: `Paris`,
      coordinates: [52.38333, 4.9],
      zoom: 12,
      id: `Paris`,
    },
    reviews: [],
    id: 1,
  }
];

describe(`Data reducer tests`, () => {
  it(`The reducer without additional parameters should return the initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      serverOffers: null,
      isDataLoaded: false,
      favoriteOffers: [],
      nearestOffers: [],
    });
  });

  it(`The reducer should change the initial values to new ones`, () => {
    expect(reducer({
      serverOffers: null,
      isDataLoaded: false,
      favoriteOffers: [],
      nearestOffers: [],
    }, {
      type: ActionType.SET_SERVER_OFFERS,
      payload: offers,
    })).toEqual({
      serverOffers: offers,
      isDataLoaded: false,
      favoriteOffers: [],
      nearestOffers: [],
    });

    expect(reducer({
      serverOffers: offers,
      isDataLoaded: false,
      favoriteOffers: [],
      nearestOffers: [],
    }, {
      type: ActionType.SET_IS_DATA_LOADED,
      payload: true,
    })).toEqual({
      serverOffers: offers,
      isDataLoaded: true,
      favoriteOffers: [],
      nearestOffers: [],
    });

    expect(reducer({
      serverOffers: offers,
      isDataLoaded: true,
      favoriteOffers: [],
      nearestOffers: [],
    }, {
      type: ActionType.SET_FAVORITE_OFFERS,
      payload: offers,
    })).toEqual({
      serverOffers: offers,
      isDataLoaded: true,
      favoriteOffers: offers,
      nearestOffers: [],
    });

    expect(reducer({
      serverOffers: offers,
      isDataLoaded: true,
      favoriteOffers: [],
      nearestOffers: [],
    }, {
      type: ActionType.SET_NEAREST_OFFERS,
      payload: offers,
    })).toEqual({
      serverOffers: offers,
      isDataLoaded: true,
      favoriteOffers: [],
      nearestOffers: offers,
    });

  });
});
