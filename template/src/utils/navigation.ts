import { createRef } from 'react'
import { NavigationContainerRef, Route } from '@react-navigation/native'

import { AppBottomTabParamsType, AuthStackParamsType } from '../types/navigation-types'

type ParamsType = AuthStackParamsType & AppBottomTabParamsType

const isReadyRef = createRef<boolean>()
const navigation = createRef<NavigationContainerRef<ParamsType>>()

type RouteStateType = Route<keyof ParamsType, ParamsType[keyof ParamsType]> | undefined

const NavigationUtil = {
  isReadyRef,
  setRef: navigation,
  getCurrentRoute: (): RouteStateType => {
    if (isReadyRef.current && navigation.current) {
      return navigation.current?.getCurrentRoute() as RouteStateType
    } else {
      console.warn('❌ Navigation not mounted, cannot getCurrentRoute()')
    }
  },
  goBack: (): void => {
    if (isReadyRef.current && navigation.current) {
      navigation.current?.goBack()
    } else {
      console.warn('❌ Navigation not mounted, cannot goBack()')
    }
  },
  navigate: (name: keyof ParamsType, params?: ParamsType[keyof ParamsType]): void => {
    if (isReadyRef.current && navigation.current) {
      navigation.current?.navigate(name, params)
    } else {
      console.warn('❌ Navigation not mounted, cannot navigate()')
    }
  },
}

export default NavigationUtil
