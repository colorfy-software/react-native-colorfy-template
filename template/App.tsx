import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ModalProvider, createModalStack } from 'react-native-modalfy'
import core from './src/core'

declare let global: { HermesInternal: null | {} }

/**
 * @description Definition of the modal stack
 */
const modalStack = createModalStack({})

const App = (): JSX.Element => {
  return (
    <ModalProvider stack={modalStack}>
      <View style={styles.container} />
    </ModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
})

export default App
