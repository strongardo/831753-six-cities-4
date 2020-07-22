import React, {PureComponent} from "react";
import Header from "../header/header.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFavoriteOffersAsync} from "../../reducer/data/data.js";
import {getFavoriteOffers} from "../../reducer/data/selectors.js";
import clsx from "clsx";
import {getNonRepeatingCities} from "../../utils.js";
import FavoriteItem from "../favorite-item/favorite-item.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

class Elect extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const isEmpty = this.props.favoriteOffers.length === 0;

    const emptyMarkup = (
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

    const getListMarkup = () => {
      const favoriteOffers = this.props.favoriteOffers;
      const cities = getNonRepeatingCities(favoriteOffers);

      return cities.map((city) => {
        const offers = favoriteOffers.filter((offer) => city.name === offer.city.name);
        return <FavoriteItem key={city.name} city={city} offers={offers} />;
      });
    };

    const getNotEmptyMarkup = () => {
      return (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {getListMarkup()}
              </ul>
            </section>
          </div>
        </main>
      );
    };

    return (
      <div className={clsx(`page`, isEmpty && `page--favorites-empty`)}>
        <Header />
        {(isEmpty) ? emptyMarkup : getNotEmptyMarkup()}
        <footer className="footer">
          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
          </Link>
        </footer>
      </div>
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
  downloadFavoriteOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
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

