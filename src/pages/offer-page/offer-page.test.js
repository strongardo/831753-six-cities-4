import React from "react";
import renderer from "react-test-renderer";
import {OfferPage} from "./offer-page.jsx";
import configureStore from "redux-mock-store";
import {Router} from 'react-router-dom';
import history from '../../history.js';
import NameSpace from "../../reducer/name-space.js";
import {UserStatus} from "../../const.js";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const match = {
  params: {
    id: `1`,
  },
};

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


it(`Should OfferPage render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      userStatus: UserStatus.AUTH,
      userData: {
        avatarUrl: `/img/avatar-angelina.jpg`,
        email: `mail@ln.kg`,
        isPro: false,
        name: ``,
      },
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <OfferPage
              userStatus={UserStatus.AUTH}
              match={match}
              offers={offers}
              nearestOffers={offers}
              onFavoriteButtonClick={() => {}}
              downloadReviews={() => {}}
              downloadNearestOffers={() => {}}
            />
          </Router>
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
