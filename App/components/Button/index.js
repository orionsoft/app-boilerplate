import React from 'react'
import {View, Button} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'

export default class AppButton extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func
  }

  render() {
    return (
      <View style={styles.container}>
        <Button label={this.props.label} onPress={this.props.onPress} />
      </View>
    )
  }
}
