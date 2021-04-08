import { StyleSheet, View } from 'react-native'

import AppText from '../../components/AppText'

import { getLocalizedString } from '../../locales'

const Home = (): JSX.Element => (
  <View testID="Home" style={styles.container}>
    <AppText type="subTitle" testID="Home.Title">
      {getLocalizedString('general.home')}
    </AppText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
