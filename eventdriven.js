// Redirect Request
const http = require('http');//core module
const fs = require('fs');//core module
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;//add this line to get the request method
  if (url === '/') {

    //res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Enter the name</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><input type="submit" value="send"></form></body>')

    res.write('</html>')
    return res.end();

  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk)
      console.log(chunk);
    })

    req.on('end', () => {
      console.log('Starting Point');
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);

      const message = parsedBody.split('=');
      fs.writeFileSync('cse1.txt', message[1]);
    }
    )

    fs.writeFileSync('cse1.txt', 'HAPPY');
    console.log('Ending point');
    res.setHeader('Location', '/');
    res.statusCode = 302;
    return res.end();


  }
  res.setHeader('content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Gaurav</title></head>');
  res.write('<body><h2>welcome</h2></body>')
  res.write('</html>')
  res.end();
});

server.listen(8600);