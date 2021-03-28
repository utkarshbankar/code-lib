const mongoose = require('mongoose');
const dbUrl = "mongodb://localhost:27017/data";
mongoose.Promise = global.Promise;
mongoose.connect( dbUrl, (err) =>{
	if(err){
		console.log("Error is +", err);
	} else{
		console.log('connected to mongoDB...');
	}
})