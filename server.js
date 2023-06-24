const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Enable CORS middleware
  server.use(cors());

  server.use(
    '/api',
    createProxyMiddleware({
      target: 'https://writemeanemail.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  );

  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('Server is running on port 3001');
  });
});