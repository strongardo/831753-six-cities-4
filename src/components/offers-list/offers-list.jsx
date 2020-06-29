import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: 0,
    };

    this._handleCardHover = this._handleCardHover.bind(this);
  }

  render() {
    return this.props.offers.map((offer) => {
      const {id} = offer;
      return <OfferCard
        key={id}
        offer={offer}
        onCardHover={this._handleCardHover}
        onCardTitleClick={this.props.onCardTitleClick}
      />;
    });
  }

  _handleCardHover(id) {
    this.setState({activeCardId: id});
  }
}

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
  onCardTitleClick: PropTypes.func.isRequired,
};

export default OffersList;
