import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    isDataLoaded: true,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
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
