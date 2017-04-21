import React from 'react'
import Router from 'next/router'
import { loadUser } from '../utils/authenticate'
import redirect from '../utils/redirect'
import SnackBar from '../components/Snackbar'

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
    constructor (props) {
      super(props)
      this.state = {
        show: false,
        message: ''
      }
      this.handleAuthChange = this.handleAuthChange.bind(this)
      this.onSanckbarClose = this.onSanckbarClose.bind(this)
      this.updateNetworkStatus = this.updateNetworkStatus.bind(this)
    }
    onSanckbarClose () {
      console.log('snackbar closed')
      this.setState({
        show: false,
        message: ''
      })
    }
    handleAuthChange (eve) {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`)
      }
    }
    updateNetworkStatus () {
      if (navigator.onLine) {
        const body = document.querySelector('body')
        body.style.filter = 'grayscale(0)'
        body.style.pointerEvents = 'auto'
        this.setState({
          show: true,
          message: 'You are \'Online\''
        })
      } else {
        const body = document.querySelector('body')
        body.style.filter = 'grayscale(1)'
        body.style.pointerEvents = 'none'
        this.setState({
          show: true,
          message: 'You are \'Offline\''
        })
      }
    }
    componentDidMount () {
      require('../utils/offlineInstaller')
      window.addEventListener('storage', this.handleAuthChange, false)
      window.addEventListener('online', this.updateNetworkStatus, false)
      window.addEventListener('offline', this.updateNetworkStatus, false)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.handleAuthChange, false)
      window.removeEventListener('online', this.updateNetworkStatus, false)
      window.removeEventListener('offline', this.updateNetworkStatus, false)
    }
    render () {
      return (
        <div>
          <Page {...this.props} />
          <SnackBar
            onClose={this.onSanckbarClose}
            show={this.state.show}
            timer={4000}
          >
            <p>{this.state.message}</p>
          </SnackBar>
        </div>
      )
    }
  }
}
