import React from 'react'
import { loadUser } from '../utils/authenticate'
import redirect from '../utils/redirect'

export default Page => {
  return class SecretPage extends React.Component {
    static async getInitialProps (ctx) {
      try {
        const authData = await loadUser(ctx)
        let initialProps = {}
        if (!authData) {
          const pathName = ctx.req ? ctx.req.url : ctx.pathname
          if (pathName === '/profile') {
            if (Page.getInitialProps) {
              initialProps = await Page.getInitialProps(...ctx)
            }
            return { ...initialProps }
          }
          return redirect(ctx)
        }
        if (Page.getInitialProps) {
          initialProps = await Page.getInitialProps({ ...ctx })
        }
        return { ...authData, ...initialProps }
      } catch (e) {
        throw e
      }
    }
    render () {
      return <Page {...this.props} />
    }
  }
}
