const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if(pathName === '/'){
		res.end("Hello from the server");
	}else if(pathName === '/api'){
		fs.readFile('./data.json', 'utf-8', (err,data) => {
			const productData = JSON.parse(data);
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(data); 
		});
	}else{
		res.end("Error 404, Page not found.");
	}
});

server.listen(3000, 'localhost', ()=> {
	console.log('Listening to port 3000');
});