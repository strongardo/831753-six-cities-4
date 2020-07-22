import React, {PureComponent} from "react";
import OffersList from "../offers-list/offers-list.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getNearestOffersAsync} from "../../reducer/data/data.js";
import {maxNumberOfNearestOffers} from "../../const.js";


class NearestList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.offers.length) {
      const offers = this.props.offers.slice(0, maxNumberOfNearestOffers);
      return (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={offers}
              />
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.props.downloadNearestOffers(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.downloadNearestOffers(this.props.id);
    }
  }
}

NearestList.propTypes = {
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
  downloadNearestOffers: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  downloadNearestOffers(id) {
    dispatch(getNearestOffersAsync(id));
  },
});

export {NearestList};
export default connect(null, mapDispatchToProps)(NearestList);

