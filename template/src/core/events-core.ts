import mitt, { EventHandlerMap, Handler } from 'mitt'

/**
 * This is a Vue inspired global event handler.
 *
 * You can send events with specific keys, and then listen to those keys elsewhere.
 *
 * @example DrawerMenu.tsx => core.events.send('drawer_menu_pan', { panX, panY })
 * @example Home.tsx => core.events.listen('drawer_menu_pan', (message) => console.log(message)) // An now you can animate home screen easily in sync with drawer
 */

// NOTE: Make sure to always write tests for every new method you add
class Events {
  emitter = mitt()

  /**
   * Sends a message to a given channel
   *
   * @param channel - Channel to send the message toStrictEqual
   * @param message - Message to send
   * @example DrawerMenu.tsx => core.events.send('drawer_menu_pan', { panX, panY })
   */
  send = (
    channel: string,
    params: { [key: string]: string | number },
  ): void => {
    this.emitter.emit(channel, params)
  }

  /**
   * Listens to a given channel
   *
   * @param channel - Channel to listen to
   * @param onMessage - Listen to call when a message is received
   * @example Home.tsx => core.events.listen('drawer_menu_pan', (message) => console.log(message)) // An now you can animate home screen easily in sync with drawer
   */
  listen = (channel: string, onMessage: Handler<unknown>): void => {
    this.emitter.on(channel, onMessage)
  }

  /**
   * Clears all the events listeners
   */
  clearAll = (): EventHandlerMap => {
    this.emitter.all.clear()
    return this.emitter.all
  }
}

export default new Events()
