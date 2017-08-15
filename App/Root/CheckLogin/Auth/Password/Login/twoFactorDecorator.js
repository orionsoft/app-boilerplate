import React from 'react'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import autobind from 'autobind-decorator'
import hashPassword from './hashPassword'
import {storeLoginToken} from 'meteor-apollo-accounts/client/store'

export default function(ComposedComponent) {
  @withMutation(gql`
    mutation login($email: String, $password: HashedPassword, $code: String) {
      loginWithTwoFactor(email: $email, password: $password, code: $code) {
        id
        token
        tokenExpires
      }
    }
  `)
  class LoginWithTwoFactor extends React.Component {
    static propTypes = {
      login: React.PropTypes.func
    }

    @autobind
    async login({email, password, code}) {
      const {loginWithTwoFactor} = await this.props.login({
        email,
        password: hashPassword(password),
        code
      })
      const {id, token, tokenExpires} = loginWithTwoFactor
      await storeLoginToken(id, token, new Date(tokenExpires))
      return loginWithTwoFactor
    }

    render() {
      return <ComposedComponent loginWithTwoFactor={this.login} {...this.props} />
    }
  }

  return LoginWithTwoFactor
}
