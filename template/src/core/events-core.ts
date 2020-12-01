import mitt from 'mitt'

/**
 * @description This is a Vue inspired global event handler.
 *
 * You can send events with specific keys, and then listen to those keys elsewhere.
 *
 * @example DrawerMenu.tsx => core.events.send('drawer_menu_pan', { panX, panY })
 * @example Home.tsx => core.events.listen('drawer_menu_pan', (message) => console.log(message)) // An now you can animate home screen easily in sync with drawer
 */

class Events {
  emitter = mitt()

  send = (channel: string, params): void => {
    this.emitter.emit(channel, params)
  }

  listen = (
    channel: string,
    onMessage: (channel: string, event: any) => void,
  ): void => {
    this.emitter.on(channel, (event) => onMessage(channel, event))
  }
}

export default new Events()
