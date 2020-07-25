import React from "react";
import renderer from "react-test-renderer";
import {ReviewsForm} from "./reviews-form.jsx";

it(`Should ReviewsForm render correctly`, () => {
  const tree = renderer
    .create(
        <ReviewsForm
          text={`The house among olive`}
          starsCount={5}
          allDisabled={false}
          isError={false}
          onTextAriaChange={()=>{}}
          onRadioChange={()=>{}}
          allDisabledChange={()=>{}}
          onErrorForAlert={()=>{}}
          sendReview={()=>{}}
          id={1}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
