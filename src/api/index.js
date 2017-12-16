/**
 * Require module dependencies.
 */
import Koa from 'koa'
import koaBody from 'koa-body'

import apiResponseMiddleware from './middlewares/apiResponse'
import loggerMiddleware from './middlewares/logger'
import sessionMiddleware from './middlewares/session'

import solutionsRoutes from './routes/solutions'

export default (services) => {
  const app = new Koa()

  // Json parser middleware
  app.use(koaBody())
  // Logging requests
  app.use(loggerMiddleware)
  // Use a general API response structure
  app.use(apiResponseMiddleware)
  // Validate sessions with Authorization headers.
  app.use(sessionMiddleware)

  solutionsRoutes({ app, services })

  return app.callback()
}
