const express = require('express')
const path = require('path')
const next = require('next')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser())

    // Handling login
    server.use((req, res, next) => {
      if (!req.query.loginToken) return next()
      console.log(req.query)
      res.cookie('loginToken', req.query.loginToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: false
      })
      if (req.query.next) {
        return res.redirect(req.query.next)
      }
      return res.redirect('/')
    })

    // Handling logout
    server.use((req, res, next) => {
      if (!req.query.logout) return next()

      res.cookie('loginToken', null, {
        expires: new Date(Date.now() - 1000),
        httpOnly: false
      })

      return res.redirect(req._parsedUrl.pathname)
    })
    // serve service worker
    server.get('/sw.js', (req, res) => res.sendFile(path.resolve('./.next/sw.js')))
    server.get('/push-sw.rygiuiuknkjnku.js', (req, res) => res.sendFile(path.resolve('./push-sw.rygiuiuknkjnku.js')))

    server.get('*', (req, res) => handle(req, res))

    server.listen(3000, err => {
      if (err) throw err

      console.log('> App running on port 3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
