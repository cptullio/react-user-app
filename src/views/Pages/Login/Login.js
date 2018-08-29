import React, { Component ,observer} from 'react';
import Auth from '../../../Auth';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {  Redirect,withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false
    };
      	this.login = this.login.bind(this);
        this.updateAppState = this.updateAppState.bind(this);
  }
  
  updateAppState(){
    this.props.updateAppState();
  }

  login = () => {
    Auth.authenticate('admin','admin',() => {
      this.updateAppState();
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    


    if (redirectToReferrer || this.props.isAuthenticated) {
      console.log("redirecionando");
      return <Redirect from='/' to='/general' />
    }
    

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button onClick={this.login} color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
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