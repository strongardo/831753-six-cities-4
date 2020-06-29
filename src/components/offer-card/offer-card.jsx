import React from "react";
import PropTypes from "prop-types";

const OfferCard = (props) => {
  const {offer, onCardHover, onCardTitleClick} = props;
  const {name, type, price, url, starsCount, isPremium, id} = offer;

  const handleHover = () => {
    onCardHover(id);
  };

  const handleTitleClick = (evt) => {
    evt.preventDefault();

    onCardTitleClick(id);
  };

  const premiumMarkup = isPremium ?
    (<div className="place-card__mark">
      <span>Premium</span>
    </div>)
    : null;

  const raitingPercent = `${starsCount * 20}%`;

  return (
    <article className="cities__place-card place-card" onMouseOver={handleHover}>
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
          <button className="place-card__bookmark-button button" type="button">
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
          <a href="#" className="place-card__link" onClick={handleTitleClick}>
            {name}
          </a>
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
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default OfferCard;
