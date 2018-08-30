import React, { Component } from 'react';
import {  DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppHeaderDropdown,  AppSidebarToggler } from '@coreui/react';

import {  Redirect } from 'react-router-dom';
import Auth from '../../services/Auth';


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};



class DefaultHeader extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      redirect: false
    }
    this.updateAppState = this.updateAppState.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  updateAppState(){
    this.props.updateAppState();
  }
  
  
  
  logout(){
    Auth.signout();
    this.setState({ redirect: true });
    this.updateAppState();
    //this.props.updateLoginState();
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/'/>;
    }

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <a  className="navbar-brand">
          <span className="navbar-brand-full" width="89" height="25">My Experiment</span>  
          <span className="navbar-brand-minimized" width="30" height="30">MyE</span>
        </a>

        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><i className="fa fa-file"></i> Statistics</DropdownItem>
              <DropdownItem onClick={this.logout} ><i className="fa fa-lock"></i> Logout</DropdownItem>
        
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
