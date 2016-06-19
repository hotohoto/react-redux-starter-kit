import React from 'react'
import { Link, IndexLink } from 'react-router'

class ListItemLink extends React.Component {
  render () {
    const { router } = this.context
    const { index, onlyActiveOnIndex, to, children, activeClassName, ...props } = this.props

    const isActive = router.isActive(to, onlyActiveOnIndex)
    const LinkComponent = index ? Link : IndexLink

    return (
      <li className={isActive ? activeClassName : ''}>
        <LinkComponent to={to} {...props}>{children}</LinkComponent>
      </li>
    )
  }
}

ListItemLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ListItemLink