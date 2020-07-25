import React, {PureComponent} from "react";
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import Map from "../map/map.jsx";
import {getUserStatus} from "../../reducer/user/selectors.js";
import {getServerOffers, getNearestOffers} from "../../reducer/data/selectors.js";
import {UserStatus, MAX_NUMBER_OF_STARS, RATING_MULTIPLIER, FAVORITE_STATUS_FALSE, FAVORITE_STATUS_TRUE, MAX_NUMBER_OF_PHOTOS, MAX_NUMBER_OF_NEAREST_OFFERS} from "../../const.js";
import {toggleFavoriteAsync} from "../../reducer/data/data.js";
import OffersList from "../offers-list/offers-list.jsx";
import Review from "../review/review.jsx";
import {getReviewsAsync} from "../../reducer/data/data.js";
import {getNearestOffersAsync} from "../../reducer/data/data.js";

class OfferPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    this.props.downloadReviews(id);
    this.props.downloadNearestOffers(id);
  }

  componentDidUpdate(prevProps) {
    const id = Number(this.props.match.params.id);
    if (Number(prevProps.match.params.id) !== id) {
      this.props.downloadReviews(id);
      this.props.downloadNearestOffers(id);
    }
  }

  _getNearestOffersMarkup(nearestOffers) {
    if (this.props.offers.length) {
      const offers = nearestOffers.slice(0, MAX_NUMBER_OF_NEAREST_OFFERS);

      return (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={offers}
              />
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }

  _getMapMarkup(nearestOffers, id, coordinates, city) {
    if (nearestOffers.length) {
      const markers = nearestOffers.map((nearestOffer) => {
        return {
          coordinates: nearestOffer.coordinates,
          id: nearestOffer.id,
        };
      }).slice(0, MAX_NUMBER_OF_NEAREST_OFFERS);
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
  }

  render() {
    const {userStatus, offers, onFavoriteButtonClick} = this.props;
    const offer = offers.find((serverOffer) => serverOffer.id === Number(this.props.match.params.id));
    const nearestOffers = offers.filter((item) => {
      return this.props.nearestOffers.some((nearestOffer) => nearestOffer.id === item.id);
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

    const photosMarkup = urls.slice(0, MAX_NUMBER_OF_PHOTOS).map((photoUrl) => {
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

    const starsQuantity = starsCount <= MAX_NUMBER_OF_STARS ? starsCount : MAX_NUMBER_OF_STARS;
    const raitingPercent = `${Math.round(starsQuantity) * RATING_MULTIPLIER}%`;

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
                      const status = (isFavorite) ? FAVORITE_STATUS_FALSE : FAVORITE_STATUS_TRUE;
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
                  <h2 className="reviews__title">
                    Reviews · <span className="reviews__amount">{reviews.length}</span>
                  </h2>
                  {(reviews.length)
                    ? (
                      <ul className="reviews__list">
                        {reviews.map((review) => {
                          return <Review key={review.id} review={review} />;
                        })}
                      </ul>
                    )
                    : null}
                  {(userStatus === UserStatus.AUTH) ? <ReviewsForm id={id}/> : null}
                </section>
              </div>
            </div>
            {this._getMapMarkup(nearestOffers, id, coordinates, city)}
          </section>
          {this._getNearestOffersMarkup(nearestOffers)}
        </main>
      </div>
    );
  }
}

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
  downloadReviews: PropTypes.func.isRequired,
  downloadNearestOffers: PropTypes.func.isRequired,
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
  downloadReviews(id) {
    dispatch(getReviewsAsync(id));
  },
  downloadNearestOffers(id) {
    dispatch(getNearestOffersAsync(id));
  },
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
