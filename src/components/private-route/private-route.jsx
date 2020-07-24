import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const.js";
import {UserStatus} from "../../const.js";
import {getUserStatus} from "../../reducer/user/selectors.js";


const PrivateRoute = (props) => {
  const {children, userStatus, path, exact} = props;

  if (userStatus !== UserStatus.AUTH && path === AppRoute.ELECT) {
    return <Redirect to={AppRoute.LOGIN} />;
  }
  if (userStatus === UserStatus.AUTH && path === AppRoute.LOGIN) {
    return <Redirect to={AppRoute.ROOT} />;
  }
  return (
    <Route
      path={path}
      exact={exact}
    >
      {children}
    </ Route>
  );
};

PrivateRoute.propTypes = {
  userStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
