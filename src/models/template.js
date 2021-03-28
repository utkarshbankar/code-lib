const mongoose = require("mongoose");

const schemaObj = mongoose.Schema;

const templateSchemaTest = new schemaObj({
	contentId:String,
	contentTitle:String,
	content: String,
	contentNote: String,
	contentParam:String
});

module.exports = mongoose.model("contentTemplate", templateSchemaTest);

