import { ReactNodeArray } from 'react'
import { modalfy } from 'react-native-modalfy'
import reactStringReplace from 'react-string-replace'
import Clipboard from '@react-native-clipboard/clipboard'

import { ModalsParamsType } from '../types/modals-types'

import AppText from '../components/AppText'

import sleep from './sleep'
import { Colors } from '../styles/style-guide'
import { getLocalizedString } from '../locales'

const { openModal, closeModal } = modalfy<ModalsParamsType>()

/**
 * Parse a string to replace `*` by a text in bold.
 * @param string - `string`— String to parse.
 * @param options - `{ isError?: boolean }`— Optional. Param to use to tweak the output if you're using this function from the chatbot for instance.
 * @example parseStringForBold('Please, *try again*.') -> 'Please, <AppText bold color={colors.TEXT} type="body">Try again</AppText>.'
 * @returns `React.ReactNodeArray`— A string containing <AppText /> components inside of it if any bold text was found.
 */
export const parseStringForBold = (string: string, options?: { isError?: boolean }): ReactNodeArray =>
  reactStringReplace(string, /\*(.+?)\*/g, (match, i) => (
    <AppText key={i} bold color={options?.isError ? 'white' : Colors.text} type="body">
      {match}
    </AppText>
  ))

/**
 * Copies a string to the phone clipboard and momentarily displays a modal confirming the action.
 * @param string - `string`— String to copy.
 */
export const copyToClipboard = async (string: string): Promise<void> => {
  Clipboard.setString(string)

  openModal('AlertModal', {
    message: string,
    noAction: true,
    title: `${getLocalizedString('general.textCopied')}!`,
  })

  await sleep(1000)
  closeModal('AlertModal')
}
