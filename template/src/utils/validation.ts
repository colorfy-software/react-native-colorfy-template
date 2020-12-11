interface InvalidFields {
  key: string
  error: string
}
interface Validation {
  ok: boolean
  invalidFields: InvalidFields[]
}

export default (
  data: { [key: string]: string | null },
  validation: { [key: string]: Function | Function[] },
): Validation => {
  const keys = Object.keys(validation)
  let val: Validation = {
    ok: true,
    invalidFields: [],
  }

  keys.forEach((key) => {
    const validate = validation[key]
    const dataValue = data[key]

    let isValid = false

    if (Array.isArray(validate)) {
      const [validateFn, ...args] = validate
      isValid = validateFn(dataValue, ...args)
    } else {
      isValid = validate(dataValue)
    }

    if (typeof isValid === 'string') {
      val = {
        ...val,
        ok: false,
        invalidFields: [
          ...val.invalidFields,
          {
            key,
            error: isValid,
          },
        ],
      }
    }
  })

  return val
}
