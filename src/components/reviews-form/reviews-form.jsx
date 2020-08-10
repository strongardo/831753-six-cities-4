import React, {useState} from "react";
import {connect} from "react-redux";
import {setReviewsAsync} from "../../reducer/data/data.js";
import PropTypes from "prop-types";
import {
  AUXILIARY_NUMBER_FOR_RAITING,
  MAX_NUMBER_OF_STARS,
  MAX_NUMBER_OF_CHARACTERS,
  MIN_NUMBER_OF_CHARACTERS,
  NUMBER_FOR_LACK_OF_RATING
} from "../../const.js";

const ReviewsForm = (props) => {
  const {
    sendReview,
  } = props;

  const [text, setText] = useState(``);
  const [starsCount, setStarsCount] = useState(NUMBER_FOR_LACK_OF_RATING);
  const [allDisabled, setAllDisabled] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSuccess = () => {
    setAllDisabled(false);
    setText(``);
    setStarsCount(NUMBER_FOR_LACK_OF_RATING);
    setIsError(false);
  };

  const onError = () => {
    setAllDisabled(false);
    setIsError(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    setAllDisabled(true);

    sendReview(starsCount, text)
      .then(() => {
        onSuccess();
      })
      .catch(() => {
        onError();
      });
  };

  return (
    <form className="reviews__form form" onSubmit={onSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <p style={{color: `red`}}>
        {(isError) ? ` Something went wrong, please try again` : null}
      </p>
      <div className="reviews__rating-form form__rating">
        {Array.from({length: MAX_NUMBER_OF_STARS}).map((_, i) => (
          <React.Fragment key={i}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={i + 1}
              id={`${i}-stars`}
              type="radio"
              disabled={allDisabled}
              onChange={(evt) => {
                setStarsCount(AUXILIARY_NUMBER_FOR_RAITING - evt.target.value);
              }}
              checked={AUXILIARY_NUMBER_FOR_RAITING - starsCount === i + 1}
            />
            <label
              htmlFor={`${i}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        disabled={allDisabled}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{` `}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{` `}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            text.length < MIN_NUMBER_OF_CHARACTERS ||
            text.length > MAX_NUMBER_OF_CHARACTERS ||
            starsCount === NUMBER_FOR_LACK_OF_RATING ||
            allDisabled
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewsForm.propTypes = {
  sendReview: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  sendReview(starsCount, text) {
    return dispatch(
        setReviewsAsync(props.id, {
          comment: text,
          rating: starsCount,
        })
    );
  },
});

export {ReviewsForm};
export default connect(null, mapDispatchToProps)(ReviewsForm);
