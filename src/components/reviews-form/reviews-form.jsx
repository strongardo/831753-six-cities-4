import React from "react";
import {connect} from "react-redux";
import {setReviewsAsync} from "../../reducer/data/data.js";
import PropTypes from "prop-types";

const ReviewsForm = (props) => {
  const formRef = React.createRef();
  const buttonRef = React.createRef();

  let starsCount = 0;
  let text = ``;

  const toggleFormStatus = () => {
    formRef.current.querySelectorAll(`input, textarea, button`)
      .forEach((elem) => {
        elem.disabled = !elem.disabled;
      });
  };

  const onSuccess = () => {
    const form = formRef.current;
    toggleFormStatus(form);
    form.reset();
    starsCount = 0;
    buttonRef.current.disabled = true;
  };

  const onError = () => {
    const form = formRef.current;
    toggleFormStatus(form);
    form.querySelector(`textarea`).style.borderColor = `red`;
    setTimeout(() => {
      form.querySelector(`textarea`).style.borderColor = `#e6e6e6`;
    }, 1000);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    toggleFormStatus();

    props.onSubmit(props.id, starsCount, text, onSuccess, onError);
  };

  const onRadioChange = (evt) => {
    starsCount = evt.target.defaultValue;

    if (text.length >= 50 && text.length < 300) {
      buttonRef.current.disabled = false;
    }
  };

  const onTextAriaChange = (evt) => {
    text = evt.target.value;

    if (text.length >= 50 && text.length < 300) {
      if (starsCount) {
        buttonRef.current.disabled = false;
      }
    } else {
      buttonRef.current.disabled = true;
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit={onSubmit}
      ref = {formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          onChange={onRadioChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          onChange={onRadioChange}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          onChange={onRadioChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          onChange={onRadioChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          onChange={onRadioChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={``}
        onInput={onTextAriaChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{` `}
          <span className="reviews__star">rating</span> and
          describe your stay with at least{` `}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={true}
          ref={buttonRef}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, starsCount, text, onSuccess, onError) {
    dispatch(setReviewsAsync(id, {
      comment: text,
      rating: starsCount,
    }, onSuccess, onError));
  },
});


export {ReviewsForm};
export default connect(null, mapDispatchToProps)(ReviewsForm);
