import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offer: null,
    };

    this.coordinates = this.props.offers.map(({ coordinates, id }) => ({
      id,
      coordinates,
    }));

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);
  }

  render() {
    const nearestOffers = this.props.offers.slice(2, 4);

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderPage()}
          </Route>
          <Route exact path="/dev-offer">
            <OfferPage
              offer={this.props.offers[1]}
              coordinates={this.coordinates}
              // for list
              nearestOffers={nearestOffers}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderPage() {
    const offer = this.state.offer;

    if (offer) {
      return (
        <OfferPage
          offer={offer}
          nearestOffers={this.props.offers}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    } else {
      return (
        <Main
          offersCount={this.props.offersCount}
          offers={this.props.offers}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    }
  }

  _handleCardTitleClick(currentOffer) {
    this.setState({
      offer: currentOffer,
    });
  }
}

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(
    PropTypes.shape({
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
      url: PropTypes.string.isRequired,
      urls: PropTypes.arrayOf(PropTypes.string).isRequired,
      starsCount: PropTypes.number.isRequired,
      bedroomsCount: PropTypes.number.isRequired,
      guestsCount: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default App;
