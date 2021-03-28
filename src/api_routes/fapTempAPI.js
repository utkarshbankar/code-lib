const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const fapTempObj = require('../models/fapTemplate.js');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//router.get('/', (req, res)=>{ res.send('api work'); });

router.get('/fap', function(req, res){
    //console.log('Get request for all template');
    fapTempObj.find({})
    .exec(function(err, template){
        if (err){
            console.log("Error retrieving template");
        }else {
            res.json(template);
        }
    });
});

/*

Here you need to add data in tree structure so study for this and then witr the api for same.

Subject--
		|
		|-->Topic
				|
				|-->List --> add list que here 
				|-->Data --> add data que here 	
and for both accessing the vales use the structure 
e.g --> python(Subject) -> topic(List)--> acceess the list all question and then if selected perticular question then open that one. 
*/

router.get('/fap/:fapId', function(req, res, body){
    console.log('Get request for Single template');
    let param = req.params.contentId; 
	console.log("parm-->", param);
	if(param === "componentNotes"){
		param = 'component';
	}
	console.log("correct parm is-->", param);
	
	//fapTempObj.find(`contentId : "${}"`);
	//findAll({tag: id}).exec();
    /*fapTempObj.find({contentId: param}).exec(function(err, template){
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
   fapTempObj.find({},function(err,data){
    if(err){
        res.send(err.message);
    }
    else{
        //var transactions=[];
        //var contentIdStore = data.map(function(element) { return element.content; });
        //template.find({ _id: { $in: bookIds }}, function(err, books) {
        fapTempObj.find({contentId: param}, function(err, templateContent) {
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
	const tempObj = new fapTempObj();
	tempObj.contentId = req.body.contentId;
	tempObj.contentTitle = req.body.contentTitle;
	tempObj.content = req.body.content;
	tempObj.contentNote = req.body.contentNote;
	tempObj.contentParam = req.body.contentParam;
	
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
    fapTempObj.findByIdAndRemove(req.params._id, function (err, template) {
        if (err) { console.log(err); return res.status(500).send("There was a problem deleting the template.");}
        res.status(200).send("Template "+ template._id +" was deleted.");
    });
});

router.put('/:_id', function (req, res) {
    console.log("content id is-->",req.params._id)
    fapTempObj.findByIdAndUpdate(req.params._id, req.body, {new: true}, function (err, temp) {
        if (err) return res.status(500).send("There was a problem updating the template.");
        res.status(200).send(temp);
    });
});

module.exports = router;

/*

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes 
-- here at the end of link you can fix the requird thing for multiline routes to add in app.js file 

*/