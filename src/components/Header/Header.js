import React from 'react'
import { IndexLink, Link } from 'react-router'
import ListItemLink from './ListItemLink'

import { connect } from 'react-redux'
import { loginSuccess, doLogout } from 'routes/Login/modules/login'

class Header extends React.Component {

  render () {
    var isAuthenticated = this.props.isAuthenticated;
    var logout = this.props.logout;
    
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <IndexLink to='/' className="navbar-brand">Mini Project</IndexLink>
          </div>
          <ul className="nav navbar-nav">
            <ListItemLink to='/signup' activeClassName="active" index={true}>Sign up</ListItemLink>
            {isAuthenticated && <ListItemLink to='/user' activeClassName="active">Service Management</ListItemLink>}
            {!isAuthenticated && <ListItemLink to='/login' activeClassName="active">Login</ListItemLink>}
            {isAuthenticated && <li><Link to='/' onClick={(event)=>this.handleLogoutClick(event)}>Logout</Link></li>}
          </ul>
        </div>
      </nav>
    )
  }
  
  handleLogoutClick(event) {
    this.props.logout();
  } 
}

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired
}

const mapActionCreators = {
  logout: doLogout
}

const mapStateToProps = (state) => ({
  isAuthenticated:(localStorage.getItem('userKey'))?true:false
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const user = (state) => state.user
    const tripleCount = createSelector(user, (count) => count * 3)
    const mapStateToProps = (state) => ({
      user: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(Header)
