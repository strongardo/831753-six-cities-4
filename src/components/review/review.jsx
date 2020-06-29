import React from "react";
import PropTypes from "prop-types";
import {dateToFormatString} from "../../utils.js";

const Review = (props) => {
  const {review} = props;
  const raitingPercent = `${review.starsCount * 20}%`;
  const date = dateToFormatString(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.url}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: raitingPercent}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.text}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {date}
        </time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    text: PropTypes.string.isRequired,
    starsCount: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Review;
