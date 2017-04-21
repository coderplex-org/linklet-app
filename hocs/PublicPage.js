import React from 'react'
import Router from 'next/router'
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
    constructor (props) {
      super(props)

      this.handleAuthChange = this.handleAuthChange.bind(this)
    }

    handleAuthChange (eve) {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`)
      }
    }

    componentDidMount () {
      require('../utils/offlineInstaller')
      window.addEventListener('storage', this.handleAuthChange, false)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.handleAuthChange, false)
    }
    render () {
      return <Page {...this.props} />
    }
  }
}
