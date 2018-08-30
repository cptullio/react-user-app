import React, { Component } from 'react';
import CustomerService from '../services/customerService'

class CustomerList extends Component {
  // initially data is empty in state
  state = { data: [] };

  componentDidMount() {
    CustomerService.List().then(response => this.setState({data:response}));
  }


  render() {
    return (
        <ul>
        {
          this.state.data.map(function(customer){
            return <li key={customer.customer_id}>{customer.customer_id} - {customer.customer_name}</li>;
          })
        }
        </ul>
    );
  }
}

export default CustomerList;