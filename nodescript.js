var methods = {};
var _ =require('lodash');
var processContentJS = require('./processContent.js');
var encodeDecoder = require('./encodedecode.js');
var finalresult;
var result;
var async = require('async');

function _function1 (req) {
	 console.log("1 method");
    return function (callback) {
        var something = 1;
        callback (null, something);
   }
}

function _function2 (something, callback) {
    return function (callback) {
       var somethingelse = function () { 
	   console.log('2 method');
       callback (err, somethingelse);
    }
}
}

function _function3 (something, callback) {
    return function (callback) {
      var somethingmore = function () { // do something here };
	  console.log('3 method');
      callback (err, somethingmore);
    }
}
}  

methods.viewPatientDetails=function viewPatientDetails(processData,patientId){
	
		asynResult = '';
		async.waterfall(
    [
        function(callback) {
			contractInstance.methods.viewCustomer(patientId).call().then(function (result){
				callback(null,result,result);
			});
            
        },
        function(arg1, arg2, callback) {
			console.log("Caption is"+arg1);
			var caption=encodeDecoder.data.decodeContent(processData,arg1)
            callback(null, caption);
        }, 
        function(caption, callback) {
			console.log(" decoded data is"+caption);
            callback(null, caption);
        }
    ],
    function (err, caption) {
        console.log('1asynResult ------- ' + asynResult);
		console.log(caption);
        asynResult = caption;
		console.log('2asynResult ------- ' + asynResult);
    }
	
);

}
	 
methods.addPatientDetails = function addPatientDetails(trialId,visitId,croId,siteInvestigatorId,patientId,dataHash){
	    console.log("Gng to store Patinet Trial details");
		console.log(JSON.stringify(dataHash));
		var reply2=contractInstance.methods.addCustomer(trialId,visitId,croId,siteInvestigatorId,patientId,JSON.stringify(dataHash)).send({from: "0x31cdfc58bb551218261fe505c219e00d83474d61",gas: 4500000}).then(console.log);
}
 
exports.data = methods;
exports.result = result;
module.exports.finalresult = finalresult;
	
function checkWork() { 
		
}