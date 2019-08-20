import React, { Component } from 'react';
import _ from 'lodash'
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../utils/requests'

class User extends Component {

  constructor(props) {
    super(props);

    const userMail = props.match.params.id;
    this.state = {};
    this.state.userMail = userMail;
    
    var that = this;
    Requests.dlsApiGet('api.panel.getUserInfo', {mail:userMail},function(response){
      that.setState({user: response.data.user});
    },function(error){

    });
  }

  handleChange(valuesToMerge) {
    this.setState({user: _.merge(this.state.user, valuesToMerge)});
  }

  save() {
    Requests.dlsApiPost('api.panel.setUserInfo', {mail:this.state.userMail}, this.state.user,
    function(response){
      
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
                      <tr>
                        <td><input type="checkbox" checked={user.account.tutorial_completed} 
                                   onChange={(e) => this.handleChange({account:{tutorial_completed: e.target.checked}})}/>
                            Tutorial completed
                        </td>
                      </tr>
                      <tr>
                        <td>Level:</td>
                        <td><input type="number" value={user.account.level} 
                                   onChange={(e) => this.handleChange({account:{level: parseInt(e.target.value)}})}/></td>
                      </tr>
                      <tr>
                        <td>XP:</td>
                        <td><input type="number" value={user.account.xp} 
                                   onChange={(e) => this.handleChange({account:{xp: parseInt(e.target.value)}})}/></td>
                      </tr>
                      <tr>
                        <td>DNA:</td>
                        <td><input type="number" value={user.account.dna} 
                                   onChange={(e) => this.handleChange({account:{dna: parseInt(e.target.value)}})}/></td>
                      </tr>
                      <tr>
                        <td><Button block color="primary" onClick={() => this.save()}>Save</Button></td>
                        <td></td>
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
