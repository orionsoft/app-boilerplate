import React from 'react'
import Apollo from './Apollo'
import PropTypes from 'prop-types'

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <Apollo>
        {this.props.children}
      </Apollo>
    )
  }
}
