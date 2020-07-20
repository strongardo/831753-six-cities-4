import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import clsx from "clsx";
import {toggleFavoriteAsync} from "../../reducer/data/data.js";
import {connect} from "react-redux";
// import {withActiveFlag} from "../../hocs/with-active-flag/with-active-flag.jsx";

const OfferCard = (props) => {
  const {offer, onCardHover} = props;
  const {name, type, price, url, starsCount, isPremium, isFavorite, id} = offer;

  const handleCardMouseOver = () => {
    if (onCardHover) {
      onCardHover(id);
    }
  };

  const handleCardMouseOut = () => {
    if (onCardHover) {
      onCardHover();
    }
  };

  const premiumMarkup = isPremium ?
    (<div className="place-card__mark">
      <span>Premium</span>
    </div>)
    : null;

  const raitingPercent = `${starsCount * 20}%`;

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={handleCardMouseOver}
      onMouseOut={handleCardMouseOut}>
      {premiumMarkup}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.OFFER}${id}`} className="place-card__link">
          <img
            className="place-card__image"
            src={url}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={clsx(`place-card__bookmark-button button`, isFavorite && `place-card__bookmark-button--active`)}
            type="button"
            onClick={() => {
              const status = (isFavorite) ? 0 : 1;
              props.onFavoriteButtonClick(offer.id, status);
            }}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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

OfferCard.propTypes = {
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
  onCardHover: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  // onActiveChange: PropTypes.func.isRequired,
  // isActive: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(id, status) {
    dispatch(toggleFavoriteAsync(id, status));
  },
});

export {OfferCard};
export default connect(null, mapDispatchToProps)(OfferCard);
