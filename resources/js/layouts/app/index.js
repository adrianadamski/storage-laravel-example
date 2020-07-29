import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Link, Route, Switch
} from "react-router-dom";
import Storages from '../../routes/storages';
import StorageItems from '../../routes/storage-items';
import "./app.css";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar bg="dark" variant="dark" expand="lg" className="sidebar">
          <Navbar.Brand as={Link} to={'/'} className="ml-lg-2 mb-lg-5">Storage</Navbar.Brand>
          <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
          <Navbar.Collapse id="sidebar-navbar-nav" className="align-items-start w-100">
            <Nav className="sidebar-nav w-100">
              <Nav.Link as={Link} to={`/`}>
                Storages
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="main-container">
          <Container className="pt-2">
            <Switch>
              <Route path={`/storage-item/:id`}>
                <StorageItems />
              </Route>
              <Route path={``}>
                <Storages />
              </Route>
            </Switch>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
