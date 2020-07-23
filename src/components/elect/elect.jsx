import React, {PureComponent} from "react";
import Header from "../header/header.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFavoriteOffersAsync} from "../../reducer/data/data.js";
import {getServerOffers, getFavoriteOffers} from "../../reducer/data/selectors.js";
import clsx from "clsx";
import {getNonRepeatingCities} from "../../utils.js";
import FavoriteItem from "../favorite-item/favorite-item.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

class Elect extends PureComponent {
  constructor(props) {
    super(props);

    this._emptyMarkup = (
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  componentDidMount() {
    this.props.downloadFavoriteOffers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.favoriteOffers.length !== prevProps.favoriteOffers.length) {
      this.props.downloadFavoriteOffers();
    }
  }

  _getFavoriteOffersFromOffers() {
    return this.props.offers.filter((item) => {
      return this.props.favoriteOffers.some((favoriteOffer) => favoriteOffer.id === item.id && item.isFavorite);
    });
  }

  _getListMarkup(favoriteOffers) {
    const cities = getNonRepeatingCities(favoriteOffers);

    return cities.map((city) => {
      const offers = favoriteOffers.filter((offer) => city.name === offer.city.name);
      return <FavoriteItem key={city.name} city={city} offers={offers} />;
    });
  }

  _getNotEmptyMarkup(favoriteOffers) {
    return (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {this._getListMarkup(favoriteOffers)}
            </ul>
          </section>
        </div>
      </main>
    );
  }

  render() {
    const favoriteOffers = this._getFavoriteOffersFromOffers();
    const isEmpty = favoriteOffers.length === 0;

    return (
      <div className={clsx(`page`, isEmpty && `page--favorites-empty`)}>
        <Header />
        {(isEmpty) ? this._emptyMarkup : this._getNotEmptyMarkup(favoriteOffers)}
        <footer className="footer">
          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>
        </footer>
      </div>
    );
  }
}

Elect.propTypes = {
  favoriteOffers: PropTypes.arrayOf(
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
  downloadFavoriteOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    offers: getServerOffers(state),
    favoriteOffers: getFavoriteOffers(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  downloadFavoriteOffers() {
    dispatch(getFavoriteOffersAsync());
  },
});

export {Elect};
export default connect(mapStateToProps, mapDispatchToProps)(Elect);

