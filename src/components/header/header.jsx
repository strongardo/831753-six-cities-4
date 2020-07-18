import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCity, getOffers} from "../../reducer/condition/selectors.js";
import {getUserStatus, getUserData} from "../../reducer/user/selectors.js";
import {UserStatus} from "../../const.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const Header = (props) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className="header__logo-link"
              to={AppRoute.ROOT}
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={(props.userStatus === UserStatus.NO_AUTH)
                    ? AppRoute.LOGIN
                    : AppRoute.ELECT}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    {(props.userStatus === UserStatus.NO_AUTH)
                      ? `Sign In`
                      : `${props.userData.email}`}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userStatus: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    city: getCity(state),
    offers: getOffers(state),
    userStatus: getUserStatus(state),
    userData: getUserData(state),
  };
};

export {Header};
export default connect(mapStateToProps)(Header);
