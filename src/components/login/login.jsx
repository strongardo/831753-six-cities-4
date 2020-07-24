import React, {createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setUserStatusAsync} from "../../reducer/user/user.js";
import Header from "../header/header.jsx";

const Login = (props) => {
  const loginRef = createRef();
  const passwordRef = createRef();
  const onSubmit = props.onSubmit;

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt) => {
                evt.preventDefault();
                onSubmit(loginRef.current.value, passwordRef.current.value);
              }}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(login, password) {
    dispatch(setUserStatusAsync({
      login,
      password,
    }));
  },
});

export {Login};
export default connect(null, mapDispatchToProps)(Login);
