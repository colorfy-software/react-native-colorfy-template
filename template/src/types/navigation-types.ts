import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

// SWITCH

export const SWITCH_NAVIGATION_STATES = {
  LAUNCH: 0,
  AUTH: 1,
  APP: 3,
}

export type SwitchNavigationStateKeysType = keyof typeof SWITCH_NAVIGATION_STATES
export type SwitchNavigationStateType = typeof SWITCH_NAVIGATION_STATES[SwitchNavigationStateKeysType]

export type SetSwitchNavigationStateType = (
  state: SwitchNavigationStateType,
) => void

// LAUNCH

export type LaunchStackParamType = {
  Launch: {
    setNavigationState: SetSwitchNavigationStateType
  }
}

export type LaunchStackType<
  T extends keyof LaunchStackParamType
> = StackNavigationProp<LaunchStackParamType, T>

export type LaunchStackRouteType<
  T extends keyof LaunchStackParamType
> = RouteProp<LaunchStackParamType, T>

// AUTH

export type AuthStackParamType = {
  Auth: {
    setNavigationState: SetSwitchNavigationStateType
  }
}

export type AuthStackType<
  T extends keyof AuthStackParamType
> = StackNavigationProp<AuthStackParamType, T>

export type AuthStackRouteType<T extends keyof AuthStackParamType> = RouteProp<
  AuthStackParamType,
  T
>

// APP

export type AppStackParamType = {
  App: {
    setNavigationState: SetSwitchNavigationStateType
  }
}

export type AppStackType<
  T extends keyof AppStackParamType
> = StackNavigationProp<AppStackParamType, T>

export type AppStackRouteType<T extends keyof AppStackParamType> = RouteProp<
  AppStackParamType,
  T
>
