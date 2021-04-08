import { StyleSheet, View } from 'react-native'

import AppText from '../../components/AppText'

import { getLocalizedString } from '../../locales'

const Activity = (): JSX.Element => (
  <View style={styles.container}>
    <AppText type="subTitle">{getLocalizedString('general.activity')}</AppText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Activity
