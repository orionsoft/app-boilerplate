import React from 'react'
import {View, TouchableWithoutFeedback, Text, ActivityIndicator} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'

export default class AppButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    textColor: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
  }

  static defaultProps = {
    textColor: '#111'
  }

  state = {}

  @autobind
  onPressIn() {
    if (this.props.loading || this.props.disabled) return
    this.setState({active: true})
  }

  @autobind
  onPressOut() {
    if (this.props.loading || this.props.disabled) return
    this.setState({active: false})
  }

  @autobind
  onPress() {
    if (this.props.loading || this.props.disabled) return
    this.props.onPress()
  }

  getContainerStyles() {
    return {
      height: 50
    }
  }

  getTextStyles() {
    const color = this.props.disabled ? '#ddd' : this.props.textColor
    const opacity = this.state.active ? 0.5 : 1
    return {
      textAlign: 'center',
      padding: 15,
      fontSize: 18,
      color,
      opacity
    }
  }

  renderLoading() {
    if (!this.props.loading) return
    const style = {
      padding: 15,
      height: 50
    }
    return (
      <View style={style}>
        <ActivityIndicator />
      </View>
    )
  }

  renderText() {
    if (this.props.loading) return
    const textStyles = this.getTextStyles()
    return (
      <Text style={textStyles}>
        {this.props.title}
      </Text>
    )
  }

  render() {
    const containerStyles = this.getContainerStyles()
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
        style={styles.touchable}
      >
        <View style={containerStyles}>
          {this.renderText()}
          {this.renderLoading()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
