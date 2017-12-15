import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { Container } from "./components/Grid";

const App = () =>
  <Router>
    <div className="container">
      <Nav />
      <Container fluid>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/main" component={Main} />
              <Route exact path="/main/:id" component={Main} />
              <Route component={NoMatch} />
            </Switch>
      </Container>
      <footer className="footer text-center">
        <p className="text-muted small mb-0">Copyright &copy; João Paulo Alexandre de Oliveira 2017</p>
      </footer>
    </div>
  </Router>;

export default App;
