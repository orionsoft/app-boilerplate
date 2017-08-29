import React from 'react'
import {View} from 'react-native'
import styles from './styles.js'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Modal from 'react-native-modalbox'
import Auth from './Auth'
import Loading from './Loading'

@withGraphQL(
  gql`
    query getMe {
      me {
        _id
      }
    }
  `,
  {
    loading: <Loading />
  }
)
export default class CheckLogin extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    children: PropTypes.node
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        <Modal
          swipeToClose={false}
          startOpen={!this.props.me}
          isOpen={!this.props.me}
          position="bottom">
          <Auth />
        </Modal>
      </View>
    )
  }
}
