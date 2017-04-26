/* global self, clients */
// triggered everytime, when a push notification is received.
console.log('Reached Here v6')

let url

self.addEventListener('push', function (event) {
  console.info('Event: Push')
  console.log(event.data && event.data.json())
  const playload = (event.data && event.data.json()) || {}
  var title = playload.title || 'No Title'

  var body = {
    'body': playload.body || 'No Body',
    'icon': playload.icon || 'https://linklet.ml/static/favicons/favicon-32x32.png'
  }
  url = playload.body

  event.waitUntil(
    self.registration.showNotification(title, body)
  )
})

self.addEventListener('notificationclick', function (event) {
  console.log(event.notification)
  event.notification.close() // Close the notification
  event.waitUntil(
    clients.openWindow(url || '/')
  )
})
