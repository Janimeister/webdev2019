import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Add from './components/add';
import Edit from './components/edit';
import Home from './components/home';
import Show from './components/show';
import {Navigation} from './components/navigation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/add' component={Add}/>
          <Route path='/edit' component={Edit}/>
          <Route path='/show' component={Show}/>
        </Switch>
      </BrowserRouter>
    );
  }
}



export default App;
