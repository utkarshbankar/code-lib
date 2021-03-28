const mongoose = require("mongoose");

const schemaObj = mongoose.Schema;

const fapTemplateSchema = new schemaObj({
	fapTempId:String,
	fapTempSubject:String,
	fapTempTopic:String,
	fapTempQuestion:String,
	fapTempCode: String,
	fapTempDesc: String
});

module.exports = mongoose.model("fapTemplate", fapTemplateSchema);

