// useForm LIBRARY TYPES

type Form = { [key: string]: string }

interface ValidationType<K> {
  validatorFn: (value: string, values: K) => true | string
  validateOn: 'submit' | 'update'
}

export type FormValidatorType<T> = { [key in keyof T]: ValidationType<T> }

// HELPER FUNCTIONS

function isString(value: unknown): boolean {
  return typeof value === 'string'
}

// ACTUAL useForm FUNCTION

/**
 * @param formSchema Data structure of the form
 * @example
 * const LOGIN_FORM = {
 *  email: '',
 *  password: ''
 * }
 *
 * @param formValidation Validation options for each field in the form
 * @example
 * const LOGIN_FORM_VALIDATION: FormValidatorType<typeof LOGIN_FORM> = {
 *  email: {
 *    validationOn: 'submit',
 *    validationFn: (value): true | string => isLengthy(value) && isValidEmail(value)
 *  },
 *  password: {
 *    validateOn: 'submit',
 *    validationFn: (value): true | string => isLengthy(value) && (value.length >= 6 ? true : 'Password needs to be 6 characters or more')
 *  }
 * }
 *
 * @param onSubmitForm Callback that gets called when form is submitted and no errors have been found
 *
 *
 *
 *
 *
 *
 * @see Bottom of the file for full example
 */
export default function useForm<K extends Form>(
  formSchema: K,
  formValidation: { [key: string]: ValidationType<K> },
  onSubmitForm: (values: K) => void | Promise<void>,
): {
  onHandleChange: (stateKey: keyof K, value: string) => void
  onHandleSubmit: (state: K) => void
  clearState: () => void
  state: K
  errors: { [key in keyof K]: true | string }
} {
  let state = formSchema
  let errors: { [key in keyof K]: true | string } = formSchema

  const onHandleChange = (stateKey: keyof K, value: string): void => {
    state = Object.assign(state, { [stateKey]: value })
  }

  const onHandleSubmit = (newState: K): void => {
    const valueKeys = Object.keys(newState)
    const validator = formValidation

    const errorsArray = valueKeys.map((key) => {
      const validationForKey = validator[key]
      const validationFunction = validationForKey.validatorFn
      const validateOn = validationForKey.validateOn
      const value = newState[key]

      let errorForKey: boolean | string = ''

      if (validateOn === 'submit') {
        if (
          isString(validationFunction(value, newState)) &&
          !isString(errorForKey)
        ) {
          errorForKey = validationFunction(value, newState)
        }
      }

      errors = Object.assign(errors, { [key]: errorForKey })

      return errorForKey
    })

    const hasErrors = errorsArray.filter(
      (error) => error && typeof error === 'string' && error.length > 0,
    )

    if (hasErrors && hasErrors.length === 0) {
      // send submit callback
      onSubmitForm(state)
    }
  }

  const clearState = (): void => {
    state = formSchema
  }

  return {
    onHandleChange,
    onHandleSubmit,
    clearState,
    state,
    errors,
  }
}

// DEMO AREA

// const REGISTRATION_FORM = {
//   email: '',
//   password: '',
//   passwordConfirmation: '',
// }

// const REGISTRATION_FORM_VALIDATION: FormValidatorType<
//   typeof REGISTRATION_FORM
// > = {
//   email: {
//     validateOn: 'submit',
//     validatorFn: (value): true | string => {
//       const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       const isEmail = re.test(value)

//       if (isEmail) {
//         return true
//       }

//       return 'This is not a valid email format'
//     },
//   },
//   password: {
//     validateOn: 'submit',
//     validatorFn: (value): true | string => {
//       if (value.length >= 6) {
//         return true
//       }

//       return 'Password needs to be longer than 6 characters'
//     },
//   },
//   passwordConfirmation: {
//     validateOn: 'submit',
//     validatorFn: (value, values): true | string =>
//       values.password === value ? true : 'The passwords do not match',
//   },
// }

// console.log(REGISTRATION_FORM, REGISTRATION_FORM_VALIDATION)

// const { errors, onHandleChange, onHandleSubmit, state } = useForm(REGISTRATION_FORM, REGISTRATION_FORM_VALIDATION, (values) => {
//   fetch('/register', {
//     body: JSON.stringify({
//       ...values,
//       password_confirmation: values.passwordConfirmation
//     })
//   })
// })

// <TextInput value={state.state.email} onChangeText={(text) => onHandleChange('email', text)} />
// <TextInput value={state.state.password} onChangeText={(text) => onHandleChange('password', text)} />
// <TextInput value={state.state.passwordConfirmation} onChangeText={(text) => onHandleChange('passwordConfirmation', text)} />
