import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

const OffersList = (props) => {
  const {offers, onCardHover} = props;
  return offers.map((offer) => {
    return <OfferCard
      key={offer.id}
      offer={offer}
      onCardHover={onCardHover}
    />;
  });
};

OffersList.propTypes = {
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
  onCardHover: PropTypes.func,
};

export default OffersList;
