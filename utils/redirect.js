import Router from 'next/router'

export default (
  ctx,
  to = `/profile?next=${encodeURIComponent(ctx.req ? ctx.req.url : ctx.pathname)}`
) => {
  console.log(ctx)
  if (ctx.res) {
    ctx.res.writeHead && ctx.res.writeHead(302, { Location: to })
    ctx.res.end && ctx.res.end()
    return {}
  } else {
    return Router.push(to)
  }
}
