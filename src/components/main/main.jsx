import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CitiesList from "../cities-list/cities-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import Map from "../map/map.jsx";

const Main = (props) => {
  const {city, offers, cities, onCardTitleClick} = props;

  const markers = offers.map(({coordinates, id}) => ({
    coordinates,
    id,
  }));

  const titleText = offers.length
    ? `${offers.length} places to stay in ${city.name}`
    : `No places to stay available`;

  const formMarkup = offers.length
    ? (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li
            className="places__option places__option--active"
            tabIndex={0}
          >
            Popular
          </li>
          <li className="places__option" tabIndex={0}>
            Price: low to high
          </li>
          <li className="places__option" tabIndex={0}>
            Price: high to low
          </li>
          <li className="places__option" tabIndex={0}>
            Top rated first
          </li>
        </ul>
        {/*
        <select class="places__sorting-type" id="places-sorting">
          <option class="places__option" value="popular" selected="">Popular</option>
          <option class="places__option" value="to-high">Price: low to high</option>
          <option class="places__option" value="to-low">Price: high to low</option>
          <option class="places__option" value="top-rated">Top rated first</option>
        </select>
        */}
      </form>
    )
    : null;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList city={city} cities={cities} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {titleText}
              </b>
              {formMarkup}
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={offers}
                  onCardTitleClick={onCardTitleClick}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {offers.length && <Map markers={markers} />}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
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
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({city, offers}) => ({city, offers});

export {Main};
export default connect(mapStateToProps)(Main);
