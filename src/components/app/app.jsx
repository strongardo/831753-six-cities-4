import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentId: null,
    };

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderPage()}
          </Route>
          <Route exact path="/dev-offer">
            <OfferPage
              currentId={1}
              onCardTitleClick={this._handleCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderPage() {
    const currentId = this.state.currentId;

    if (currentId) {
      return (
        <OfferPage
          currentId={currentId}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    } else {
      return (
        <Main
          cities={this.props.cities}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    }
  }

  _handleCardTitleClick(id) {
    this.setState({
      currentId: id,
    });
  }
}

App.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};

export default App;
