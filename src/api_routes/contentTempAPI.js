const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const templateObj = require('../models/template.js');
const filemodule = require('../controllers/files.js');
const filePath = require('path');
//const app = express();
//const mongoose =  require('mongoose');
//const dbUrl = "mongodb://localhost:27017/data";
//mongoose.Promise = global.Promise;

/*mongoose.connect( dbUrl, (err) =>{
	if(err){
		console.log("Error is +", err);
	} else{
		console.log('connected to mongoDB...');
} )

*/
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//router.get('/', (req, res)=>{ res.send('api work'); });

router.get('/allTemplate', function(req, res){
    console.log('Get request for all template');
    templateObj.find({})
    .exec(function(err, template){
        if (err){
            console.log("Error retrieving template");
        }else {
            res.json(template);
        }
    });
});

router.get('/allTemplate/:contentId', function(req, res, body){
    console.log('Get request for Single template');
    let param = req.params.contentId; 
	console.log("parm-->", param);
	if(param === "componentNotes"){
		param = 'component';
	}
	console.log("correct parm is-->", param);
	
	//templateObj.find(`contentId : "${}"`);
	//findAll({tag: id}).exec();
    /*templateObj.find({contentId: param}).exec(function(err, template){
        if (err){
            console.log("Error retrieving template");
        }else {
           //tempContentResponse.push(res.json(template));
           //filemodule(res.json(template));
		   //res.json(template);
		   //console.log("resp- ", tempContentResponse);
		   /*template.forEach( elm =>{
			   console.log('checking the response--> ',  elm.content);
		   })*
         var transactions=[];
         var connectId  = template.map(function(element) { return element.contentId; });
		
			res.send(template);
        }
   });*/
   templateObj.find({},function(err,data){
    if(err){
        res.send(err.message);
    }
    else{
        //var transactions=[];
        //var contentIdStore = data.map(function(element) { return element.content; });
        //template.find({ _id: { $in: bookIds }}, function(err, books) {
        templateObj.find({contentId: param}, function(err, templateContent) {
          // Do whatever with content and send back the response, with res.. blah!
		//console.log("tmplet -- ", templateContent);  
        if(templateContent[0]){
			var contStr = `{ "id":"${templateContent[0].contentTitle}", "contents":"${templateContent[0].content}" }`;
			var fileName = templateContent[0].contentTitle;
			var resp = filemodule(contStr, fileName);
			let fname = filePath.join(__dirname, `./../../JSONFileStore/${param}.json`);
			res.header("Content-Type",'application/json');
			//res.json(templateContent);
			res.sendFile(fname);	
		} else{
			res.send(err);	
		}
		
      });       
    }
   });
});


router.post('/addTemplate' , function(req, res){
 const tempObj = new templateObj();
	tempObj.contentId = req.body.contentId;
	tempObj.contentTitle = req.body.contentTitle;
	tempObj.content = req.body.content;
	tempObj.contentNote = req.body.contentNote;
	tempObj.contentParam = req.body.contentParam;
	
	console.log("temp object-", tempObj );
	
	tempObj.save( function(err, tempObj){
		if(err){
			console.log(err);
		} else{
			res.json(tempObj);
		}
	});
});

router.delete('/:_id', function (req, res) {
	let param = req.params._id; 
	console.log("parm-->", param)
    templateObj.findByIdAndRemove(req.params._id, function (err, template) {
        if (err) { console.log(err); return res.status(500).send("There was a problem deleting the template.");}
        res.status(200).send("Template "+ template._id +" was deleted.");
    });
});


/*
// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});
*/


router.put('/:_id', function (req, res) {
    console.log("content id is-->",req.params._id)
    templateObj.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, temp) {
        if (err) return res.status(500).send("There was a problem updating the template.");
        res.status(200).send(temp);
    });
});

module.exports = router;

/*
*https: //www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
*https://zellwk.com/blog/crud-express-mongodb/
*https://stackabuse.com/get-query-strings-and-parameters-in-express-js/
*https://www.smashingmagazine.com/2019/02/node-api-http-es6-javascript/ - good document 
*https://stackoverflow.com/questions/35192122/how-do-i-store-a-mongodb-query-result-in-a-variable
https://medium.com/dailyjs/how-to-prevent-your-node-js-process-from-crashing-5d40247b8ab2
Standards-
https://medium.com/@chrissoemma/writing-standard-restful-api-nodejs-practical-example-75df09090a21

***************************** the combination of below tow links makes a best proj structure.
https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09 -- approach is good oand well explained for losely coupled code 
https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/ - i found this is bit good but need to read properly.
***************************



some standard projects links-

https://docs.github.com/en/rest
https://www.twilio.com/docs/usage/api
https://stripe.com/docs/api
https://developers.digitalocean.com/documentation/v2/#introduction 


https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes 
-- here at the end of link you can fix the requird thing for multiline routes to add in app.js file 

*/