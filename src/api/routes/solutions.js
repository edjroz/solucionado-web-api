/**
 * Require module dependencies.
 */
import koaRouter from 'koa-router'

export default ({ app, services }) => {
  const router = koaRouter()

  router.get('/solutions/', async (ctx, next) => {
    ctx.body = await services.solutions.all()
    await next()
  })

  app.use(router.allowedMethods())
  app.use(router.routes())
}
