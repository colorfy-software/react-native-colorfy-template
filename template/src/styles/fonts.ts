import { StyleSheet } from 'react-native'

import { screenStyles } from './screen'

export enum FontFamilyEnum {
  /**
   * @constant 'NotoSansSC-Bold'
   */
  notoSansScBold = 'NotoSansSC-Bold',
  /**
   * @constant 'NotoSansSC-Medium'
   */
  notoSansScMedium = 'NotoSansSC-Medium',
  /**
   * @constant 'NotoSansSC-Regular'
   */
  notoSansScRegular = 'NotoSansSC-Regular',
  /**
   * @constant 'NotoSansSC-Light'
   */
  notoSansScLight = 'NotoSansSC-Light',
}

export const typographyStyles = StyleSheet.create({
  /**
   * @description 31px | Noto Sans SC Bold
   */
  bigTitle: {
    fontFamily: FontFamilyEnum.notoSansScBold,
    fontSize: screenStyles.horizontalScale(31),
    lineHeight: 36,
    letterSpacing: -0.55,
  },
  /**
   * @description 22px | Noto Sans SC Bold
   */
  title: {
    fontFamily: FontFamilyEnum.notoSansScBold,
    fontSize: screenStyles.horizontalScale(24),
    lineHeight: 29,
    letterSpacing: -0.5,
  },
  /**
   * @description 20px | Noto Sans SC Bold
   */
  subTitle: {
    fontFamily: FontFamilyEnum.notoSansScBold,
    fontSize: screenStyles.horizontalScale(20),
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  /**
   * @description 14px | Noto Sans SC Medium
   */
  body: {
    fontFamily: FontFamilyEnum.notoSansScMedium,
    fontSize: screenStyles.horizontalScale(14),
    lineHeight: 16,
    letterSpacing: -0.3,
  },
  /**
   * @description 10px | Noto Sans SC Regular
   */
  label: {
    fontFamily: FontFamilyEnum.notoSansScRegular,
    fontSize: screenStyles.horizontalScale(10),
    lineHeight: 16,
    letterSpacing: -0.21,
  },
})
