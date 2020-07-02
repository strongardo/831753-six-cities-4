import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveCity} from "../../reducer.js";
import PropTypes from "prop-types";
import clsx from "clsx";

const CitiesList = (props) => {

  const handleCityClick = (city) => {
    props.setActiveCity(city.id);
  };

  const citiesMarkup = props.cities.map((city) => {
    return (
      <li key={city.id} className="locations__item">
        <a
          className={clsx(`locations__item-link tabs__item`, (props.city.id === city.id) && `tabs__item--active`)}
          onClick={() => handleCityClick(city)}>
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
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  setActiveCity: PropTypes.func.isRequired,
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({setActiveCity}, dispatch);
};

export {CitiesList};
export default connect(null, matchDispatchToProps)(CitiesList);
