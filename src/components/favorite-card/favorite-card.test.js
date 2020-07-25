import React from "react";
import renderer from "react-test-renderer";
import FavoriteCard from "./favorite-card.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from 'react-router-dom';
import history from '../../history.js';

const mockStore = configureStore([]);

const offer = {
  name: `The house among olive`,
  descriptions: `The house among olive`,
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
  id: 1,
};

it(`Should FavoriteCard render correctly`, () => {
  const store = mockStore({});
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <FavoriteCard
              offer={offer}
              onFavoriteButtonClick={() => {}}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
