import React from 'react'
import { ModalProvider, createModalStack } from 'react-native-modalfy'

import Welcome from './src/screens/welcome/Welcome'

// NOTE: Definition of the modal stack
const modalStack = createModalStack({})

const App = (): JSX.Element => {
  return (
    <ModalProvider stack={modalStack}>
      <Welcome />
    </ModalProvider>
  )
}

export default App
