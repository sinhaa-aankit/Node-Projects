const http = require('http');

const server = http.createServer((req, res) => {
	console.log(req);
	res.end("Hello from the server");
});

server.listen(3000, 'localhost', ()=> {
	console.log('Listening to port 3000');
});