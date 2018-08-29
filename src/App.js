import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500 } from './views/Pages';
import PrivateRoute from './privateRoute';
import Customers from './views/Customers/Customers';
import Auth from './Auth';

// import { renderRoutes } from 'react-router-config';


class App extends Component {

  
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    Auth.isAuthenticated().then((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
 

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <PrivateRoute path="/" isAuthenticated={this.state.authed} name="home" component={DefaultLayout} ></PrivateRoute>
  
            
          
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
