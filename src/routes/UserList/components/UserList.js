import React from 'react'

export const UserList = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      UserList:
      {' '}
      <span className={classes['counter--green']}>
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

UserList.propTypes = {
  userList: React.PropTypes.number.isRequired,
  setUserPassword: React.PropTypes.func.isRequired
}

export default UserList
