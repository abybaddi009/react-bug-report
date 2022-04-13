import React from "react";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Routes, Route } from "react-router-dom";
import { allRoutes as appRoutes } from "./routes";
import Layout from "./components/Layout";

import { store, history } from "./redux/store";
import { CircularProgress } from "@mui/material";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Routes>
            {appRoutes.filter(route => route.private).map((route) => {
              return (<Route
                key={route.path}
                path={route.path}
                element={
                  <React.Suspense fallback={<CircularProgress />}>
                    <PrivateRoute>
                      <route.component />
                    </PrivateRoute>
                  </React.Suspense>
                }
              />);
            })}
            {appRoutes.filter(route => !route.private).map((route) => {
              return (<Route
                key={route.path}
                path={route.path}
                element={
                  <React.Suspense fallback={<CircularProgress />}>
                    <route.component />
                  </React.Suspense>
                }
              />);
            })}
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
