import React from "react";
import {connect} from "react-redux";
import {setActiveCity} from "../../reducer/condition/condition.js";
import PropTypes from "prop-types";
import clsx from "clsx";
import {getCity, getCities} from "../../reducer/condition/selectors.js";

const CitiesList = (props) => {
  const {city, cities, onCityClick} = props;

  const citiesMarkup = cities.map((item) => {
    return (
      <li key={item.id} className="locations__item">
        <a
          className={clsx(`locations__item-link tabs__item`, (city.id === item.id) && `tabs__item--active`)}
          onClick={() => onCityClick(item)}>
          <span>{item.name}</span>
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
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  cities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
  ).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    city: getCity(state),
    cities: getCities(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(setActiveCity(city));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
