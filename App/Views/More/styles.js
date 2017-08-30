import {StyleSheet} from 'react-native'
import texts from 'App/styles/texts'

export default StyleSheet.create({
  container: {},
  titleContainer: texts.titleContainer,
  title: {
    ...texts.title,
    marginBottom: 0
  }
})
