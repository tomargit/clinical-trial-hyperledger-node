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




 
console.log("Deployed");

var methods = {};
const Web3 = require('web3');
var _ =require('lodash');
var processContentJS = require('./processContent.js');
var encodeDecoder = require('./encodedecode.js');
var finalresult;
var result;
var async = require('async');


/* Connect to ethereum node */ 
const etherUrl = "http://localhost:8545";

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(etherUrl));
const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "name", 
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "patientId",
				"type": "string"
			}
		],
		"name": "viewCustomer",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "trialId",
				"type": "string"
			},
			{
				"name": "visitId",
				"type": "string"
			},
			{
				"name": "croId",
				"type": "string"
			},
			{
				"name": "siteInvestigatorId",
				"type": "string" 
			},
			{
				"name": "patientId",
				"type": "string"
			},
			{
				"name": "dataHash",
				"type": "string"
			} 
		],
		"name": "addCustomer",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			} 
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function" 
	}
];

var contractInstance = new web3.eth.Contract(abi,'0x5e3c0769c801b2af1a9c7d62049f34364130c11d');

var reply = "false";


app.post('/api/blockchain/', function(req, res) {
	/*var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;*/
	console.log("POST API CALL");
	
	//console.log(typeof req.body);
	//console.log(req.body);
	
	//console.log(JSON.stringify(processContentJS.data.processContent(req.body)));
	var processData = processContentJS.data.processContent(req.body);
	for (var key in processData) {
		var encodeDataHash= encodeDecoder.data.encodeContent(JSON.stringify(processData[key]['data_hash']));
		
		nodescript.data.addPatientDetails(processData[key]['Trail_ID'],processData[key]['Visit_ID'],processData[key]['Visit_ID'],processData[key]['Site_Investigator_ID'],processData[key]['Patient_ID'],encodeDataHash);
		
		console.log("")
		console.log("Encoded String : " +  encodeDataHash)
		console.log("")
		console.log("Decoded String : ");
		

	}
	res.send(processData);
	  
});  

app.post('/api/generateReport', function(req, res) {
	
	console.log("POST API CALL");
	var reqContent = req.body;
	var processData = processContentJS.data.processContent(reqContent);
	console.log("Proocess Data is"+JSON.stringify(processData[0]['data_hash']));
	console.log("data fron UI is"+JSON.stringify(req.body)); 
	//console.log("key is"+processData[0]['Patient_ID']);
	


/*var result=nodescript.data.viewPatientDetails(processData[0]['data_hash'],processData[0]['Patient_ID']);
	console.log("result from service is "+nodescript.finalresult);
	res.send();
	  
	*/
var processData = processData[0]['data_hash'];

var patientId = reqContent[0]['Patient_ID'];

//methods.viewPatientDetails=function viewPatientDetails(processData,patientId){
	
	/*var finalresult;
	console.log("gng to get Patient Details for patient with id="+patientId);
		var reply1=contractInstance.methods.viewCustomer(patientId).call().then(function (result) {
        finalresult=result;
		console.log("Final result is"+finalresult);
		var decodedJSON=encodeDecoder.data.decodeContent(finalresult)
	console.log("Parsed Data is"+decodedJSON);
	 result=encodeDecoder.data.getJsonDiff(processData,decodedJSON);
	 finalresult=result;
	console.log("result comaprison is "+finalresult); 
});  
	
		
		return finalresult; 
		*/
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
        //console.log('1asynResult ------- ' + asynResult);
		console.log('caption-----------'+caption);
        //asynResult = caption;
		//console.log('2asynResult ------- ' + asynResult);
		// Node.js and JavaScript Rock!
		res.send(caption);
    }
	
);
	
//}	
	 

	  
	  
	  
	  
});




app.get('/api/view/blockchain', function(req, res) {
	var dataString ='[{"Visit_ID": "VI_PA_TA1_1_1","Patient_ID": "PA_TA1_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_1_2","Patient_ID": "PA_TA1_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43132.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_2_1","Patient_ID": "PA_TA1_2","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_2_2","Patient_ID": "PA_TA1_2","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43132.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA2_1_1","Patient_ID": "PA_TA2_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA2","Visit_Date": "43115.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA2_1_2","Patient_ID": "PA_TA2_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA2","Visit_Date": "43146.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA2_2_1","Patient_ID": "PA_TA2_2","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA2","Visit_Date": "43120.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TB1_1_1","Patient_ID": "PA_TB1_1","Site_Investigator_ID": "SI_TB1","Trail_ID": "TB1","Visit_Date": "43120.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TB1_1_2","Patient_ID": "PA_TB1_1","Site_Investigator_ID": "SI_TB1","Trail_ID": "TB1","Visit_Date": "43151.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TB1_2_1","Patient_ID": "PA_TB1_2","Site_Investigator_ID": "SI_TB1","Trail_ID": "TB1","Visit_Date": "43125.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"}]';
	console.log("GET API CALL");
	res.render('./pages/blockchain', {
       trialDataList: JSON.parse(dataString)
    });
	//var displayContent
	//res.send(another.data.concat(user_id, token, geo));
});


/*app.get('/api/blockchain/', function(req, res) {
	var user_id = req.param('id');
	var token = req.param('token');
	var geo = req.param('geo');  

	console.log("GET API CALL");
	
	res.send(another.data.concat(user_id, token, geo));
});*/

/*app.post('/api/blockchain/', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
	console.log("POST API CALL");

    res.send(user_id + ' ' + token + ' ' + geo);
});*/