import { Image, StyleSheet, View } from 'react-native'
import type { ModalComponentProp } from 'react-native-modalfy'

import type { ModalsParamsType } from '../types/modals-types'

import ModalContainer from './ModalContainer'
import AppText from '../components/AppText'

type PropsType = ModalComponentProp<ModalsParamsType, void, 'AlertModal'>

const AlertModal = ({ modal: { params = {} as ModalsParamsType['AlertModal'] } }: PropsType): JSX.Element => {
  const {
    titleColor,
    imageStyle,
    noAction,
    noHeader,
    message,
    testIDs,
    actions,
    title,
    image,
    closeBehavior = 'pop',
  } = params

  return (
    <ModalContainer
      actions={actions}
      testIDs={testIDs}
      title={title ?? ''}
      noHeader={noHeader}
      noAction={noAction}
      titleColor={titleColor}
      closeBehavior={closeBehavior}>
      {/* NOTE: ILLUSTRATION */}
      {image && (
        <View style={styles.illustrationWrapper}>
          <View style={styles.illustrationContainer}>
            <Image testID={testIDs?.image} source={image} style={[styles.illustrationImage, imageStyle]} />
          </View>
        </View>
      )}

      {/* NOTE: MESSAGE */}
      <View style={styles.messageContainer}>
        <AppText testID={testIDs?.message} style={styles.messageText}>
          {message}
        </AppText>
      </View>
    </ModalContainer>
  )
}

const styles = StyleSheet.create({
  illustrationWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 24,
    alignItems: 'center',
  },
  illustrationContainer: {
    flex: 1,
    width: 128,
    height: 128,
    alignSelf: 'center',
    flexDirection: 'column',
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
  },
  illustrationImage: {
    width: 128,
    height: 128,
  },
  messageContainer: {
    alignSelf: 'center',
    marginTop: 41,
  },
  messageText: {
    textAlign: 'center',
    lineHeight: 24,
  },
})

export default AlertModal
