import React from 'react'
import Views from './Views'
import Root from './Root'

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Views />
      </Root>
    )
  }
}
