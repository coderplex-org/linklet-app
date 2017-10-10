const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const { ANALYZE } = process.env

module.exports = {
  webpack: (config, { dev }) => {
    /* Enable only in Production */
    console.log(dev)
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
          importScripts: ['/push-sw.js'],
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
      if (ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: 8888,
            openAnalyzer: true
          })
        )
      }
    }
    return config
  }
}
