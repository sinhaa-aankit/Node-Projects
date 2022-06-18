const app = require(__dirname + '/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

//Connection DB
mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => console.log('DB Connected'))


//Schema
const tourSchema = new mongoose.Schema({
	name: {
		type:String,
		required: [true, 'A tour must have a name'],
		unique: true
	},
	rating: {
		type: Number,
		default:4.5
	},
	price: {
		type: Number,
		required: [true, 'A price must have a price']
	}
});


const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
	name: 'The Trees Hiker',
	rating:4.7,
	price: 497
});

testTour.save().then(doc => {
	console.log(doc);
}).catch(err => {
	console.log('Error ', err);
})

//Listening to port ( starting Server );
const port = 3000;
app.listen(port, ()=>{
	console.log(`App is up and runnign on port ${port}`);
});