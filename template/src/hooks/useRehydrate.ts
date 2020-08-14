import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { StoresNameType } from '../types/store-types'

import stores from '../store/stores'
import { name as appName } from '../../app.json'

// @ts-ignore
const storesKeys: StoresNameType[] = Object.keys(stores)

/**
 * Hooks that rehydrates persisted stores on app launch.
 *
 * @param storesName - (Optional) Array of stores to rehydrate
 * @example `useRehydrate()` or `useRehydrate(['user'])`
 */
export default function (storesName = storesKeys): boolean {
  const [isRehydrated, setIsRehydrated] = useState(false)

  // NOTE: We should always pass something but just in case
  if (!storesName?.length) return true

  const [currentStep, setStep] = useState(1)
  const storesToRehydrate = storesName.length

  useEffect(() => {
    storesName.forEach((store) => {
      AsyncStorage.getItem(`@${appName}Store:${String(store)}`)
        .then((response: any) => {
          if (response) {
            try {
              const data = JSON.parse(response)
              stores[store].rehydrate?.(data)
            } catch (e) {
              console.log(`❌ useRehydrate > ${store}`, e)
            }
          }
        })
        .finally(() => setStep(currentStep + 1))
    })
    // NOTE: Adding deps here will make this effect not run once,
    // which will end up in an infinite loop (no bueno 😒)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // NOTE: We're done once all the stores we wanted to rehydrate are
    if (currentStep === storesToRehydrate) {
      setIsRehydrated(true)
    }
  }, [currentStep, storesToRehydrate])

  return isRehydrated
}
