const user = require('./user');

const proxy = {
  _proxy: {
    proxy: {
      // '/xhr/(.*)': 'http://127.0.0.1:3721/',
      '/api/(.*)': 'http://localhost:9999',
    },
    pathRewrite: {
      // '^/xhr/': '',
      '^/api/': '',
    },
    changeHost: true,
    httpProxy: {
      options: {
        ignorePath: false,
      },
      listeners: {
        proxyReq(proxyReq, req, res, options) {
          // console.log('proxyReq');
        },
        error(err, req, res) {
          res.writeHead(500, {
            'Content-Type': 'text/plain'
          });

          res.end(`mocker-api Error: ${err}`);
        }
      },
    },
  },
  ...user,
}
module.exports = proxy;
