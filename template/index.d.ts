type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

declare namespace NodeJS {
  export interface Global {
    HermesInternal: null | Record<string, unknown>
    window: Window
    document: Document
    __REMOTEDEV__: boolean
    enableStoreLogging?: boolean
  }
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '*.png'
declare module 'react-native-redash/lib/typescript/v1'
