// const { createServer } = require('http')
// const { parse } = require('url')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const hostname = 'citramas-foundation.com'
// const port = process.env.port || 3000

// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port })
// const handle = app.getRequestHandler()

// app.prepare().then(() => {
//   createServer(async (req, res) => {
//     try {
//       const parsedUrl = parse(req.url, true)
//       const { pathname, query } = parsedUrl

//       // Check if the request starts with '/api'
//       if (pathname.startsWith('/api')) {
//         // Remove '/api' from the pathname
//         const apiRoute = pathname.substring(4)

//         console.log('API Route:', apiRoute);

//         // Handle API routes using Next.js API routes functionality
//         await app.render(req, res, apiRoute, query)
//       } else {
//         // Handle other routes using the default request handler
//         await handle(req, res, parsedUrl)
//       }
//     } catch (err) {
//       console.error('Error occurred handling', req.url, err)
//       res.statusCode = 500
//       res.end('internal server error')
//     }
//   })
//     .once('error', (err) => {
//       console.error(err)
//       process.exit(1)
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`)
//     })
// })

const {
  createServer
} = require("http");
const {
  parse
} = require("url");
const next = require("next");

const port = process.env.PORT || 3000;

// Create the Express-Next App
const app = next({
  dev:false
});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const {
        pathname,
        query
      } = parsedUrl;
      handle(req, res, parsedUrl);
      console.log("pathname", pathname);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });