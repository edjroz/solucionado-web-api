module.exports = async (ctx, next) => {
  const token = ctx.headers.authorization
  
  if (token) {
    const session = ctx.services.session.getByToken(token)
    
    if (session) {
      await ctx.services.session.checkAndUpdateSession(session.token)
      ctx.session = session
    } else {
      ctx.session = false
    }
  }

  await next()
}
