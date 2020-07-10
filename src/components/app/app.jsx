import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import NoDataContainer from "../no-data-container/no-data-container.jsx";
import {getIsDataLoaded} from "../../reducer/data/selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentId: null,
    };

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);
  }

  render() {
    if (this.props.isDataLoaded) {
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
    } else {
      return <NoDataContainer />;
    }
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
  isDataLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isDataLoaded: getIsDataLoaded(state),
  };
};

export {App};
export default connect(mapStateToProps)(App);
