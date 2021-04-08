import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'

// MAIN STACK
export type MainStackParamType = {
  Launch: Record<string, unknown>
  Auth: Record<string, unknown>
  App: Record<string, unknown>
}

export type MainStackNavigationType<T extends keyof MainStackParamType> = StackNavigationProp<MainStackParamType, T>

export type MainStackRouteType<T extends keyof MainStackParamType> = RouteProp<MainStackParamType, T>

// AUTH STACK
export type AuthStackParamType = {
  Welcome: Record<string, unknown>
}

export type AuthStackNavigationType<T extends keyof AuthStackParamType> = StackNavigationProp<AuthStackParamType, T>

export type AuthStackRouteType<T extends keyof AuthStackParamType> = RouteProp<AuthStackParamType, T>

// PROFILE STACK
export type ProfileStackParamType = {
  ProfileScreen: Record<string, unknown>
}

export type ProfileStackNavigationType<T extends keyof ProfileStackParamType> = StackNavigationProp<
  ProfileStackParamType,
  T
>

export type ProfileStackRouteType<T extends keyof ProfileStackParamType> = RouteProp<ProfileStackParamType, T>

// MAIN TABS
export type MainTabParamType = {
  Home: Record<string, unknown>
  Tips: Record<string, unknown>
  Activity: Record<string, unknown>
  Profile: Record<string, unknown>
}

export type MainTabNavigationType<T extends keyof MainTabParamType> = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamType, T>,
  StackNavigationProp<MainStackParamType>
>

export type MainTabRouteType<T extends keyof MainTabParamType> = RouteProp<MainTabParamType, T>
