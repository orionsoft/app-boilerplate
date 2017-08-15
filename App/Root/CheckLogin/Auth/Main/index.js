import React from 'react'
import {View, Image} from 'react-native'
import styles from './styles.js'
import Logo from '../Logo'
import Button from 'App/components/Button'
import PropTypes from 'prop-types'

export default class Main extends React.Component {
  static propTypes = {
    open: PropTypes.func
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image resizeMode="cover" style={styles.background} source={require('./background.jpg')} />
        <View style={styles.container}>
          <Logo />
          <View style={styles.separator} />
          <View style={styles.buttons}>
            <Button backgroundColor="#0069ff" title="Facebook" />
            <Button backgroundColor="red" title="Google" />
            <Button
              onPress={() => this.props.open('password')}
              backgroundColor="#ffffff"
              textColor="#000000"
              title="Password"
            />
          </View>
        </View>
      </View>
    )
  }
}
