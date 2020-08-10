import React, {useState} from "react";
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../../components/header/header.jsx";
import CitiesList from "../../components/cities-list/cities-list.jsx";
import OffersList from "../../components/offers-list/offers-list.jsx";
import Map from "../../components/map/map.jsx";
import Sort from "../../components/sort/sort.jsx";
import EmptyCitiesContainer from "../../components/empty-cities-container/empty-cities-container.jsx";
import {getCity, getOffers} from "../../components/../reducer/condition/selectors.js";

const Main = (props) => {
  const {city, offers} = props;

  const [activeCardId, setActiveCardId] = useState();

  const markers = offers.map(({coordinates, id}) => ({
    coordinates,
    id,
  }));

  const onActiveCardIdChange = (id) => {
    if (activeCardId) {
      setActiveCardId(0);
    } else {
      setActiveCardId(id);
    }
  };

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
};

const mapStateToProps = (state) => {
  return {
    city: getCity(state),
    offers: getOffers(state),
  };
};

export {Main};
export default connect(mapStateToProps)(Main);
