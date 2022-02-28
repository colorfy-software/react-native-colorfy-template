import { StyleSheet, View } from 'react-native'
import { useModal } from 'react-native-modalfy'

import type { ModalsParamsType } from '../../types/modals-types'

import AppText from '../../components/AppText'
import Button from '../../components/Button'

import { Assets } from '../../assets'
import { DEVICE } from '../../styles/style-guide'
import { getLocalizedString } from '../../locales'

const Home = (): JSX.Element => {
  const { openModal } = useModal<ModalsParamsType>()
  return (
    <View testID="Home" style={styles.container}>
      <AppText type="subTitle" testID="Home.Title">
        {getLocalizedString('general.home')}
      </AppText>
      <Button
        title="🖤"
        style={styles.button}
        onPress={() =>
          openModal('AlertModal', {
            image: Assets.imgLogo,
            title: 'colorfy GmbH',
            message: 'Made with 🖤 in Berlin',
          })
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: DEVICE.verticalScale(30),
  },
})

export default Home
