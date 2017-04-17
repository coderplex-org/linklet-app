import React from 'react'
import axios from 'axios'
import SnackBar from 'react-material-snackbar'
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
      this.setState({
        show: true,
        message: 'User has blocked push notification.'
      })
      return
    }

    // Check `push notification` is supported or not
    if (!('PushManager' in window)) {
      this.setState({
        show: true,
        message: "Sorry, Push notification isn't supported in your browser."
      })
      return
    }
    // Get `push notification` subscription
    // If `serviceWorker` is registered and ready
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
  subscribePush () {
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
  }
  unsubscribePush () {
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
  }
  saveSubscriptionID (subscription) {
    var subscriptionId = subscription.endpoint.split('gcm/send/')[1] ||
      subscription.endpoint.split(/\/wpush\/v\d\//)[1]

    console.log('Subscription ID', subscriptionId)

    return axios.post(`${db.baseUrl}/subscriptions`, {
      subscriptionId: subscriptionId,
      subscription: subscription
    })
  }
  deleteSubscriptionID (subscription) {
    var subscriptionId = subscription.endpoint.split('gcm/send/')[1]
    return axios.delete(`${db.baseUrl}/subscriptions/` + subscriptionId)
  }

  handelInput (e) {
    if (this.state.checked) {
      this.unsubscribePush()
    } else {
      this.subscribePush()
    }
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
        <SnackBar show={this.state.show} timer={4000}>
          <p>{this.state.message}</p>
        </SnackBar>
        <style jsx>
          {
            `
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
        `
          }
        </style>
      </li>
    )
  }
}
