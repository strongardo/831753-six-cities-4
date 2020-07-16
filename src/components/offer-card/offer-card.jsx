import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import clsx from "clsx";
import {withActiveFlag} from "../../hocs/with-active-flag/with-active-flag.jsx";
import {setFavoriteOffers} from "../../reducer/condition/condition.js";
import {connect} from "react-redux";
import {getFavoriteOffers} from "../../reducer/condition/selectors.js";

const OfferCard = (props) => {
  const {offer, onCardHover, favoriteOffers} = props;
  const {name, type, price, url, starsCount, isPremium, id} = offer;

  const isContains = favoriteOffers.some((favoriteOffer) => {
    return favoriteOffer.payload.id === offer.id;
  });

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
        <a href="#">
          <img
            className="place-card__image"
            src={url}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={clsx(`place-card__bookmark-button button`, isContains && `place-card__bookmark-button--active`)}
            type="button"
            onClick={() => {
              props.onActiveChange();
              props.onFavoriteButtonClick(offer);
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
    id: PropTypes.number.isRequired,
  }).isRequired,
  onCardHover: PropTypes.func,
  onActiveChange: PropTypes.func.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    favoriteOffers: getFavoriteOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(offer) {
    dispatch(setFavoriteOffers(offer));
  },
});

export {OfferCard};
export default withActiveFlag(connect(mapStateToProps, mapDispatchToProps)(OfferCard));
