import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getLocalizedString } from '../../locales'

const Home = (): JSX.Element => {
  return (
    <View testID="Home" style={styles.container}>
      <Text testID="Home.Title">{getLocalizedString('general.home')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home
