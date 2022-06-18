const app = require(__dirname + '/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(con => {
	console.log(con.connections);
	console.log('DB Connected');
})






//Listening to port ( starting Server );
const port = 3000;
app.listen(port, ()=>{
	console.log(`App is up and runnign on port ${port}`);
});