import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import NoDataContainer from "../no-data-container/no-data-container.jsx";
import Login from "../login/login.jsx";
import Elect from "../elect/elect.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {getIsDataLoaded} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
// import history from "../../history.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isDataLoaded) {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path={AppRoute.ROOT} component={Main} />
            <Route exact path={AppRoute.LOGIN} component={Login} />
            <Route exact path={`${AppRoute.OFFER}:id`} component={OfferPage} />
            <PrivateRoute
              exact
              path={AppRoute.ELECT}
              render={() => {
                return (
                  <Elect />
                );
              }}
            />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return <NoDataContainer />;
    }
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
