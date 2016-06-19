import React, { Component, PropTypes } from 'react'

export default class Signup extends Component {

  render() {
    const { errorMessage } = this.props

    return (
      <div>
        <input type='text' ref='id' className="form-control" placeholder='Id'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <input type='text' ref='name' className="form-control" placeholder='Name'/>
        <input type='text' ref='email' className="form-control" placeholder='Email address'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Sign up
        </button>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
      </div>
    )
  }

  handleClick(event) {
    const id = this.refs.id
    const password = this.refs.password
    const name = this.refs.name
    const email = this.refs.email
    const user = {
      id: id.value.trim(),
      password: password.value.trim(),
      name: name.value.trim(),
      email: email.value.trim()
    }
    this.props.onSignUpClick(user)
  }     
}

Signup.propTypes = {
  onSignUpClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}