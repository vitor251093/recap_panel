import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../utils/requests'

class User extends Component {

  constructor(props) {
    super(props);

    const userMail = props.match.params.id;
    this.state = {};
    
    var that = this;
    Requests.dlsApiGet({method:'api.game.getUserInfo', mail:userMail},function(response){
      that.setState({user: response.data.user});
    },function(error){

    });
  }

  render() {
    var user = this.state.user;
    return (user === undefined ? 'Loading...' :
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>User mail: {user.email}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td><strong>{user.name}</strong></td>
                      </tr>
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

export default User;
