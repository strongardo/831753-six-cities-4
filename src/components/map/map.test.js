import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const city = {
  coordinates: [52.38333, 4.9],
  zoom: 12,
};

const markers = [{
  coordinates: [52.3909553943508, 4.85309666406198],
  id: 1
}];

it(`Should Map render correctly`, () => {
  const tree = renderer
    .create(
        <Map
          markers={markers}
          city={city}
        />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
