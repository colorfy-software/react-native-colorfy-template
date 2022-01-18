import mitt, { EventHandlerMap, Handler } from 'mitt'

type EventMessage = Record<string, string | number> | string | number

// NOTE: Make sure to always write tests for every new method you add.

/**
 * This is a Vue inspired global event handler.
 * You can send events with specific keys, and then listen to those keys elsewhere.
 * @example DrawerMenu.tsx => core.events.send('drawer_menu_pan', { panX, panY })
 * @example Home.tsx => core.events.listen('drawer_menu_pan', (message) => console.log(message)) // An now you can animate home screen easily in sync with drawer for ie.
 */
class Events {
  emitter = mitt<{ [key: string]: EventMessage }>()

  /**
   * Sends a message to a given channel.
   * @param channel - `string`— Channel to send the message toStrictEqual.
   * @param message - `Record<string, string | number>`— Data to send.
   * @example DrawerMenu.tsx => core.events.send('drawer_menu_pan', { panX, panY })
   */
  send = (channel: string, message: EventMessage): void => {
    this.emitter.emit(channel, message)
  }

  /**
   * Listens to a given channel.
   * @param channel -  `string`— Channel to listen to.
   * @param onMessage - `Handler`— Listen to call when a message is received.
   * @example Home.tsx => core.events.listen('drawer_menu_pan', (message) => console.log(message)) // An now you can animate home screen easily in sync with drawer for ie.
   */
  listen = (channel: string, onMessage: Handler<EventMessage>): void => {
    this.emitter.on(channel, onMessage)
  }

  /**
   * Clears all the events listeners.
   * @returns `EventHandlerMap`— The empty event handler Map.
   */
  clearAll = (): EventHandlerMap<{ [key: string]: EventMessage }> => {
    this.emitter.all.clear()
    return this.emitter.all
  }
}

export default new Events()
