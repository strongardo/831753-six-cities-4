import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";
import {SortType, UserStatus} from "../../const.js";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      serverOffers: [
        {
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
        }
      ],
      isDataLoaded: true,
    },
    [NameSpace.CONDITION]: {
      city: {
        name: `Paris`,
        coordinates: [52.38333, 4.9],
        zoom: 12,
        id: `Paris`,
      },
      sortType: SortType.POPULAR,
    },
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
          <App isDataLoaded={true} />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
