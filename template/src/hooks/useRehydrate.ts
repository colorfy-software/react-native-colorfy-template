import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { StoresNameType } from '../types/store-types'

import stores from '../store/stores/stores'
import { name as appName } from '../../app.json'

const storesKeys = Object.keys(stores)

/**
 * Hooks that rehydrates persisted stores on app launch.
 *
 * @param { StoresNameType[]= } storesName - (Optional) Array of stores to rehydrate
 * @example `useRehydrate()` or `useRehydrate(['user'])`
 */
export default function (
  storesName: StoresNameType[] = storesKeys as StoresNameType[],
): boolean {
  const [isRehydrated, setIsRehydrated] = useState(false)

  if (!storesName?.length) return true

  const [currentStep, setStep] = useState(1)
  const storesToRehydrate = storesName.length

  useEffect(() => {
    if (currentStep <= storesToRehydrate) {
      const name = storesName[currentStep]
      AsyncStorage.getItem(`@${appName}Store:${name}`)
        .then((response) => {
          if (response) {
            const data = JSON.parse(response)
            stores[name].rehydrate?.(data)
          }
        })
        .finally(() => setStep(currentStep + 1))
    }
  }, [currentStep, storesName, storesToRehydrate])

  useEffect(() => {
    if (currentStep === storesToRehydrate) {
      setIsRehydrated(true)
    }
  }, [currentStep, storesToRehydrate])

  return isRehydrated
}
