import {Switch} from "react-router-dom";
import {Route, withRouter} from "react-router";
import TodoList from "./containers/TodoList";
import Auth from "./containers/Auth";
import TodoCreate from "./containers/TodoCreate";
import {Container, CssBaseline, NoSsr} from "@material-ui/core";
import React from "react";
import Header from "./components/Header";


function App() {
  return (
      <NoSsr>
          <CssBaseline />
          <Container>
              <Switch>
                  <Route exact path="/login" component={Auth}/>
                  <Route path="/">
                      <Header/>
                      <TodoList/>
                      <Route path="/create" component={TodoCreate} />
                  </Route>
              </Switch>
          </Container>
      </NoSsr>
  );
}

export default withRouter(App);
