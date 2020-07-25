import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer.js";
import App from "./components/app/app.jsx";
import {createAPI} from "./api.js";
import {getOffersAsync} from "./reducer/data/data.js";
import {getUserStatusAsync, setUserStatus} from "./reducer/user/user.js";
import {UserStatus, ServerUrl, AppRoute} from "./const.js";
import history from "./history.js";

const onUnauthorized = (url) => {
  store.dispatch(setUserStatus(UserStatus.NO_AUTH));
  if (url !== ServerUrl.LOGIN) {
    history.push(AppRoute.LOGIN);
  }
};

const api = createAPI(onUnauthorized);

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(getUserStatusAsync());
store.dispatch(getOffersAsync());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
