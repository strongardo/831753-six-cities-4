import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {UserStatus} from "../../const.js";
import {Router} from 'react-router-dom';
import history from '../../history.js';

const userStatus = UserStatus.AUTH;
const userData = {
  avatarUrl: `/img/avatar-angelina.jpg`,
  email: `mail@ln.kg`,
  isPro: false,
  name: ``,
};

it(`Render Header`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            userStatus={userStatus}
            userData={userData}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
