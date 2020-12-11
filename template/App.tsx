import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ModalProvider, createModalStack } from 'react-native-modalfy'

declare let global: { HermesInternal: null | {} }

/**
 * Definition of the modal stack
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
    backgroundColor: 'white',
  },
})

export default App
