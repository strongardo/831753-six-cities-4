import React from "react";
import renderer from "react-test-renderer";
import NoDataContainer from "./no-data-container.jsx";

it(`Should NoDataContainer render correctly`, () => {
  const tree = renderer
    .create(<NoDataContainer />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
