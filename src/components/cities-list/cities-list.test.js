import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list.jsx";

const cities = [
  {
    name: `Paris`,
    id: `Paris`,
  },
];

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(<CitiesList
      city={cities[0]}
      cities={cities}
      onCityClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
