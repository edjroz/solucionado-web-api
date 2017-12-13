/**
 * Require module dependencies.
 */
import Koa from 'koa'

import solutions from './routes/solutions'

export default (services) => {
  const app = new Koa()

  solutions({ app, services })

  return app.callback()
}
