import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const markers = [{
  coordinates: [52.3809553943508, 4.939309666406198],
  id: 3
}];

it(`Should Map render correctly`, () => {
  const tree = renderer
    .create(
        <Map markers={markers} />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
