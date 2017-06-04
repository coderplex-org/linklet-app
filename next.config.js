const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
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
          importScripts: ['/push-sw.qwddbhjbhnj.js'],
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
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: 'disabled',
        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
          generateStatsFile: true,
        // Will be available at `.next/stats.json`
          statsFilename: 'stats.json',
          logLevel: 'info'
        })
      )
    }
    return config
  }
}
