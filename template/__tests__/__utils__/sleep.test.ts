import sleep from '../../src/utils/sleep'

describe('😴 Utils > sleep:', () => {
  it('throws an error if an invalid value is provided', async () => {
    // @ts-expect-error NOTE: We know the argument isn't a number
    await expect(async () => await sleep(undefined)).rejects.toThrowError()
    // @ts-expect-error NOTE: We know the argument isn't a number
    await expect(async () => await sleep('a')).rejects.toThrowError()
    // @ts-expect-error NOTE: We know the argument isn't a number
    await expect(async () => await sleep(null)).rejects.toThrowError()
    expect.assertions(3)
  })

  it('pauses code execution for a given amount of time', async () => {
    const pauseDuration = 2000
    const timestampStart = new Date()

    await sleep(pauseDuration)

    const timestampEnd = new Date()

    expect(timestampEnd.getTime() - timestampStart.getTime()).toBeGreaterThanOrEqual(pauseDuration - 10)

    expect.assertions(1)
  })

  it('does not pause code for more than the given amount of time', async () => {
    const pauseDuration = 2000
    const timestampStart = new Date()

    await sleep(pauseDuration)

    const timestampEnd = new Date()

    expect(timestampEnd.getTime() - timestampStart.getTime()).toBeLessThan(pauseDuration + 1000)

    expect.assertions(1)
  })
})
