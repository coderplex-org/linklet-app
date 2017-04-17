/* global self, clients */
// triggered everytime, when a push notification is received.
console.log('Reached Here')

let url

self.addEventListener('push', function (event) {
  console.info('Event: Push')
  console.log(event.data.json())
  const playload = event.data.json()
  var title = playload.title || 'No Title'

  var body = {
    'body': playload.body || 'No Body',
    'tag': 'linklet',
    'icon': playload.icon || 'https://linklet.ml/static/favicons/favicon-32x32.png'
  }
  url = playload.body
  event.waitUntil(
    self.registration.showNotification(title, body)
  )
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close() // Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url || '/')
  )
})
