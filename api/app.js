const express = require('express');

const app = express();

app.get('/',(req,res) => {
	res.status(200).send('Hello from server');
})



const port = 3000;
app.listen(port, ()=>{
	console.log(`App is up and runnign on port ${port}`);
});

