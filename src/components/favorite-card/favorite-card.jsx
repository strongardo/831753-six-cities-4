import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute, RATING_MULTIPLIER, FAVORITE_STATUS_FALSE} from "../../const.js";
import {toggleFavoriteAsync} from "../../reducer/data/data.js";
import {connect} from "react-redux";
import clsx from "clsx";

const FavoriteCard = (props) => {
  const {offer} = props;
  const {name, type, price, url, starsCount, id, isFavorite} = offer;

  const raitingPercent = `${starsCount * RATING_MULTIPLIER}%`;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.OFFER}${id}`} className="place-card__link">
          <img className="place-card__image" src={url} width={150} height={110} alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={clsx(`place-card__bookmark-button button`, isFavorite && `place-card__bookmark-button--active`)}
            type="button"
            onClick={() => {
              props.onFavoriteButtonClick(id);
            }}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: raitingPercent}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.OFFER}${id}`} className="place-card__link">{name}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

FavoriteCard.propTypes = {
  offer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    starsCount: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(id) {
    dispatch(toggleFavoriteAsync(id, FAVORITE_STATUS_FALSE));
  },
});

export {FavoriteCard};
export default connect((state) => state, mapDispatchToProps)(FavoriteCard);
