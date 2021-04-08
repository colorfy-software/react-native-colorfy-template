/* eslint-disable react/destructuring-assignment */

import {
  View,
  TextInput,
  TextInputProps,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native'
import { PureComponent, forwardRef } from 'react'

import Icon from './icon/Icon'

import { colors, FontFamily } from '../styles/style-guide'

type PropsType = {
  type: string
  disabled?: boolean
  lightMode?: boolean
  error?: string | false
  hideEditIcon?: boolean
  showPasswordIndicator?: boolean
  forwardedRef?: React.ForwardedRef<TextInput>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTextValue?: (stateKey: any, value: string) => void
  value: TextInputProps['value']
  onBlur?: TextInputProps['onBlur']
  onFocus?: TextInputProps['onFocus']
  testIDs?: {
    label: TextInputProps['testID']
    input: TextInputProps['testID']
  }
  multiline?: TextInputProps['multiline']
  placeholder: TextInputProps['placeholder']
  blurOnSubmit?: TextInputProps['blurOnSubmit']
  keyboardType?: TextInputProps['keyboardType']
  returnKeyType?: TextInputProps['returnKeyType']
  autoCapitalize?: TextInputProps['autoCapitalize']
  onSubmitEditing?: TextInputProps['onSubmitEditing']
  textContentType?: TextInputProps['textContentType']
  autoCompleteType?: TextInputProps['autoCompleteType']
  selectTextOnFocus?: TextInputProps['selectTextOnFocus']
}

type StateType = {
  focused: boolean
  isPasswordField: boolean
  passwordVisible: boolean
}

const AnimatedText = Animated.createAnimatedComponent(Text)

class FloatingLabelInput extends PureComponent<PropsType, StateType> {
  state: StateType = {
    focused: false,
    isPasswordField: /(p|P)assword/.test(this.props.type),
    passwordVisible: false,
  }

  static defaultProps = {
    disabled: false,
    error: undefined,
    keyboardType: undefined,
  }

  animatedValue = new Animated.Value(0)

  animatedTranslateYValue = this.props.value?.length ? new Animated.Value(1) : new Animated.Value(0)

  componentDidUpdate(prevProps: PropsType, prevState: StateType): void {
    const { value } = this.props
    const { focused } = this.state
    const wasFocused = prevState.focused
    const isFocused = focused
    const valueAdded = Boolean(!prevProps.value?.length && value?.length)
    const withoutFocus = !wasFocused && !isFocused

    if (valueAdded && withoutFocus) {
      Animated.timing(this.animatedTranslateYValue, {
        toValue: 1,
        duration: 250,
        easing: Easing.bezier(0.26, 0.4, 0.05, 1.06),
        useNativeDriver: false,
      }).start()
    } else if (wasFocused && !isFocused) {
      if (value?.length) {
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 250,
          easing: Easing.bezier(0.26, 0.4, 0.05, 1.06),
          useNativeDriver: false,
        }).start()
      } else {
        Animated.parallel([
          Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 250,
            easing: Easing.bezier(0.26, 0.4, 0.05, 1.06),
            useNativeDriver: false,
          }),
          Animated.timing(this.animatedTranslateYValue, {
            toValue: 0,
            duration: 250,
            easing: Easing.bezier(0.26, 0.4, 0.05, 1.06),
            useNativeDriver: false,
          }),
        ]).start()
      }
    } else if (!wasFocused && isFocused) {
      Animated.parallel([
        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.bezier(0.26, 0.4, 0.05, 1.06),
          useNativeDriver: false,
        }),
        Animated.timing(this.animatedTranslateYValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.bezier(0.26, 0.4, 0.05, 1.06),
          useNativeDriver: false,
        }),
      ]).start()
    }
  }

  onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    const { onFocus } = this.props
    this.setState({ focused: true }, () => onFocus?.(e))
  }

  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    const { onBlur } = this.props
    this.setState({ focused: false }, () => onBlur?.(e))
  }

  onPressPasswordVisibility = (): void => {
    this.setState(state => ({ passwordVisible: !state.passwordVisible }))
  }

  renderLabel = (): JSX.Element => {
    const { error, testIDs, lightMode, placeholder } = this.props

    const label = error ? `${placeholder} (${error})` : placeholder
    const activeColor = error ? colors.ERROR : lightMode ? '#FFF' : colors.PRIMARY
    const inactiveColor = error ? colors.ERROR : lightMode ? '#FFFFFF90' : colors.TEXT

    const fontSize = this.animatedTranslateYValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    })

    const translateY = this.animatedTranslateYValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -32],
    })

    const textColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [inactiveColor, activeColor],
    })

    return (
      <Animated.View style={[styles.label, { transform: [{ translateY }] }]} pointerEvents="none">
        <AnimatedText
          testID={testIDs?.label}
          style={{
            fontFamily: FontFamily.notoSansScRegular,
            fontSize,
            color: textColor,
          }}>
          {label}
        </AnimatedText>
      </Animated.View>
    )
  }

  renderEditIcon = (): JSX.Element => {
    const { error, lightMode } = this.props
    const { focused } = this.state
    const activeColor = error ? colors.ERROR : lightMode ? '#FFF' : colors.PRIMARY
    const tintColor = focused || error ? activeColor : lightMode ? '#FFF' : colors.ICON

    return (
      <View style={styles.editIcon} pointerEvents="none">
        <Icon name="pen" size={24} color={tintColor} />
      </View>
    )
  }

  renderShowPasswordIcon = (): JSX.Element | undefined => {
    const { error, lightMode, showPasswordIndicator, value } = this.props
    const { focused, isPasswordField, passwordVisible } = this.state

    if (isPasswordField && showPasswordIndicator && value?.length) {
      const activeColor = error ? colors.ERROR : lightMode ? '#FFF' : colors.PRIMARY
      const tintColor = focused || error ? activeColor : lightMode ? '#FFF' : colors.ICON

      return (
        <Pressable style={styles.passwordIconPressable} onPress={this.onPressPasswordVisibility}>
          <View style={styles.passwordIconView}>
            <Icon name={passwordVisible ? 'eyeOpen' : 'eyeClosed'} color={tintColor} size={24} />
          </View>
        </Pressable>
      )
    }
  }

  render(): JSX.Element {
    const {
      testIDs,
      disabled,
      error,
      setTextValue,
      type,
      value,
      lightMode,
      forwardedRef,
      keyboardType: kT,
      hideEditIcon,
      showPasswordIndicator,
      selectTextOnFocus,
      returnKeyType,
      multiline,
      autoCompleteType,
      textContentType,
      autoCapitalize,
      blurOnSubmit,
    } = this.props
    const { passwordVisible, focused } = this.state
    const keyboardType = kT || (type === 'email' ? 'email-address' : 'default')
    const secureTextEntry = type.match(/(p|P)assword/) && !passwordVisible
    const editable = !disabled
    const hideEditIndicator =
      hideEditIcon || !editable || (showPasswordIndicator && focused) || (showPasswordIndicator && value?.length)
    const activeColor = error ? colors.ERROR : lightMode ? '#FFF' : colors.PRIMARY
    const borderBottomColor = focused || error ? activeColor : lightMode ? '#FFFFFF80' : colors.ICON

    return (
      <View style={[styles.container, disabled && styles.containerDisabled]}>
        <TextInput
          ref={forwardedRef}
          contextMenuHidden
          testID={testIDs?.input}
          blurOnSubmit={blurOnSubmit}
          autoCapitalize={autoCapitalize || 'none'}
          autoCorrect={false}
          autoCompleteType={autoCompleteType}
          textContentType={textContentType}
          underlineColorAndroid="transparent"
          style={[
            styles.textInputModule,
            {
              ...(multiline && { textAlignVertical: 'top' }),
              borderBottomColor,
              color: activeColor,
              // ...fontStyles.description,
            },
          ]}
          secureTextEntry={Boolean(secureTextEntry)}
          selectTextOnFocus={Boolean(selectTextOnFocus)}
          {...{
            value,
            returnKeyType,
            keyboardType,
            editable,
            multiline,
          }}
          onChangeText={text => setTextValue?.(type, text)}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        {this.renderLabel()}
        {!hideEditIndicator && this.renderEditIcon()}
        {showPasswordIndicator && this.renderShowPasswordIcon()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputModule: {
    fontFamily: FontFamily.notoSansScRegular,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: '100%',
    height: 50,
    padding: 0,
    paddingRight: 35,
    fontSize: 17,
    lineHeight: 16,
  },
  container: {
    alignSelf: 'stretch',
    marginTop: 18,
    marginBottom: 12,
  },
  containerDisabled: {
    opacity: 0.4,
  },
  passwordIconView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordIconPressable: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: -10,
    bottom: 0,
    borderRadius: 21,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 24,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  label: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
  },
})

export default forwardRef<TextInput, PropsType>((props, ref) => <FloatingLabelInput {...props} forwardedRef={ref} />)
