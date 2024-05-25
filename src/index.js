const http = require("http");
const path = require("path");
const fs = require("fs");
const port = 8000;

const db = require("./db.js")

const MINE_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset-UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  jpeg: "image/jpeg"
}

const prepareFile = async (url) => {
    // const filePath = path.resolve(__dirname, "../public/index.html")
    const filePath = path.join(process.cwd(), url.endsWith("/") ? url + "index.html" : url)
    const stream = fs.createReadStream(filePath)
    const ext = path.extname(filePath).substring(1).toLowerCase()

    return { stream, ext }
}

const server = http.createServer(async (req, res) => {
  const file = await prepareFile(req.url)
  const mimeType = MINE_TYPES[file.ext] || MINE_TYPES.default

  console.log(req.url)
  res.writeHead(200, { "Content-type": mimeType })
  file.stream.pipe(res)
});

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user connected')
  console.log(`${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  });

  // socket.on('message', (message) => {
  //   console.log('user says; ', message)
  //   io.emit('message', message)
  // });
});

// db.query("CREATE DATABASE game-of-chance;")

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
