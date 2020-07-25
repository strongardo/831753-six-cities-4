import React from "react";
import renderer from "react-test-renderer";
import {Login} from "./login.jsx";
import {Router} from 'react-router-dom';
import history from '../../history.js';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {UserStatus} from "../../const.js";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`Render Login`, () => {
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
            <Login
              onSubmit={()=>{}}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
