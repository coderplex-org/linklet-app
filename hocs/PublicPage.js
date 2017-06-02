import React from 'react'
import { loadUser } from '../utils/authenticate'

export default Page => {
  return class PublicPage extends React.Component {
    static async getInitialProps (ctx) {
      try {
        const authData = await loadUser(ctx)
        let initialProps = {}
        if (Page.getInitialProps) {
          initialProps = await Page.getInitialProps(ctx)
        }
        if (!authData) {
          return { ...initialProps, isAuthenticated: false }
        }
        return { ...authData, ...initialProps }
      } catch (e) {
        throw e
      }
    }
    render () {
      return (<Page {...this.props} />)
    }
  }
}
