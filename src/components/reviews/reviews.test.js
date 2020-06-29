import React from "react";
import renderer from "react-test-renderer";
import Reviews from "./reviews.jsx";

const reviews = [
  {
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
    The building is green and from 18th century.`,
    starsCount: 1,
    url: `img/avatar-max.jpg`,
    name: `Max`,
    date: new Date(`2017-12-12`),
    id: 1,
  }
];


it(`Should Reviews render correctly`, () => {
  const tree = renderer
    .create(<Reviews reviews={reviews} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
