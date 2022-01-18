// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jest-fetch-mock').enableMocks()
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'))
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Reanimated = require('react-native-reanimated/mock')

  // NOTE: The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Reanimated.default.call = () => {}

  return Reanimated
})

// NOTE: Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  easeInEaseOut: jest.fn(),
}))

jest.mock('react-native-localize', () => require('react-native-localize/mock.js'))

jest.mock('react-native-device-info', () => require('react-native-device-info/jest/react-native-device-info-mock.js'))

jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('@react-native-community/netinfo', () => require('@react-native-community/netinfo/jest/netinfo-mock.js'))

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'))

jest.mock('date-fns', () => ({
  __esModule: true,
  isEqual: (dateLeft, dateRight) => new Date(dateLeft).getTime() === new Date(dateRight).getTime(),
  isSameMonth: (dateLeft, dateRight) =>
    new Date(dateLeft).getFullYear() === new Date(dateRight).getFullYear() &&
    new Date(dateLeft).getMonth() === new Date(dateRight).getMonth(),
  getTime: date => new Date(date).getTime(),
  startOfMonth: date => {
    const output = new Date(date)
    output.setDate(1)
    output.setHours(0, 0, 0, 0)
    return output
  },
}))

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}))
