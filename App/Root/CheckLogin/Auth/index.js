import React from 'react'
import {View, StatusBar, Dimensions} from 'react-native'
import styles from './styles.js'
import Main from './Main'
import Modal from 'react-native-modalbox'
import Login from './Login'
import Register from './Register'
import autobind from 'autobind-decorator'

export default class Auth extends React.Component {
  static propTypes = {}

  state = {}

  getModalStyle() {
    const marginTop = 50
    const height = Dimensions.get('window').height - marginTop
    return {
      height,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      overflow: 'hidden'
    }
  }

  @autobind
  open(opened) {
    this.setState({opened})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#0069ff" barStyle="dark-content" />
        <Main open={this.open} />
        <Modal
          keyboardTopOffset={0}
          style={this.getModalStyle()}
          isOpen={this.state.opened === 'login'}
          onClosed={() => this.setState({opened: null})}
          position="bottom"
        >
          <Login open={this.open} />
        </Modal>
        <Modal
          keyboardTopOffset={0}
          style={this.getModalStyle()}
          isOpen={this.state.opened === 'register'}
          onClosed={() => this.setState({opened: null})}
          position="bottom"
        >
          <Register open={this.open} />
        </Modal>
      </View>
    )
  }
}
