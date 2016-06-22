import React, { Component, PropTypes } from 'react'

export default class Login extends Component {

  render() {
    return (
      <div>
        <input type='text' ref='id' className="form-control" placeholder='Id'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
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