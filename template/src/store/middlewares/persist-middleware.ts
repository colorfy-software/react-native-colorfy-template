import AsyncStorage from '@react-native-community/async-storage'

import { MiddlewareType, StoresType } from 'src/types/store-types'

const middleware: MiddlewareType = (store, config) => (
  set,
  get,
  api,
): StoresType =>
  config(
    args => {
      set(args)
      const data = JSON.stringify({ data: get().data })
      AsyncStorage.setItem(`@NomadStore:${store}`, data).catch(console.log)
    },
    get,
    api,
  )

export default middleware
