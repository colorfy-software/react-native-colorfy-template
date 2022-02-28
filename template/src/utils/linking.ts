import { Linking, Platform, Share, ShareAction } from 'react-native'

import { COLORS } from '../styles/style-guide'
import { getLocalizedString } from '../locales'

type CoordinatesType = {
  latitude: number
  longitude: number
  name: string
}

type SharedContentType = {
  title: string
  url?: string
  content?: string
  subject?: string
}

/**
 * Shares content via the platform native shared action sheet.
 * @param sharedContent - `{ SharedContentType }`– Provide the content.
 */
export const share = (sharedContent: SharedContentType): Promise<ShareAction> => {
  const { title, content, url = '', subject = '' } = sharedContent
  return Share.share(
    {
      title,
      message: content,
      url,
    },
    {
      subject,
      dialogTitle: getLocalizedString('general.share'),
      tintColor: COLORS.primary,
    },
  )
}

/**
 * Calls the provided phone number (if supported by the platform).
 * @param phoneNumber - `{ number | string }`– The phone number to call.
 */
export const call = (phoneNumber: number | string): Promise<void> =>
  Linking.canOpenURL(`tel:${phoneNumber}`)
    .then(supported => {
      return !supported ? null : Linking.openURL(`tel:${phoneNumber}`)
    })
    .catch(error => {
      console.log('Linking.canOpenURL', { error })
    })

/**
 * Opens the user's email client composer with provided info (if supported by the platform).
 * @param address - `{ string }`– The recipient email address.
 * @param subject - `{ string }`– Optional. The email subject.
 * @param body - `{ string }`– Optional. The email body.
 * @param cc - `{ string }`– Optional. The email(s) to put in carbon copy.
 */
export const email = (address: string, subject = '', body = '', cc = ''): Promise<void> =>
  Linking.canOpenURL(`mailto:${address}?subject=${subject}&body=${body}${cc && `&cc=${cc}`}`)
    .then(supported => {
      return !supported
        ? null
        : Linking.openURL(`mailto:${address}?subject=${subject}&body=${body}${cc && `&cc=${cc}`}`)
    })
    .catch(error => {
      console.log('Linking.email', { error })
    })

/**
 * Opens the provided URL (if valid).
 * @param url - `{ string }`– The URL to open.
 */
export const openURL = (url: string): Promise<void> =>
  Linking.canOpenURL(url)
    .then(supported => {
      return !supported ? null : Linking.openURL(url)
    })
    .catch(error => {
      console.log('Linking.openURL', { error })
    })

/**
 * Opens Apple Maps (on iOS)/Google Maps (on Android) and start navigation to the provided coordinates.
 * @param coordinates - `{ CoordinatesType }`– The coordinates to open.
 */
export const startNavigation = (coordinates: CoordinatesType): void => {
  let url: string

  if (Platform.OS === 'ios') {
    url = `https://maps.apple.com/?q=${coordinates.name}&sll=` + `${coordinates.latitude},${coordinates.longitude}`
  } else {
    url = `https://maps.google.com/maps?q=${coordinates.name}&sll=` + `${coordinates.latitude},${coordinates.longitude}`
  }

  Linking.canOpenURL(url)
    .then(supported => {
      return !supported ? null : Linking.openURL(url)
    })
    .catch(error => console.log('Linking.startNavigation', { error }))
}
