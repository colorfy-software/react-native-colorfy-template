import { PropsWithChildren } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { ModalOptions, useModal } from 'react-native-modalfy'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import { ModalsParamsType } from '../types/modals-types'

import AppText from '../components/AppText'
import Button from '../components/Button'

import { getLocalizedString } from '../locales'
import { Colors, Device } from '../styles/style-guide'
import { Images } from '../assets'

interface PropsType {
  title?: string
  titleColor?: string
  actions?: ActionType[]
  noAction?: boolean
  noHeader?: boolean
  testIDs?: {
    title?: string
    image?: string
    emoji?: string
    container?: string
    scrollView?: string
    closeButton?: string
    primaryAction?: string
    secondaryAction?: string
  }
  closeBehavior?: ModalOptions['backBehavior']
  containerStyle?: StyleProp<ViewStyle>
}

export interface ActionType {
  type?: 'primary' | 'secondary'
  onPress?: () => void
  title?: string
}

const ModalContainer = ({
  actions,
  testIDs,
  children,
  noAction,
  noHeader,
  title = '',
  titleColor,
  closeBehavior,
  containerStyle,
}: PropsWithChildren<PropsType>): JSX.Element => {
  const { closeModal, closeAllModals } = useModal<ModalsParamsType>()
  const closeButtonOnPress =
    closeBehavior === 'none' ? undefined : closeBehavior === 'clear' ? () => closeAllModals() : () => closeModal()

  /**
   * NOTE: We always display at least one primary action to close the modal.
   */
  const getAction = (type: ActionType['type']) => {
    if (noAction) return null

    const output = actions?.find(action => action.type === type)
    if (output) return output

    return type === 'primary'
      ? {
          type: 'primary',
          title: actions?.[0]?.title || getLocalizedString('notifications.defaultNotification_buttonText'),
          onPress: actions?.[0]?.onPress || closeButtonOnPress,
        }
      : undefined
  }

  const closeButtonOpacity = closeBehavior === 'none' ? 0 : 1

  const primaryAction = getAction('primary')
  const secondaryAction = getAction('secondary')

  return (
    <View testID={testIDs?.container} style={styles.container}>
      {/* NOTE: HEADER */}
      {!noHeader && (
        <View style={styles.header}>
          <View style={[styles.closeButton, styles.invisible]}>
            <Images.CloseButton style={styles.closeButtonImage} />
          </View>
          <AppText
            color={titleColor || Colors.text}
            testID={testIDs?.title}
            style={styles.title}
            ellipsizeMode="tail"
            numberOfLines={2}
            type="subTitle">
            {title}
          </AppText>
          <Pressable
            disabled={Boolean(!closeButtonOpacity)}
            testID={testIDs?.closeButton}
            style={[styles.closeButton, { opacity: closeButtonOpacity }]}
            onPress={closeButtonOnPress}>
            <Images.CloseButton style={styles.closeButtonImage} />
          </Pressable>
        </View>
      )}

      {/* NOTE: CONTENT */}
      <ScrollView
        bounces={false}
        testID={testIDs?.scrollView}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollView, noHeader && styles.scrollViewNoHeader, containerStyle as ViewStyle]}
        keyboardShouldPersistTaps="handled">
        <>{children}</>
      </ScrollView>

      {/* NOTE: ACTIONS */}
      {primaryAction && (
        <Button
          testID={testIDs?.primaryAction}
          title={primaryAction.title || getLocalizedString('notifications.defaultNotification_buttonText')}
          style={[styles.primaryAction, !secondaryAction && styles.singleAction]}
          onPress={primaryAction.onPress || closeButtonOnPress}
        />
      )}
      {secondaryAction && (
        <Button
          tertiary
          testID={testIDs?.secondaryAction}
          title={secondaryAction.title ?? getLocalizedString('general.cancel')}
          onPress={secondaryAction.onPress || closeButtonOnPress}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Device.vw(100),
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: Device.windowHeight - Device.statusBarHeight,
    ...(Device.hasNotch && {
      paddingBottom: 20,
      alignSelf: 'center',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    }),
  },
  header: {
    width: '100%',
    height: 60,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
  invisible: {
    opacity: 0,
  },
  closeButton: {
    padding: 15,
    marginTop: 2.5,
    marginRight: 5,
  },
  closeButtonImage: {
    width: 30,
  },
  scrollView: {
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  scrollViewNoHeader: {
    paddingTop: 20,
  },
  singleAction: {
    marginBottom: 20,
  },
  primaryAction: {
    alignSelf: 'center',
    minWidth: 150,
    marginTop: 20,
    marginBottom: 10,
  },
})

export default ModalContainer
