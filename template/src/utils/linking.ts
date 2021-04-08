import { Linking, Platform, Share, ShareAction } from 'react-native'

import { getLocalizedString } from '../locales'
import { colors } from '../styles/style-guide'

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
      tintColor: colors.PRIMARY,
    },
  )
}

export const call = (phoneNumber: number | string): Promise<void> =>
  Linking.canOpenURL(`tel:${phoneNumber}`)
    .then(supported => {
      return !supported ? null : Linking.openURL(`tel:${phoneNumber}`)
    })
    .catch(error => {
      console.log('Linking.canOpenURL', { error })
    })

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

export const openURL = (url: string): Promise<void> =>
  Linking.canOpenURL(url)
    .then(supported => {
      return !supported ? null : Linking.openURL(url)
    })
    .catch(error => {
      console.log('Linking.openURL', { error })
    })

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
