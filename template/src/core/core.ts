import app from './app-core'
import user from './user-core'
import events from './events-core'

class Core {
  /**
   * Used to handle data general to the whole app functioning
   */
  app = app

  /**
   * Used to handle user data
   */
  user = user

  /**
   * Used to handle events emission/subscription
   */
  events = events
}

export default new Core()
