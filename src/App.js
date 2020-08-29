import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Route } from 'react-router-dom/cjs/react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {Category} from './components/Category'
import Product from './components/Product';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter className="App">
      <Navigation/>
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route path="/" exact component={Menu}/>
              <Route path="/products" exact component={Product}/>
              <Route path="/categories" exact component={Category}/>
            </Switch>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
