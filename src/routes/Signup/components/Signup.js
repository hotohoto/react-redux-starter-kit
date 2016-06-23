import React, { Component, PropTypes } from 'react'

export default class Signup extends Component {

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="id">Id:</label>
          <input type='text' ref='id' className="form-control" placeholder='Enter id'/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type='password' ref='password' className="form-control" placeholder='Enter password'/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type='text' ref='name' className="form-control" placeholder='Enter name'/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type='email' ref='email' className="form-control" placeholder='Enter email address'/>
        </div>
        <div className="form-group">
          <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
            Sign up
          </button>
        </div>
      </div>
    )
  }

  handleClick(event) {
    const id = this.refs.id.value.trim();
    const password = this.refs.password.value.trim();
    const name = this.refs.name.value.trim();
    const email = this.refs.email.value.trim();
    this.props.onSignUpClick(id, password, name, email);
  }     
}

Signup.propTypes = {
  onSignUpClick: PropTypes.func.isRequired
}