import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
// import { routerMiddleware } from "react-router-redux";
// import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
// import { createLogger } from "redux-logger";

// const history = createBrowserHistory();
// const routeMiddleware = routerMiddleware(history);

// let logger = createLogger({
//   predicate: process.env.NODE_ENV === "development"
// });
const middlewares = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept("../reducers/index", () => {
//       const nextRootReducer = require("../reducers/index");
//       store.replaceReducer(nextRootReducer);
//     });
//   }
  return store;
}
// export { history };
