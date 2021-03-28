const filePkg = require("fs");
const filePath = require('path');

/*
* working with file system
*/

function CreateJSONFile( filecontent, jsonFileName ){
	
/*	jsonFileName = 'file1';
	
	let directory_name = `/fileStore/${jsonFileName}.json`;

    let filenamesArr = filePkg.readdirSync(filePath.join(__dirname, `fileStore`)); 
	
	filenamesArr.forEach((file, index) => { 
      console.log("File:", file); 
    }); 
	//----------------------------------another way ---------------------------------------------
	let path = filePath.join(__dirname, `fileStore`);
	let fileExsistOrNot = false;
	filePkg.access( path.toString() , filePkg.constants.F_OK, (err) => {
		if (err) {
           console.error(err);
           return;
        } else{
			fileExsistOrNot = true;
			console.log('file exsist');
		}
    }); */
	let fileNameToCheckInDir = filePath.join(__dirname, `./../JSONFileStore/${jsonFileName}.json`);
	let fileExists = filePkg.existsSync(fileNameToCheckInDir); 
	console.log('fileExists -->', fileExists);
	if(fileExists){
		console.log('file exsist you can not overrite');
		return 'file exsist you can not overrite';
	} else{
	// stringify JSON Object
	var jsonContent = JSON.parse(JSON.stringify(filecontent));
	if(jsonFileName && jsonFileName != ''){
		var fileName = jsonFileName;
	} else{
		var fileName = 'demo';
	}
	
	filePkg.writeFile( filePath.join(__dirname, `./../JSONFileStore/${fileName}.json`), jsonContent, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}
	});
	return 'JSON file has been saved.';
  }
	
}
	
module.exports = CreateJSONFile; 


/*
*Task- 1. creating JSON file in the specific location with the id of the template. 
*Task -2. while storing the file check the file is allready in the directoiry or not if file is there then ask you wnat to edit or not then only overide or just change the name of the file this responce is shown in angular UI.
*
****
*https://attacomsian.com/blog/how-to-check-if-a-file-exists-in-nodejs
*/