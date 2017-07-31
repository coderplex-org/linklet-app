import React from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import SnackBar from '../components/Snackbar'
import { initGA, logEvent, logPageView } from '../lib/analytics'

Router.onRouteChangeStart = () => {
  console.log('started listening')
  NProgress.start()
}
Router.onRouteChangeComplete = url => {
  logEvent('Navigation', `Navigated to ${url}`)
  NProgress.done()
}
Router.onRouteChangeError = () => {
  NProgress.done()
}

export default Page => {
  return class ContainerPage extends React.Component {
    static async getInitialProps (ctx) {
      try {
        let initialProps = {}
        if (Page.getInitialProps) {
          initialProps = await Page.getInitialProps(ctx)
        }
        return { ...initialProps }
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
          message: "You are 'Online'"
        })
      } else {
        const body = document.querySelector('body')
        body.style.filter = 'grayscale(1)'
        body.style.pointerEvents = 'none'
        this.setState({
          show: true,
          message: "You are 'Offline'"
        })
      }
    }
    componentDidMount () {
      console.log('started')
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
      require('../utils/offlineInstaller')
      window.addEventListener('storage', this.handleAuthChange, false)
      window.addEventListener('online', this.updateNetworkStatus, false)
      window.addEventListener('offline', this.updateNetworkStatus, false)
      window.HW_config = {
        selector: '#changelog', // CSS selector where to inject the badge
        account: 'xMjW37' // your account ID
      }
      if (document.getElementById('changelog-script')) {
        window.Headway.init(window.HW_config)
      } else {
        const s1 = document.createElement('script')
        s1.id = 'changelog-script'
        s1.async = true
        s1.src = 'https://cdn.headwayapp.co/widget.js'
        s1.charset = 'UTF-8'
        document.body.appendChild(s1)
      }
      if (!navigator.onLine) {
        const body = document.querySelector('body')
        body.style.filter = 'grayscale(1)'
        this.setState({
          show: true,
          message: "You are 'Offline'"
        })
      }
    }

    componentWillUnmount () {
      console.log('unmounted')
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
            <p>
              {this.state.message}
            </p>
          </SnackBar>
        </div>
      )
    }
  }
}
