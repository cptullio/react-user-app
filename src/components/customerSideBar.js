import React, { Component } from 'react';
import CustomerService from '../services/customerService'
import { NavLink } from 'react-router-dom';


class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      data: []
    };
  }

  toggle = function toggle(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  };

  componentDidMount() {
    CustomerService.List().then(response => this.setState({ data: response }));
  }


  render() {
    return (
      <li className="nav-item nav-dropdown">
        <a className="nav-link nav-dropdown-toggle"  onClick={this.toggle}>
          <i className="nav-icon cui-puzzle"></i> Customers ({this.state.data.length})
        </a>

        <ul className="nav-dropdown-items">
          {
            this.state.data.map(function (customer) {
              let url = "/customer/" + customer.customer_id;

                return (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={url}>
                      <i className="nav-icon cui-puzzle"></i> {customer.customer_name}
                    </NavLink>
                  </li>
                );
            })
          }
        </ul>
      </li>


    );
  }
}

export default CustomerList;