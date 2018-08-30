import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import customerService from '../../services/customerService'

class Customer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer : null
    };
  }

  updateCustomer(){
    customerService.List().then(list => {
      let customer = list.find( customer => customer.customer_id.toString() === this.props.match.params.id)
      this.setState({
        customer : customer
      })
  });
  }

  componentDidMount() {
    this.updateCustomer();
}

  render() {
    const customerDetails = this.state.customer ? Object.entries(this.state.customer) : [['id', (<span><i className="text-muted icon-ban"></i> Not found</span>)]]
    if (this.state.customer && ( this.state.customer.customer_id.toString() !== this.props.match.params.id)){
      this.updateCustomer()
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Customer Id: {this.props.match.params.id}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        customerDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Customer;