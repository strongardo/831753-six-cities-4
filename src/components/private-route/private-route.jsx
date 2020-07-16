import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const.js";
import {UserStatus} from "../../const.js";
import {getUserStatus} from "../../reducer/user/selectors.js";


const PrivateRoute = (props) => {
  const {render, path, exact, userStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          userStatus === UserStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  userStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
