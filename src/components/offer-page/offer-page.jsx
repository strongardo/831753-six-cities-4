import React from "react";
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import NearestList from "../nearest-list/nearest-list.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import Map from "../map/map.jsx";
import {getUserStatus} from "../../reducer/user/selectors.js";
import {getServerOffers, getNearestOffers} from "../../reducer/data/selectors.js";
import {UserStatus, maxNumberOfStars, raitingMultiplier, favoriteStatusFalse, favoriteStatusTrue, maxNumberOfPhotos, maxNumberOfNearestOffers} from "../../const.js";
import {toggleFavoriteAsync} from "../../reducer/data/data.js";

const OfferPage = (props) => {
  const {userStatus, offers, onFavoriteButtonClick} = props;
  const offer = offers.find((serverOffer) => serverOffer.id === Number(props.match.params.id));
  const nearestOffers = offers.filter((item) => {
    return props.nearestOffers.some((nearestOffer) => nearestOffer.id === item.id);
  });

  const {
    id,
    coordinates,
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
    isFavorite,
    isPremium,
    reviews,
    city,
  } = offer;

  const getMapMarkup = () => {
    if (nearestOffers.length) {
      const markers = nearestOffers.map((nearestOffer) => {
        return {
          coordinates: nearestOffer.coordinates,
          id: nearestOffer.id,
        };
      }).slice(0, maxNumberOfNearestOffers);
      markers.push({
        id,
        coordinates,
      });
      return (
        <section className="property__map map">
          <Map
            markers={markers}
            activeMarker={id}
            city={city}
          />
        </section>
      );
    } else {
      return null;
    }
  };

  const photosMarkup = urls.slice(0, maxNumberOfPhotos).map((photoUrl) => {
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

  const starsQuantity = starsCount <= maxNumberOfStars ? starsCount : maxNumberOfStars;
  const raitingPercent = `${Math.round(starsQuantity) * raitingMultiplier}%`;

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
                  className={clsx(`property__bookmark-button button`, isFavorite && `property__bookmark-button--active`)}
                  type="button"
                  onClick={() => {
                    const status = (isFavorite) ? favoriteStatusFalse : favoriteStatusTrue;
                    onFavoriteButtonClick(id, status);
                  }}
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
                <ReviewsList id={id} reviews={reviews} />
                {(userStatus === UserStatus.AUTH) ? <ReviewsForm id={id}/> : null}
              </section>
            </div>
          </div>
          {getMapMarkup()}
        </section>
        <NearestList id={id} offers={nearestOffers} />
      </main>
    </div>
  );
};

OfferPage.propTypes = {
  userStatus: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  nearestOffers: PropTypes.arrayOf(
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
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
          zoom: PropTypes.number.isRequired,
        }),
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
        isFavorite: PropTypes.bool.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number),
        id: PropTypes.number.isRequired,
        reviews: PropTypes.array.isRequired,
      })
  ).isRequired,
};

const mapStateToProps = (state) => {
  return {
    offers: getServerOffers(state),
    nearestOffers: getNearestOffers(state),
    userStatus: getUserStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(id, status) {
    dispatch(toggleFavoriteAsync(id, status));
  },
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
