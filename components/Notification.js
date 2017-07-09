import React from 'react'
import fetch from 'isomorphic-unfetch'
import SnackBar from './Snackbar'
import NProgress from 'nprogress'

import db from '../lib/db'

export default class Notification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: false,
      show: false,
      message: ''
    }
  }
  componentDidMount () {
    if (Notification.permission === 'denied') {
      console.log('User has blocked push notification.')
      return
    }
    // Get `push notification` subscription
    // If `serviceWorker` is registered and ready
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager
          .getSubscription()
          .then(subscription => {
            // If already access granted, enable push button status
            if (subscription) {
              this.setState({
                checked: true
              })
            } else {
              this.setState({
                checked: false
              })
            }
          })
          .catch(error => {
            console.error('Error occurred while enabling push ', error)
            this.setState({
              show: true,
              message: 'Error occurred while enabling push '
            })
          })
      })
    }
  }
  subscribePush () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (!registration.pushManager) {
          this.setState({
            show: true,
            message: "Sorry, Push notification isn't supported in your browser."
          })
          return
        }
        NProgress.start()
        // To subscribe `push notification` from push manager
        registration.pushManager
          .subscribe({
            userVisibleOnly: true // Always show notification when received
          })
          .then(subscription => {
            console.info('Push notification subscribed.')
            console.log(subscription)
            return this.saveSubscriptionID(subscription)
          })
          .then(() => {
            NProgress.done()
            this.setState({
              checked: true,
              show: true,
              message: 'Successfully subscribed to push notifications.'
            })
          })
          .catch(error => {
            NProgress.done()
            this.setState({
              checked: false,
              show: true,
              message: 'Push notification subscription failed'
            })
            console.error('Push notification subscription error: ', error)
          })
      })
    } else {
      this.setState({
        show: true,
        message: 'Some scripts are not loaded yet, try again after sometime'
      })
    }
  }
  unsubscribePush () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // Get `push subscription`
        registration.pushManager
          .getSubscription()
          .then(subscription => {
            // If no `push subscription`, then return
            if (!subscription) {
              this.setState({
                show: true,
                message: 'Unable to unregister push notification.'
              })
              return
            }
            NProgress.start()
            // Unsubscribe `push notification`
            subscription
              .unsubscribe()
              .then(() => {
                console.info('Push notification unsubscribed.')
                console.log(subscription)
                return this.deleteSubscriptionID(subscription)
              })
              .then(() => {
                NProgress.done()
                this.setState({
                  checked: false,
                  show: true,
                  message: 'Successfully unsubscribed from push notifications.'
                })
              })
              .catch(function (error) {
                NProgress.done()
                console.error(error)
                this.setState({
                  show: true,
                  message: 'Failed to unsubscribe push notification.'
                })
              })
          })
          .catch(error => {
            console.error(error)
            console.error('Failed to unsubscribe push notification.')
            this.setState({
              show: true,
              message: 'Failed to unsubscribe push notification.'
            })
          })
      })
    } else {
      this.setState({
        show: true,
        message: 'Some scripts are not loaded yet, try again after sometime'
      })
    }
  }
  saveSubscriptionID (subscription) {
    var subscriptionId =
      subscription.endpoint.split('gcm/send/')[1] ||
      subscription.endpoint.split(/\/wpush\/v\d\//)[1]

    console.log('Subscription ID', subscriptionId)
    return fetch(`${db.baseUrl}/subscriptions`, {
      method: 'POST',
      body: JSON.stringify({
        subscriptionId: subscriptionId,
        subscription: subscription
      })
    })
  }
  deleteSubscriptionID (subscription) {
    var subscriptionId = subscription.endpoint.split('gcm/send/')[1]
    return fetch(`${db.baseUrl}/subscriptions/` + subscriptionId, {
      method: 'DELETE'
    })
  }

  handelInput (e) {
    console.log('clicked')
    if (this.state.checked) {
      console.log('unsubscribing')
      this.unsubscribePush()
    } else {
      console.log('subscribing')
      this.subscribePush()
    }
  }
  onSanckbarClose () {
    console.log('snackbar closed')
    this.setState({
      show: false,
      message: ''
    })
  }
  render () {
    return (
      <li>
        <label className='switch'>
          <input
            onClick={this.handelInput.bind(this)}
            type='checkbox'
            checked={this.state.checked}
          />
          <div className='slider round' />
        </label>
        <SnackBar
          onClose={this.onSanckbarClose.bind(this)}
          show={this.state.show}
          timer={4000}
        >
          <p>
            {this.state.message}
          </p>
        </SnackBar>
        <style jsx>
          {`
            .switch {
              position: relative;
              display: inline-block;
              width: 50px;
              height: 25px;
            }
            .switch input {
              display: none;
            }
            .switch .slider {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #ccc;
              -webkit-transition: all 0.4s;
              transition: all 0.4s;
              cursor: pointer;
            }
            .switch .slider.round {
              border-radius: 25px;
            }
            .switch .slider.round:before {
              border-radius: 25px;
            }
            .switch .slider:before {
              position: absolute;
              content: "🔕";
              font-size: 14px;
              line-height: 22px;
              width: 22px;
              height: 22px;
              left: 2px;
              bottom: 2px;
              background-color: white;
              -webkit-transition: all 0.4s;
              transition: all 0.4s;
            }
            input:checked + .slider {
              background: #ff6600;
            }
            input:checked + .slider:before {
              content: "🔔";
              text-align: center;
              -webkit-transform: translateX(24px);
              transform: translateX(24px);
            }
          `}
        </style>
      </li>
    )
  }
}
