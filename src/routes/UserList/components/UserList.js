import React, { Component, PropTypes } from 'react'

export default class UserList extends Component {
  componentDidMount () {
    this.props.getUserList(this.props.userKey);
  }
  render() {
    let _this =this;
    return (
      <div>
        <h2>Service management</h2>
        <h3>User list</h3>
        <table className="table">
          <colgroup>
              <col className="col-md-3"/>
              <col className="col-md-3"/>
              <col className="col-md-3"/>
              <col className="col-md-3"/>
          </colgroup>
          <thead>
            <tr>
              <th>Id</th>
              <th>Password</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {
            
            this.props.userList && this.props.userList.map(function(user) {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td><input type="password" ref={'password_'+user.id}/> <button onClick={(event) => _this.handlePasswordChangeClick(event,user.id)} type="button" className="btn btn-primary">change</button></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
        <div>
        </div>
      </div>
    )
  }
  handlePasswordChangeClick(event, userId) {
    const newPassword = this.refs["password_" + userId].value;
    this.props.setUserPassword(this.props.userKey, userId, newPassword);
  }
}

UserList.propTypes = {
  userKey: PropTypes.string.isRequired,
  userList: PropTypes.number.isRequired,
  getUserList: PropTypes.func.isRequired,
  setUserPassword: PropTypes.func.isRequired
}