const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/infernogymapi.integrador.xyz/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/infernogymapi.integrador.xyz/fullchain.pem')
};

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

https.createServer(options, app).listen(3000, () => {
  console.log('Servidor HTTPS corriendo en el puerto 3000');
});
