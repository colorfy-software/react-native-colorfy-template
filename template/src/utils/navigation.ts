import { NavigationContainerRef, Route } from '@react-navigation/native'
import { createRef } from 'react'

import { AuthStackParamType, MainTabParamType } from '../types/navigation-types'

type RouteNameType = keyof AuthStackParamType | keyof MainTabParamType
type ParamsType = AuthStackParamType[keyof AuthStackParamType] | MainTabParamType[keyof MainTabParamType]

const _navigation = createRef<NavigationContainerRef>()
const isReadyRef = createRef<boolean>()

type RouteStateType = Route<string, Record<string, unknown> | undefined> | undefined

const NavigationUtil = {
  isReadyRef,
  setRef: _navigation,
  getCurrentRoute: (): RouteStateType => {
    if (isReadyRef.current && _navigation.current) {
      return _navigation.current?.getCurrentRoute() as RouteStateType
    } else {
      console.warn('❌ Navigation not mounted, cannot getCurrentRoute()')
    }
  },
  goBack: (): void => {
    if (isReadyRef.current && _navigation.current) {
      _navigation.current?.goBack()
    } else {
      console.warn('❌ Navigation not mounted, cannot goBack()')
    }
  },
  navigate: (name: RouteNameType, params?: ParamsType): void => {
    if (isReadyRef.current && _navigation.current) {
      _navigation.current?.navigate(name, params)
    } else {
      console.warn('❌ Navigation not mounted, cannot navigate()')
    }
  },
}

export default NavigationUtil
