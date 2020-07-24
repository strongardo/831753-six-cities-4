import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list.jsx";

const cities = [
  {
    name: `Paris`,
    id: 1,
  },
];

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(<CitiesList
      city={cities[0]}
      cities={cities}
      setActiveCity={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
