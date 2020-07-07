import React from "react";
import {connect} from "react-redux";
import {setActiveCity} from "../../reducer/reducer.js";
import PropTypes from "prop-types";
import clsx from "clsx";
import {sortOffersByType} from "../../utils.js";

const CitiesList = (props) => {

  const citiesMarkup = props.cities.map((city) => {
    return (
      <li key={city.id} className="locations__item">
        <a
          className={clsx(`locations__item-link tabs__item`, (props.city.id === city.id) && `tabs__item--active`)}
          onClick={() => props.onCityClick(city, props.serverOffers, props.sortType)}>
          <span>{city.name}</span>
        </a>
      </li>
    );
  });

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesMarkup}
      </ul>
    </section>
  );
};

CitiesList.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        starsCount: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  sortType: PropTypes.string,
  serverOffers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        starsCount: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({city, offers, sortType, serverOffers}) => ({city, offers, sortType, serverOffers});

const matchDispatchToProps = (dispatch) => ({
  onCityClick(city, serverOffers, sortType) {
    const filteredOffers = serverOffers.filter((offer) => {
      return offer.cityIds.includes(city.id);
    });
    const offers = sortOffersByType(filteredOffers, sortType);
    dispatch(setActiveCity(city, offers));
  },
});

export {CitiesList};
export default connect(mapStateToProps, matchDispatchToProps)(CitiesList);
