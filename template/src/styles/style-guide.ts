import { colorsStyles } from './colors'
import { screenStyles } from './screen'
import { typographyStyles, FontFamilyEnum } from './fonts'

export const boxShadow = {
  elevation: 5,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.16,
  shadowRadius: 4,
} as const

// NOTE: This is required so that VS Code will auto import these variables from this file only.
export { FontFamilyEnum as FontFamily, colorsStyles as colors, screenStyles as screen, typographyStyles as typography }
