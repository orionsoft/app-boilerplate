import React from 'react'
import PropTypes from 'prop-types'
import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo'
import {getLoginToken, onTokenChange} from 'meteor-apollo-accounts'
import './accounts'
import Loading from './Loading'
import NetworkError from './NetworkError'
import ApolloError from './ApolloError'

const uri = 'http://localhost:3000/graphql'
const networkInterface = createNetworkInterface({uri})

networkInterface.use([
  {
    async applyMiddleware(request, next) {
      const currentUserToken = await getLoginToken()

      if (!currentUserToken) {
        return next()
      }

      if (!request.options.headers) {
        request.options.headers = {}
      }

      request.options.headers.Authorization = currentUserToken
      next()
    }
  }
])

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: r => r._id
})

onTokenChange(function() {
  client.resetStore()
})

global.apolloLoadingComponent = Loading
global.apolloNetworkErrorComponent = NetworkError
global.apolloErrorComponent = ApolloError

export default class Apollo extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.props.children}
      </ApolloProvider>
    )
  }
}
