const express = require('express');

const app = express();

app.get('/',(req,res) => {
	res.status(200)
	    .json({message: 'Hello from server',
	    	app: 'API' });
});

app.post('/', (req,res) => {
	res.send('Sending Post from server');
})

const port = 3000;
app.listen(port, ()=>{
	console.log(`App is up and runnign on port ${port}`);
});

