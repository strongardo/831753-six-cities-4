import React from "react";
import renderer from "react-test-renderer";
import Sort from "./sort.jsx";

it(`Should Sort render correctly`, () => {
  const tree = renderer
    .create(<Sort onSortTypeChange={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
