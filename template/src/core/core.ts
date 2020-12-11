import user from './user-core'
import events from './events-core'

class Core {
  /**
   * Used to handle user data
   */
  user = user

  /**
   * This is a Vue inspired global event handler.
   *
   * You can send events with specific keys, and then listen to those keys elsewhere.
   *
   * @example DrawerMenu.tsx => core.events.send('drawer_menu_pan', { panX, panY })
   * @example Home.tsx => core.events.listen('drawer_menu_pan', (message) => console.log(message)) // An now you can animate home screen easily in sync with drawer
   */
  events = events
}

export default new Core()
