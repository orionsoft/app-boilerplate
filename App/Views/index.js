import {TabNavigator} from 'react-navigation'
import Home from './Home'
import Notifications from './Notifications'
import More from './More'

export default TabNavigator(
  {
    Main: {screen: Home},
    Setup: {screen: Notifications},
    More: {screen: More}
  },
  {
    tabBarOptions: {
      activeTintColor: '#0069ff',
      showLabel: false
    }
  }
)
