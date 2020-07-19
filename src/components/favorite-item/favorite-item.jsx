import React from "react";
import PropTypes from "prop-types";
import FavoriteCard from "../favorite-card/favorite-card.jsx";

const FavoriteItem = (props) => {
  const {offers, city} = props;

  const getListMarkup = () => {
    return offers.map((offer) => {
      return <FavoriteCard key={offer.id} offer={offer} />;
    });
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city.name}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {getListMarkup()}
      </div>
    </li>
  );
};

FavoriteItem.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        starsCount: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default FavoriteItem;
