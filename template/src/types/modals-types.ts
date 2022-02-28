import type { ComponentProps } from 'react'
import type { ModalOptions } from 'react-native-modalfy'
import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native'

import type ModalContainer from '../modals/ModalContainer'

type ModalContainerPropsType = ComponentProps<typeof ModalContainer>

export interface ModalsParamsType {
  AlertModal: {
    title?: ModalContainerPropsType['title']
    message: string
    noAction?: boolean
    noHeader?: boolean
    titleColor?: ModalContainerPropsType['titleColor']
    actions?: ModalContainerPropsType['actions']
    image?: ImageSourcePropType
    imageStyle?: StyleProp<ImageStyle>
    closeBehavior?: ModalOptions['backBehavior']
    testIDs?: ModalContainerPropsType['testIDs'] & { message?: string }
  }
}
