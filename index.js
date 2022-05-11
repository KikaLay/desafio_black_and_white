
const http = require('http')
const fs = require('fs')
const Jimp = require('jimp')
const url = require('url')
http
  .createServer((req, res) => {
   
    if (req.url == '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      fs.readFile('index.html', 'utf8', (err, html) => {
        res.end(html)
      })
    }

    if (req.url == '/style') {
      res.writeHead(200, { 'Content-Type': 'text/css' })
      fs.readFile('style.css', (err, css) => {
        res.end(css)
      })
    }

     // Inicio Jimp
     if (req.url.includes('/procesar_img')) {
      const params = url.parse(req.url, true).query
      const url_imagen = params.url_imagen
      console.log(url_imagen)
      Jimp.read(url_imagen, (err, imagen) => {
        imagen
          .resize(350, Jimp.AUTO)
          .greyscale()
          .quality(60)
          .writeAsync('img.jpg')
          .then(() => {
            fs.readFile('img.jpg', (err, Imagen) => {
              res.writeHead(200, { 'Content-Type': 'image/jpeg' })
              res.end(Imagen)
            })
          })
      })
    }
    // Fin Jimp
    
  })
  .listen(3000, () => console.log('Servidor encendido'))
