import React, { Component, PropTypes } from 'react'

export default class Login extends Component {

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="id">Id:</label>
          <input id="id" type='text' ref='id' className="form-control" placeholder='Enter Id'/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type='password' ref='password' className="form-control" placeholder='Enter password'/>
        </div>
        <div className="form-group text-center">
          <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    )
  }

  handleClick(event) {
    const id = this.refs.id.value;
    const password = this.refs.password.value;
    this.props.onLoginClick(id, password);
  }     
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired
}