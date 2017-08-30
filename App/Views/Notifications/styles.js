import {StyleSheet} from 'react-native'
import texts from 'App/styles/texts'

export default StyleSheet.create({
  container: {},
  titleContainer: {
    padding: 10,
    marginTop: 10
  },
  title: {
    ...texts.title,
    marginBottom: 0
  }
})
