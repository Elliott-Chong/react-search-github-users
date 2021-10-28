import React from "react";
import { Dashboard, Login, AuthWrapper, Error } from "./pages";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              !isAuthenticated ? (
                <Redirect to="/login"> </Redirect>
              ) : (
                <Dashboard />
              )
            }
          ></Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
