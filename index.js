const fs = require('fs');


//Blocking , Synchronous Way to Read and Write File

// const textIn = fs.readFileSync('./README.md', 'utf-8');
// console.log(textIn);
// const textOut = `${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync('./README.md', textOut);

//Non-Blocking, Asynchronous way

fs.readFile('./README.md', 'utf-8', (err, data) =>{
	console.log(data);
});