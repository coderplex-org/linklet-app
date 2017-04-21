const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  webpack: (config, { dev }) => {
    /* Enable only in Production */
    if (!dev) {
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'sw.js',
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          staticFileGlobs: [
            'static/**/*' // Precache all static files by default
          ],
          importScripts: ['/push-sw.xyjhbdhbedj.js'],
          forceDelete: true,
          runtimeCaching: [
            {
              handler: 'fastest',
              urlPattern: /[.](png|jpg|svg)/
            },
            {
              handler: 'cacheFirst',
              urlPattern: /\/_next\/.*/,
              options: {
                cache: {
                  name: 'nextjs-cache'
                }
              }
            },
            {
              handler: 'networkFirst',
              urlPattern: /^http.*/ // cache all files
            }
          ]
        })
      )
    }
    return config
  }
}
