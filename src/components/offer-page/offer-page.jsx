import React from "react";
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {SortType} from "../../const.js";
import Header from "../header/header.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import Map from "../map/map.jsx";
import OffersList from "../offers-list/offers-list.jsx";
import {getOffers, getCity} from "../../reducer/condition/selectors.js";
import {getUserStatus} from "../../reducer/user/selectors.js";
import {UserStatus} from "../../const.js";

const OfferPage = (props) => {
  const currentId = Number(props.match.params.id);
  const {offers, city, userStatus} = props;

  const currentOffer = offers.find((offer) => {
    return offer.id === currentId;
  });
  const nearestOffers = offers.filter((offer) => offer.id !== currentId);

  const {
    name,
    descriptions,
    advantages,
    type,
    owner,
    price,
    urls,
    starsCount,
    bedroomsCount,
    guestsCount,
    isPremium,
    reviews,
  } = currentOffer;

  const markers = offers.map(({coordinates, id}) => ({
    id,
    coordinates,
  }));

  const photosMarkup = urls.slice(0, 6).map((photoUrl) => {
    return (
      <div className="property__image-wrapper" key={photoUrl}>
        <img className="property__image" src={photoUrl} alt="Photo studio" />
      </div>
    );
  });

  const advantagesMarkup = advantages.map((advantage) => {
    return (
      <li className="property__inside-item" key={advantage}>
        {advantage}
      </li>
    );
  });

  const premiumMarkup = isPremium ? (
    <div className="property__mark">
      <span>Premium</span>
    </div>
  ) : null;

  const descriptionMarkup = descriptions.map((description) => {
    return (
      <p className="property__text" key={description}>
        {description}
      </p>
    );
  });

  const starsQuantity = starsCount <= 5 ? starsCount : 5;
  const raitingPercent = `${Math.round(starsQuantity) * 20}%`;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">{photosMarkup}</div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {premiumMarkup}
              <div className="property__name-wrapper">
                <h1 className="property__name">{name}</h1>
                <button
                  className="property__bookmark-button button"
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width={31}
                    height={33}
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: raitingPercent}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {starsQuantity}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedroomsCount} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {guestsCount} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">{advantagesMarkup}</ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={clsx(`property__avatar-wrapper`, (owner.isSuper) && `property__avatar-wrapper--pro`, `user__avatar-wrapper`)}>
                    <img
                      className="property__avatar user__avatar"
                      src={owner.url}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{owner.name}</span>
                </div>
                <div className="property__description">{descriptionMarkup}</div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList id={currentId} reviews={reviews} />
                {(userStatus === UserStatus.AUTH) ? <ReviewsForm id={currentId}/> : null}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              markers={markers}
              activeMarker={currentId}
              city={city}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={nearestOffers}
                sortType={SortType.POPULAR}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferPage.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  offers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    advantages: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urls: PropTypes.arrayOf(PropTypes.string).isRequired,
    starsCount: PropTypes.number.isRequired,
    bedroomsCount: PropTypes.number.isRequired,
    guestsCount: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number.isRequired,
  })).isRequired,
  userStatus: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    offers: getOffers(state),
    city: getCity(state),
    userStatus: getUserStatus(state),
  };
};

export {OfferPage};
export default connect(mapStateToProps)(OfferPage);
