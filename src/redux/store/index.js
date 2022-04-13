import { combineReducers, configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

import userReducer from "../features/user/UserSlice";
import userLocationReducer from "../features/userLocation/UserLocationSlice";

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer
} = createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  userLocation: userLocationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat([routerMiddleware, thunkMiddleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

export const history = createReduxHistory(store);
