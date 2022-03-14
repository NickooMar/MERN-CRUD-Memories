import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Navbar, Auth, Home } from './components'

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route  path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} /> 
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
