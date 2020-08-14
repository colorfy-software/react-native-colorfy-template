import AsyncStorage from '@react-native-community/async-storage'
import { StateCreator } from 'zustand'

import {
  MiddlewareType,
  StoresType,
  StoresNameType,
} from '../../types/store-types'

import { name as appName } from '../../../app.json'

const middleware = <S extends StoresType>(
  store: StoresNameType,
  config: StateCreator<S>,
): MiddlewareType<S> => (set, get, api) =>
  config(
    (args) => {
      set(args)
      const data = JSON.stringify({ data: get().data })
      AsyncStorage.setItem(`@${appName}Store:${store}`, data).catch(console.log)
    },
    get,
    api,
  )

export default middleware
