import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Requests from '../../utils/requests'

import usersData from './UsersData'

function UserRow(props) {
  const user = props.user
  const userLink = `/users/${user.id}`

  const getBadge = (user) => {
    // return status === 'Active' ? 'success' :
    //   status === 'Inactive' ? 'secondary' :
    //     status === 'Pending' ? 'warning' :
    //       status === 'Banned' ? 'danger' :
    //         'primary'
    return user.logged ? 'success' : 'primary';
  }
  const getStatus = (user) => {
    return user.logged ? 'Logged' : '';
  }

  return (
    <tr key={user.id.toString()}>
      <th scope="row"><Link to={userLink}>{user.id}</Link></th>
      <td><Link to={userLink}>{user.email}</Link></td>
      <td><Link to={userLink}><Badge color={getBadge(user)}>{getStatus(user)}</Badge></Link></td>
    </tr>
  )
}

class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.loading = true;
    this.state.usersList = [];

    Requests.dlsApiGet({method:'api.game.listUsers'},function(response){
      console.log(response.data.users);
      this.setState({loading:false, usersList: response.data.users});
    },function(error){

    });
  }

  render() {

    const userList = this.state.usersList.filter((user) => user.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Users
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loading ? 'Loading...' : userList.map((user, index) =>
                      <UserRow key={index} user={user}/>
                    )}
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

export default Users;
