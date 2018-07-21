import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';
import Header from './components/header';

// Pages
import { Home } from './containers/home';
import { Hscode } from './containers/hscode';
import { Year } from './containers/year';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route path="/hscode/:id" component={Hscode}/>
            <Route path="/year/:year" component={Year}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
