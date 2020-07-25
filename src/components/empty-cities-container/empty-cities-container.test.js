import React from "react";
import renderer from "react-test-renderer";
import EmptyCitiesContainer from "./empty-cities-container.jsx";

it(`Should EmptyCitiesContainer render correctly`, () => {
  const tree = renderer
    .create(<EmptyCitiesContainer city={`Paris`} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
