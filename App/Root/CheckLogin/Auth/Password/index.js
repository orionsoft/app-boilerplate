import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import Swiper from 'react-native-swiper'
import Login from './Login'
import Register from './Register'
import Forgot from './Forgot'
import autobind from 'autobind-decorator'

export default class Password extends React.Component {
  static propTypes = {}

  state = {index: 1}

  @autobind
  open(index) {
    this.refs.swiper.scrollBy(index - this.state.index)
    this.setState({index})
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          ref="swiper"
          loop={false}
          index={this.state.index}
          onIndexChanged={index => this.setState({index})}
          style={styles.wrapper}
        >
          <View style={styles.forgot}>
            <Forgot open={this.open} />
          </View>
          <View style={styles.login}>
            <Login open={this.open} />
          </View>
          <View style={styles.register}>
            <Register open={this.open} />
          </View>
        </Swiper>
      </View>
    )
  }
}
