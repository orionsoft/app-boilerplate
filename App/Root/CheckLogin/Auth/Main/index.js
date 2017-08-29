import React from 'react'
import {View, Image, Alert} from 'react-native'
import styles from './styles.js'
import Logo from '../Logo'
import Button from 'App/components/Button'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import Expo from 'expo'
import credentials from './credentials'
import {withApollo} from 'react-apollo'
import {loginWithFacebook, loginWithGoogle} from 'meteor-apollo-accounts'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    open: PropTypes.func
  }

  state = {}

  @autobind
  async loginWithFacebook() {
    this.setState({loading: 'facebook'})
    const {
      type,
      token
    } = await Expo.Facebook.logInWithReadPermissionsAsync(credentials.facebookAppId, {
      permissions: ['public_profile']
    })
    if (type === 'success') {
      try {
        await loginWithFacebook({accessToken: token}, this.props.client)
      } catch (error) {
        const errorMessage = error.message.replace('GraphQL error: ', '')
        Alert.alert('Login error', errorMessage)
        console.log('Error:', error)
      }
    }
    this.setState({loading: null})
  }

  @autobind
  async loginWithGoogle() {
    this.setState({loading: 'google'})
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: credentials.androidClientId,
        iosClientId: credentials.iosClientId,
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        await loginWithGoogle({accessToken: result.accessToken}, this.props.client)
      }
    } catch (error) {
      const errorMessage = error.message.replace('GraphQL error: ', '')
      Alert.alert('Login error', errorMessage)
    }
    this.setState({loading: null})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Image resizeMode="cover" style={styles.background} source={require('./background.jpg')} />
        <View style={styles.container}>
          <Logo />
          <View style={styles.separator} />
          <View style={styles.buttons}>
            <Button
              loading={this.state.loading === 'facebook'}
              disabled={this.state.loading && this.state.loading !== 'facebook'}
              backgroundColor="#3b5998"
              title="Facebook"
              onPress={this.loginWithFacebook}
            />
            <Button
              loading={this.state.loading === 'google'}
              disabled={this.state.loading && this.state.loading !== 'google'}
              backgroundColor="#d62d20"
              title="Google"
              onPress={this.loginWithGoogle}
            />
            <Button
              onPress={() => this.props.open('password')}
              disabled={!!this.state.loading}
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
