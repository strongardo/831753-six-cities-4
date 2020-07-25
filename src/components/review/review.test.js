import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";

const review = {
  text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
  The building is green and from 18th century.`,
  starsCount: 1,
  url: `img/avatar-max.jpg`,
  name: `Max`,
  date: `2019-05-08T14:13:56.569Z`,
  id: 1,
};


it(`Should Review render correctly`, () => {
  const tree = renderer
    .create(<Review review={review} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
