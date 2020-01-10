import React from 'react'
import { Provider } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { ModalProvider, createModalStack } from 'react-native-modalfy'

import store, { persistor } from './src/redux/store'

declare let global: { HermesInternal: null | {} }

/**
 * @description Definition of the modal stack
 */
const modalStack = createModalStack({})

const App = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ModalProvider stack={modalStack}>
            <View />
          </ModalProvider>
        </PersistGate>
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
})

export default App
