if ('function' === typeof importScripts) {
  importScripts('/workbox/workbox-sw.js')
  /* global workbox */
  if (workbox) {
    workbox.setConfig({
      debug: true
    })

    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

    workbox.clientsClaim()
    workbox.skipWaiting()

    workbox.core.setCacheNameDetails({
      prefix: 'persian',
      suffix: 'v1',
      precache: 'install-time',
      runtime: 'run-time'
    })

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([])

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
    })

    workbox.routing.registerRoute(
      /.*\/api\/words\/.*/,
      workbox.strategies.cacheFirst({
        cacheName: '/api/words/',
        plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
          })
        ]
      })
    )
  } else {
    console.log('Workbox could not be loaded. No Offline support')
  }
}
