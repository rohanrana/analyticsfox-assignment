import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Root from "./config/Root";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import ConfigureStore from "./redux/store/index";
const store = ConfigureStore()
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
