import {Switch} from "react-router-dom";
import {Route, withRouter} from "react-router";
import TodoList from "./containers/TodoList";
import Auth from "./containers/Auth";
import TodoCreate from "./containers/TodoCreate";
import {CssBaseline, Grid, NoSsr} from "@material-ui/core";
import React from "react";
import Header from "./components/Header";


function App() {

  return (
      <NoSsr>
          <CssBaseline />
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{height: '100vh'}}
          >
              <Grid item xs={8}>
                  <Switch>
                      <Route exact path="/login" component={Auth}/>
                      <Route path="/">
                          <Header/>
                          <TodoList/>
                          <Route path="/create" component={TodoCreate} />
                      </Route>
                  </Switch>
              </Grid>
          </Grid>
      </NoSsr>
  );
}

export default withRouter(App);
