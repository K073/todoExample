import {Switch} from "react-router-dom";
import {Redirect, Route, withRouter} from "react-router";
import TodoList from "./containers/TodoList";
import Auth from "./containers/Auth";
import TodoCreate from "./containers/TodoCreate";
import {Backdrop, Container, CssBaseline, Fade, Modal, NoSsr} from "@material-ui/core";
import React from "react";
import Header from "./components/Header";


function App(props) {
  return (
      <NoSsr>
          <CssBaseline />
          <Switch>
              <Container>
                  <Header/>
                  <Route path="/" component={TodoList}/>
                  <Route path="/create" component={TodoCreate} />
                  <Route path="/login" component={Auth}/>
              </Container>
          </Switch>
      </NoSsr>
  );
}

export default withRouter(App);
