import React from 'react'
import Apollo from './Apollo'
import PropTypes from 'prop-types'
import CheckLogin from './CheckLogin'

export default class Root extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <Apollo>
        <CheckLogin>
          {this.props.children}
        </CheckLogin>
      </Apollo>
    )
  }
}
