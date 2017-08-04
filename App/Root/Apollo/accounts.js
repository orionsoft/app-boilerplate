import { AsyncStorage } from 'react-native'
import { setTokenStore } from 'meteor-apollo-accounts'

// Then you'll have to define a TokenStore for your user data using setTokenStore
// (for instance when your component is mounted):
setTokenStore({
  set: async function({ userId, token, tokenExpires }) {
    await AsyncStorage.setItem('Meteor.userId', userId)
    await AsyncStorage.setItem('Meteor.loginToken', token)
    // AsyncStorage doesn't support Date type so we'll store it as a String
    await AsyncStorage.setItem(
      'Meteor.loginTokenExpires',
      tokenExpires.toString()
    )
  },
  get: async function() {
    return {
      userId: await AsyncStorage.getItem('Meteor.userId'),
      token: await AsyncStorage.getItem('Meteor.loginToken'),
      tokenExpires: await AsyncStorage.getItem('Meteor.loginTokenExpires')
    }
  }
})
