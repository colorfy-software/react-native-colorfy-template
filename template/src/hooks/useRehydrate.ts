import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import stores from '../store/stores'
import { name as appName } from '../../app.json'

type StoresNameType = keyof typeof stores

export default function(storesName: StoresNameType[]): boolean {
  const [isRehydrated, setIsRehydrated] = useState(false)

  // ℹ️ We should always pass something but just in case
  if (!storesName?.length) return true

  const [currentStep, setStep] = useState(0)
  const storesToRehydrate = storesName.length

  useEffect(() => {
    storesName.forEach((name: StoresNameType) => {
      AsyncStorage.getItem(`@${appName}Store:${String(name)}`)
        .then(response => {
          if (response) {
            const data = JSON.parse(response)
            stores[name].rehydrate?.(data)
          }
        })
        .finally(() => setStep(currentStep + 1))
    })
    // ℹ️ Adding deps here will make this effect not run once,
    // which will end up in an infinite loop (no bueno 😒)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // ℹ️ We're done once all the stores we wanted to rehydrate are
    if (currentStep === storesToRehydrate) {
      setIsRehydrated(true)
    }
  }, [currentStep, storesToRehydrate])

  return isRehydrated
}
