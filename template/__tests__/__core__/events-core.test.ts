import core from '../../src/core/core'

describe('🧠 Core > events:', () => {
  const testChannel = 'jest'
  const testEvent = { message: 'hello world!' }

  beforeEach(() => {
    core.events.clearAll()
  })

  it('send() does send events', () => {
    expect(() => core.events.send(testChannel, testEvent)).not.toThrowError()
  })

  it('listen() does listen to events', () => {
    core.events.listen(testChannel, (event) => {
      expect(event).toStrictEqual(testEvent)
    })
    core.events.send(testChannel, testEvent)

    expect.assertions(1)
  })

  it('clearAll() clears all events handlers', () => {
    core.events.listen(testChannel, (event) => {
      // NOTE: This way we now for sure there is at least one event handler registered.
      expect(event).toStrictEqual(testEvent)
    })
    core.events.send(testChannel, testEvent)

    const eventHandlerMap = core.events.clearAll()

    expect(eventHandlerMap).toStrictEqual(new Map())
    expect.assertions(2)
  })
})
