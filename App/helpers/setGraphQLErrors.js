import {Alert} from 'react-native'
import isEmpty from 'lodash/isEmpty'

const alert = function(error) {
  const message = error.message.replace('GraphQL error: ', '')
  Alert.alert('Error', message)
}

export default function(component, error) {
  if (!error.graphQLErrors) return alert(error)
  const formError = error.graphQLErrors[0]
  if (!formError.details) return alert(error)
  const errorMessages = formError.details.invalidKeys
  if (isEmpty(errorMessages)) return alert(error)
  component.setState({errorMessages})
}
