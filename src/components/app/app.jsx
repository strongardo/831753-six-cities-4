import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import NoDataContainer from "../no-data-container/no-data-container.jsx";
import Login from "../login/login.jsx";
import Elect from "../elect/elect.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {getIsDataLoaded} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
import history from "../../history.js";

const App = (props) => {
  const {isDataLoaded} = props;

  return (
    <Router history={history}>
      {(isDataLoaded) ?
        <Switch>
          <Route exact path={AppRoute.ROOT} component={Main} />
          <Route exact path={`${AppRoute.OFFER}:id`} component={OfferPage} />
          <PrivateRoute
            exact
            path={AppRoute.ELECT}
          >
            <Elect />
          </PrivateRoute>
          <PrivateRoute
            exact
            path={AppRoute.LOGIN}
          >
            <Login />
          </PrivateRoute>
        </Switch>
        :
        <NoDataContainer />
      }
    </Router>
  );
};

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
