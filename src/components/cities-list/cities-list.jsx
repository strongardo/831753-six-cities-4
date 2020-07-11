import React from "react";
import {connect} from "react-redux";
import {setActiveCity, setOffers} from "../../reducer/condition/condition.js";
import PropTypes from "prop-types";
import clsx from "clsx";
import {sortOffersByType} from "../../utils.js";
import {getCity, getCities, getOffers, getSortType} from "../../reducer/condition/selectors.js";
import {getServerOffers} from "../../reducer/data/selectors.js";

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
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
  ).isRequired,
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

// достаю из стора нужные данные с помощью селекторов.
// вот тут селекторы можно использовать, так как есть доступ к стор(state)
const mapStateToProps = (state) => {
  return {
    city: getCity(state),
    cities: getCities(state),
    offers: getOffers(state),
    sortType: getSortType(state),
    serverOffers: getServerOffers(state),
  };
};

// а тут не получается воспользоваться селекторами, а хотелось сделать getSortedOffers
const matchDispatchToProps = (dispatch) => ({
  onCityClick(city, serverOffers, sortType) {
    const filteredOffers = serverOffers.filter((offer) => {
      return offer.city.name === city.name;
    });
    const offers = sortOffersByType(filteredOffers, sortType);
    dispatch(setActiveCity(city));
    dispatch(setOffers(offers));
  },
});

export {CitiesList};
export default connect(mapStateToProps, matchDispatchToProps)(CitiesList);
