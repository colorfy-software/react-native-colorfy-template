import { render } from '@testing-library/react-native'

import App from '../src/App'

describe('🌍 App:', () => {
  const { toJSON } = render(<App />)

  it('renders correctly', () => {
    expect(toJSON()).toMatchSnapshot()

    expect.assertions(1)
  })
})
