import AsyncStorage from '@react-native-community/async-storage'
import { StateCreator } from 'zustand'

import {
  StoreType,
  StoresDataType,
  StoresNameType,
} from '../../types/store-types'

import { name as appName } from '../../../app.json'

const middleware = <S extends StoresNameType>(
  store: S,
  config: StateCreator<StoreType<StoresDataType[S]>>,
): StateCreator<StoreType<StoresDataType[S]>> => (
  set,
  get,
  api,
): StoreType<StoresDataType[S]> =>
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
