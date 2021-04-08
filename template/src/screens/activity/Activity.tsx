import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getLocalizedString } from '../../locales'

const Activity = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>{getLocalizedString('general.activity')}</Text>
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

export default Activity
