const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    scope: '/',
    disable: true,
  },
  productionBrowserSourceMaps: true,
});
