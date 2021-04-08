import React from 'react'
import { render } from '@testing-library/react-native'

import App from '../App'

describe('App:', () => {
  const { toJSON } = render(<App />)

  it('renders correctly', () => {
    expect(toJSON()).toMatchSnapshot()
  })
})
