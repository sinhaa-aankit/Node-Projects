const app = require(__dirname + '/app');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

// const DB = process.env.DATABASE.replace(
// 	'<PASSWORD>',
// 	process.env.DATABASE_PASSWORD
// );

//Connection DB LOCAL
mongoose.connect(process.env.DATABASE_LOCAL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => console.log('DB Connected'))



//Listening to port ( starting Server );
const port = 3000;
app.listen(port, ()=>{
	console.log(`App is up and runnign on port ${port}`);
});