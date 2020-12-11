declare interface Window {
  enableStoreLogging?: boolean
}

declare namespace NodeJS {
  export interface Global {
    window: Window
    document: Document
    __REMOTEDEV__: boolean
  }
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '*.png'
declare module 'react-native-redash/lib/typescript/v1'
