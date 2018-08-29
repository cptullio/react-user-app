import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
constructor(props){
  super(props);
  this.state = {
    authed: true,
    loading: true,
  }

  this.updateLoginState = this.updateLoginState.bind(this);
 // this.filterUser = this.filterUser.bind(this);
}
  
 
  componentDidMount () {
  console.log(this.state);

    this.updateLoginState();
  }

  updateLoginState()
  {
    Auth.isAuthenticated().then((user) => {
      if (user) {
        console.log('atualizando login State');
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
    });
  }

  filterUser(filterValue){
    alert(filterValue);
  }

  render() {
    console.log('render called', this.state.authed);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={() => <Login isAuthenticated={this.state.authed} updateAppState={this.updateLoginState}  />} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <PrivateRoute path="/" isAuthenticated={this.state.authed} name="home" component={ () => <DefaultLayout updateAppState={this.updateLoginState} ></DefaultLayout>  } ></PrivateRoute>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
