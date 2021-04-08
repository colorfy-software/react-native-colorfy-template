import { renderHook, act } from '@testing-library/react-hooks'

import useForm, { FormValidatorType } from '../../src/hooks/use-form'

/*
### TESTING

1. Test types
2. Test handling validation errors
3. Test handling a success case
4. Test handling clearing the state
*/

const LOGIN_FORM = {
  email: '',
  password: '',
}

const LOGIN_FORM_VALIDATION: FormValidatorType<typeof LOGIN_FORM> = {
  email: {
    validatorFn: (value): false | string => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isEmail = re.test(value)

      if (isEmail) {
        return false
      }

      return 'This is not a valid email format'
    },
  },
  password: {
    validatorFn: (value): false | string => {
      if (value.length >= 6) {
        return false
      }

      return 'Password needs to be longer than 6 characters'
    },
  },
}

describe('📝 Hooks > useForm:', () => {
  it('checks for incorrect form values', () => {
    const { result } = renderHook(() =>
      useForm(
        {
          email: '',
          // @ts-expect-error NOTE: We know the argument isn't a Number
          password: 0,
        },
        LOGIN_FORM_VALIDATION,
        () => {
          // console.log({ values })
        },
      ),
    )

    expect(result.error?.message).toBe(
      'useForm() expected type string for key: password, but got number. All values need to be of type string',
    )
  })

  it('checks for incorrect validation values', () => {
    const { result } = renderHook(() =>
      useForm(
        LOGIN_FORM,
        {
          email: {
            validatorFn: false,
          },
          password: {
            // @ts-expect-error NOTE: We know the argument isn't a Number
            validatorFn: 5,
          },
        },
        () => {
          // console.log({ values })
        },
      ),
    )

    expect(result.error?.message).toBe(
      'useForm() expected validatorFN() of type Function or Boolean for key: password, but got number',
    )

    expect.assertions(1)
  })

  it('keeps tracks of updates in form', () => {
    const { result } = renderHook(() =>
      useForm(LOGIN_FORM, LOGIN_FORM_VALIDATION, () => {
        // console.log({ values })
      }),
    )

    expect(result.current.state.email).toBe('')

    expect(result.current.errors).toStrictEqual({
      email: false,
      password: false,
    })

    act(() => {
      result.current.onHandleChange('email', 'hello')
    })

    expect(result.current.state).toStrictEqual({
      email: 'hello',
      password: '',
    })

    act(() => {
      result.current.onHandleSubmit()
    })

    expect(result.current.errors).toStrictEqual({
      email: 'This is not a valid email format',
      password: 'Password needs to be longer than 6 characters',
    })

    expect.assertions(4)
  })

  it('handles inputs updates and submits as expected', () => {
    const { result } = renderHook(() =>
      useForm(LOGIN_FORM, LOGIN_FORM_VALIDATION, () => {
        // console.log({ values })
      }),
    )

    expect(result.current.state).toStrictEqual({
      email: '',
      password: '',
    })

    expect(result.current.errors).toStrictEqual({
      email: false,
      password: false,
    })

    act(() => {
      result.current.onHandleChange('email', 'hello@woop.com')
      result.current.onHandleChange('password', '123456')
    })

    // console.log(result.current.state)

    expect(result.current.state).toStrictEqual({
      email: 'hello@woop.com',
      password: '123456',
    })

    act(() => {
      result.current.onHandleSubmit()
    })

    expect(result.current.errors).toStrictEqual({
      email: false,
      password: false,
    })

    expect.assertions(4)
  })
})
