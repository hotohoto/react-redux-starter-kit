import React from 'react'
import Header from 'components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <Header isAuthenticated={children}/>
    <div className='container'>
      <div className={classes.mainContainer}>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
