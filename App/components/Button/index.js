import React from 'react'
import {View, TouchableWithoutFeedback, Text, Animated} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'

export default class AppButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    onPress: PropTypes.func
  }

  static defaultProps = {
    backgroundColor: '#0069ff',
    textColor: '#ffffff'
  }

  state = {}

  componentWillMount() {
    this.shadowRadius = new Animated.Value(10)
    this.marginTop = new Animated.Value(10)
    this.marginBottom = new Animated.Value(10)
  }

  componentDidUpdate(prevProps, prevState) {
    const duration = 50
    const offset = 2
    if (prevState.active !== this.state.active) {
      Animated.timing(this.shadowRadius, {toValue: this.state.active ? 4 : 6, duration}).start()
      Animated.timing(this.marginTop, {
        toValue: this.state.active ? 10 + offset : 10,
        duration
      }).start()
      Animated.timing(this.marginBottom, {
        toValue: this.state.active ? 10 - offset : 10,
        duration
      }).start()
    }
  }

  render() {
    const shadowStyles = {
      shadowColor: '#000',
      shadowOpacity: 0.2,
      borderRadius: 4,
      marginTop: this.marginTop,
      marginBottom: this.marginBottom,
      shadowRadius: this.shadowRadius
    }
    const containerStyles = {
      backgroundColor: this.props.backgroundColor,
      borderRadius: 4,
      overflow: 'hidden',
      shadowRadius: 10
    }
    const textStyles = {
      textAlign: 'center',
      padding: 15,
      fontSize: 16,
      color: this.props.textColor,
      fontWeight: '600'
    }
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.setState({active: true})}
        onPressOut={() => this.setState({active: false})}
        onPress={this.props.onPress}
        style={styles.touchable}
      >
        <Animated.View style={shadowStyles}>
          <View style={containerStyles}>
            <Text style={textStyles}>
              {this.props.title}
            </Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
