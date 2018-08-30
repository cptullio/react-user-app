import React, { Component } from 'react';
import Auth from '../../../services/Auth';

import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect, withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      username: '',
      password: '',
      failMessage: '',
      failMessageDisplay: false,
    }
    this.login = this.login.bind(this);
    this.updateAppState = this.updateAppState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onDismiss() {
    this.setState({ failMessageDisplay: false });
  }

  updateAppState() {
    this.props.updateAppState();
  }

  login = () => {

    if (this.state.username.length < 2 || this.state.password < 2) {
      this.setState({ failMessage: "Login/Password invalid.", failMessageDisplay: true });

      return;
    }

    Auth.authenticate(this.state.username, this.state.password).then(x => {
      this.updateAppState();
      this.setState({ redirectToReferrer: true });
    }).catch(err => {
      this.setState({ failMessage: "Login/Password invalid.", failMessageDisplay: true });
    });




  };

  render() {
    const { username, password, redirectToReferrer, failMessage } = this.state;


    if (redirectToReferrer || this.props.isAuthenticated) {
      return <Redirect to='/general' />
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>


                    <Alert color="warning" isOpen={this.state.failMessageDisplay} toggle={this.onDismiss}>
                      {failMessage}
                    </Alert>

                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="username" id="username" value={username} placeholder="Username" onChange={this.onChange} autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" id="password" value={password} placeholder="Password" onChange={this.onChange} autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button onClick={this.login} color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login)