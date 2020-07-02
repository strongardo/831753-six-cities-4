import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import App from "./components/app/app.jsx";
import cities from "./mocks/cities.js";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App cities={cities} />
    </Provider>,
    document.querySelector(`#root`)
);

