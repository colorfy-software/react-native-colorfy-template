import React from 'react'
import { ModalProvider, createModalStack } from 'react-native-modalfy'

import { ModalsParamsType } from './src/types/modals-types'

import Navigator from './src/navigation/Navigation'

// NOTE: Definition of the modal stack
const modalStack = createModalStack<ModalsParamsType>({})

const App = (): JSX.Element => {
  return (
    <ModalProvider stack={modalStack}>
      <Navigator />
    </ModalProvider>
  )
}

export default App
