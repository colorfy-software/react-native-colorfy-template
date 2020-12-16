import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StoresNameType } from '../types/store-types'

import stores from '../store/stores'
import { name as appName } from '../../app.json'

const storesKeys = Object.keys(stores)

/**
 * Hooks that rehydrates persisted stores on app launch.
 *
 * @param storesName - (Optional) Array of stores to rehydrate
 * @example `useRehydrate()` or specify stores with `useRehydrate(['user'])`
 */
export default function (
  storesName: StoresNameType[] = storesKeys as StoresNameType[],
): boolean {
  const [isRehydrated, setIsRehydrated] = useState(false)

  if (!storesName?.length) return true

  const storesToRehydrate = storesName.length
  const [currentStep, setStep] = useState(0)

  useEffect(() => {
    let isMounted = true
    if (currentStep <= storesToRehydrate) {
      const name = storesName[currentStep]
      AsyncStorage.getItem(`@${appName}Store:${name}`)
        .then((response) => {
          if (response) {
            const data = JSON.parse(response)
            stores[name].rehydrate?.(data)
          }
          if (isMounted) setStep(currentStep + 1)
        })
        .catch((e) => {
          console.log('❌ useRehydrate', e)
          if (isMounted) setStep(currentStep + 1)
        })
    }

    return (): void => {
      isMounted = false
    }
  }, [currentStep, storesName, storesToRehydrate])

  useEffect(() => {
    if (currentStep === storesToRehydrate) {
      setIsRehydrated(true)
    }
  }, [currentStep, storesToRehydrate])

  return isRehydrated
}
