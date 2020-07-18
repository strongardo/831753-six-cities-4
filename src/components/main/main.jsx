import React from "react";
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import Map from "../map/map.jsx";
import Sort from "../sort/sort.jsx";
import EmptyCitiesContainer from "../empty-cities-container/empty-cities-container.jsx";
import {withActiveId} from "../../hocs/with-active-id/with-active-id.jsx";
import {getCity, getOffers} from "../../reducer/condition/selectors.js";
import {getUserStatus, getUserData} from "../../reducer/user/selectors.js";

const Main = (props) => {
  const {city, offers, activeCardId, onActiveCardIdChange} = props;

  const markers = offers.map(({coordinates, id}) => ({
    coordinates,
    id,
  }));

  const citiesContainerMarkup = offers.length
    ? (<div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {`${offers.length} places to stay in ${city.name}`}
        </b>
        {(offers.length) ? <Sort /> : null}
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            offers={offers}
            onCardHover={onActiveCardIdChange}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          {(offers.length) ?
            <Map
              city={city}
              markers={markers}
              activeMarker={activeCardId}
            />
            : null}
        </section>
      </div>
    </div>)
    : <EmptyCitiesContainer city={city.name}/>;

  const markup = (
    <div className="page page--gray page--main">
      <Header />
      <main className={clsx(`page__main page__main--index`, !offers.length && `page__main--index-empty`)}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        <div className="cities">
          {citiesContainerMarkup}
        </div>
      </main>
    </div>
  );

  return markup;
};

Main.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    zoom: PropTypes.number.isRequired,
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
  activeCardId: PropTypes.number.isRequired,
  onActiveCardIdChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    city: getCity(state),
    offers: getOffers(state),
    userStatus: getUserStatus(state),
    userData: getUserData(state),
  };
};

export {Main};
export default withActiveId(connect(mapStateToProps)(Main));
