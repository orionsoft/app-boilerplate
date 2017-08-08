import React from 'react'
import {View, Text, TextInput} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'

export default class TextInputField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
  }

  static defaultProps = {
    label: 'Input'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.props.label.toUpperCase()}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={this.props.onChange}
          value={this.props.value}
        />
      </View>
    )
  }
}
