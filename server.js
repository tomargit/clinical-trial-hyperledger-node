var express = require('express');
var another = require('./index.js');
var nodescript = require('./nodescript.js');
var async = require('async');

var processContentJS = require('./processContent.js');
var encodeDecoder = require('./encodedecode.js');
var app = express();
app.set('view engine', 'ejs');
var port = process.env.PORT || 2000;
app.listen(port);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log("Deployed on port------------>" + port);

var methods = {};
var _ =require('lodash');
var processContentJS = require('./processContent.js');
var encodeDecoder = require('./encodedecode.js');
var finalresult;
var result;
var async = require('async');

var reply = "false";


app.get('/api/blockchain/save', function(req, res) {
	
	
res.send(true);
});


/*
app.post('/api/blockchain/', function(req, res) {
	console.log("POST API CALL");
	
	//console.log(typeof req.body);

	var processData = processContentJS.data.processContent(req.body);
	console.log("request Body is"+JSON.stringify(req.body));
	for (var key in processData) {
		var encodeDataHash= encodeDecoder.data.encodeContent(JSON.stringify(processData[key]['data_hash']));
		
		nodescript.data.addPatientDetails(processData[key]['Trail_ID'],processData[key]['Visit_ID'],processData[key]['Visit_ID'],processData[key]['Site_Investigator_ID'],processData[key]['Patient_ID'],encodeDataHash);
		
		console.log("")
		console.log("Encoded String : " +  encodeDataHash)
		console.log("")
	}
	res.send(processData);
	  
});  

app.post('/api/generateReport', function(req, res) {
	
	console.log("POST API CALL");
	var reqContent = req.body;
	var processData = processContentJS.data.processContent(reqContent);
	console.log("Proocess Data is"+JSON.stringify(processData[0]['data_hash']));
	console.log("data fron UI is"+JSON.stringify(req.body)); 
	
var processData = processData[0]['data_hash'];

var patientId = reqContent[0]['Patient_ID'];

		asynResult = '';
		async.waterfall(
    [
        function(callback) {
			contractInstance.methods.viewCustomer(patientId).call().then(function (result){
				callback(null,result,result);
			});
            
        },
        function(arg1, arg2, callback) {
           // var caption = arg1 +' and '+ arg2;
			console.log("Caption is"+arg1);
			var caption=encodeDecoder.data.decodeContent(processData,arg1)
            callback(null, caption);
        }, 
        function(caption, callback) {
            //caption += ' Rock!';
			console.log(" decoded data is"+caption);
            callback(null, caption);
        }
    ],
    function (err, caption) {
		console.log('Comparison is **********  '+caption);
		if(caption.length>0){
			res.send("true");
		}else{
			res.send("false");
		}
		
    }
	
);
	  
});

app.get('/api/view/blockchain', function(req, res) {
	var dataString ='[{"Visit_ID": "VI_PA_TA1_1_1","Patient_ID": "PA_TA1_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_1_2","Patient_ID": "PA_TA1_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43132.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_2_1","Patient_ID": "PA_TA1_2","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_2_2","Patient_ID": "PA_TA1_2","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43132.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA2_1_1","Patient_ID": "PA_TA2_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA2","Visit_Date": "43115.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA2_1_2","Patient_ID": "PA_TA2_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA2","Visit_Date": "43146.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA2_2_1","Patient_ID": "PA_TA2_2","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA2","Visit_Date": "43120.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TB1_1_1","Patient_ID": "PA_TB1_1","Site_Investigator_ID": "SI_TB1","Trail_ID": "TB1","Visit_Date": "43120.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TB1_1_2","Patient_ID": "PA_TB1_1","Site_Investigator_ID": "SI_TB1","Trail_ID": "TB1","Visit_Date": "43151.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TB1_2_1","Patient_ID": "PA_TB1_2","Site_Investigator_ID": "SI_TB1","Trail_ID": "TB1","Visit_Date": "43125.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"}]';
	console.log("GET API CALL");
	res.render('./pages/blockchain', {
       trialDataList: JSON.parse(dataString)
    });
});
*/

