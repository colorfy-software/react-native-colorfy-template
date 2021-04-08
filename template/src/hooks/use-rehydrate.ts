import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StoresNameType } from '../types/store-types'

import { name as appName } from '../../app.json'
import appStore from '../store/stores/app-store'
import userStore from '../store/stores/user-store'
import { storesToRehydrate as storesKeys } from '../store/stores'

/**
 * Hooks that rehydrates persisted stores on app launch.
 *
 * @param storesName - (Optional) Array of stores to rehydrate
 * @example `useRehydrate()` or specify stores with `useRehydrate(['user'])`
 */
export default function (storesName: StoresNameType[] = storesKeys as StoresNameType[]): boolean {
  const [isRehydrated, setIsRehydrated] = useState(false)

  if (!storesName?.length) return true

  useEffect(() => {
    ;(async () => {
      for (let index = 0; index < storesName.length; index += 1) {
        const response = await AsyncStorage.getItem(`@${appName}Store:${storesName[index]}`)

        if (response) {
          const data = JSON.parse(response)
          switch (storesName[index]) {
            case 'app':
              appStore?.getState?.().rehydrate?.(data)
              break
            case 'user':
              userStore?.getState?.().rehydrate?.(data)
              break
            default:
              console.warn(`use-rehydrate can't rehydrate unknown store at index: ${index}`)
              break
          }
        }

        if (index === storesName.length - 1) {
          setIsRehydrated(true)
        }
      }
    })()
  }, [storesName])

  return isRehydrated
}
