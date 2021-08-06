import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'

// MAIN STACK
export type MainStackParamsType = {
  Launch?: never
  Auth?: never
  App?: never
}

export type MainStackNavigationType<T extends keyof MainStackParamsType> = StackNavigationProp<MainStackParamsType, T>

export type MainStackRouteType<T extends keyof MainStackParamsType> = RouteProp<MainStackParamsType, T>

// AUTH STACK
export type AuthStackParamsType = {
  Welcome?: never
}

export type AuthStackNavigationType<T extends keyof AuthStackParamsType> = StackNavigationProp<AuthStackParamsType, T>

export type AuthStackRouteType<T extends keyof AuthStackParamsType> = RouteProp<AuthStackParamsType, T>

// APP BOTTOM TAB
export type AppBottomTabParamsType = {
  Home?: never
  Tips?: never
  Activity?: never
  ProfileStack?: never
}

export type AppBottomTabNavigationType<T extends keyof AppBottomTabParamsType> = CompositeNavigationProp<
  BottomTabNavigationProp<AppBottomTabParamsType, T>,
  StackNavigationProp<MainStackParamsType>
>

export type AppBottomTabRouteType<T extends keyof AppBottomTabParamsType> = RouteProp<AppBottomTabParamsType, T>

// PROFILE STACK
export type ProfileStackParamsType = {
  Profile?: never
}

export type ProfileStackNavigationType<T extends keyof ProfileStackParamsType> = StackNavigationProp<
  ProfileStackParamsType,
  T
>

export type ProfileStackRouteType<T extends keyof ProfileStackParamsType> = RouteProp<ProfileStackParamsType, T>
