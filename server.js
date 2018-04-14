var express = require('express');
var another = require('./index.js');
var nodescript = require('./nodescript.js');
//var blockchain = require('./blockchain.js');
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

//sample data
/*
 [{"Visit_ID": "VI_PA_TA1_1_1","Patient_ID": "PA_TA1_V_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_1_2","Patient_ID": "PA_TA1_V_2","Site_Investigator_ID": "SI_TA1_TA3","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.042361111111111106","Visit_Time_Out": "0.08541666666666665","Urobilinogen": "uu","Bilirubin": "bb","Ketone": "kk","Blood": "bb","Protien": "pp","Nitrile": "nn","Leukocytes": "ll","SpecificGravity": "ss","PH": "pp","Microalbumin": "mm"}] 
*/
/* blockchain variable  */
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const IdCard = require('composer-common').IdCard;
const MemoryCardStore = require('composer-common').MemoryCardStore;
const path = require('path');
let cardName;
let adminConnection;
let businessNetworkConnection  = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');
let adminBusinessNetworkConnection;
let participantRegistryUser;
let assetRegistry;
let factory;
let events;
let businessNetworkName;
let businessNetworkDefinition;
const cardStore = new MemoryCardStore();
let adminBusinessNetworkName;
const namespace = 'com.incedoinc.clinical_trial';
const connectionProfile = {"name":"hlfv1","type":"hlfv1","orderers":[{"url":"grpc://localhost:7050"}],"ca":{"url":"http://localhost:7054","name":"ca.org1.example.com"},"peers":[{"requestURL":"grpc://localhost:7051","eventURL":"grpc://localhost:7053"}],"channel":"composerchannel","mspID":"Org1MSP","timeout":300};
adminConnection = new AdminConnection({ cardStore: cardStore });


app.get('/api/blockchain/save', async (req, res, next) => {
	
	adminBusinessNetworkConnection = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');
	
	//const data = [{"Visit_ID": "VI_PA_TA1_1_1","Patient_ID": "PA_TA1_V_1","Site_Investigator_ID": "SI_TA1_TA2","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},{"Visit_ID": "VI_PA_TA1_1_2","Patient_ID": "PA_TA1_V_2","Site_Investigator_ID": "SI_TA1_TA3","Trail_ID": "TA1","Visit_Date": "43101.0","Visit_Time_In": "0.042361111111111106","Visit_Time_Out": "0.08541666666666665","Urobilinogen": "uu","Bilirubin": "bb","Ketone": "kk","Blood": "bb","Protien": "pp","Nitrile": "nn","Leukocytes": "ll","SpecificGravity": "ss","PH": "pp","Microalbumin": "mm"}];
	
	const data = [{"Visit_ID": "VI_PA_TA1_1_11","Patient_ID": "PA_TA1_V_11","Site_Investigator_ID": "SI_TA1_TA11","Trail_ID": "TA11","Visit_Date": "43101.0","Visit_Time_In": "0.5083333333333333","Visit_Time_Out": "0.5208333333333334","Urobilinogen": "u","Bilirubin": "b","Ketone": "k","Blood": "b","Protien": "p","Nitrile": "n","Leukocytes": "l","SpecificGravity": "s","PH": "p","Microalbumin": "m"},
	{"Visit_ID": "VI_PA_TA1_1_12","Patient_ID": "PA_TA1_V_12","Site_Investigator_ID": "SI_TA1_TA12","Trail_ID": "TA12","Visit_Date": "43101.0","Visit_Time_In": "0.042361111111111106","Visit_Time_Out": "0.08541666666666665","Urobilinogen": "uu","Bilirubin": "bb","Ketone": "kk","Blood": "bb","Protien": "pp","Nitrile": "nn","Leukocytes": "ll","SpecificGravity": "ss","PH": "pp","Microalbumin": "mm"}];
	  
	  adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
	    .then( definition => {
		businessNetworkDefinition = definition;
		factory = adminBusinessNetworkConnection.getBusinessNetwork().getFactory();
	    }).then(()=>{
		return adminBusinessNetworkConnection.getParticipantRegistry(namespace+'.User');
	    }).then(participantRegistry => {
	        participantRegistryUser = participantRegistry;
		let userIds;
		for(let k in data)
		{
		  let v = data[k];
		  let patientId = v.Patient_ID;
		  let investigatorId = v.Site_Investigator_ID;
		  let visitId = v.Visit_ID;
		  /*delete v.Visit_ID;
		  delete v.Patient_ID;
		  delete v.Site_Investigator_ID;*/
		  let patient;
		  let investigator;
		  let visit;
		  
		  participantRegistry.exists(patientId)
		  .then(status => {
		      if(status)
		      {  
			return participantRegistryUser.get(patientId)
			  .then(user=>{ 
			    patient = user;
			    console.log('Patient already exist ---- ');
			    return user; 
			  });
		      } else
		      {  
			  patient = factory.newResource(namespace, 'User', patientId);
			  patient.role = 'PATIENT';
			  return participantRegistryUser.add(patient)
			  .then(()=>{
			    console.log('New Patient Added with id ---- '+patientId);
			    adminBusinessNetworkConnection.issueIdentity(namespace+'.User#'+patientId, patientId)
			    .then(
			      identity=>{
				importCardForIdentity(patientId, identity);
				console.log('New Patient identity imported ---- '+patientId);
			      });
			  });
		      }
		      
		    }).then(()=>{
		      
		      participantRegistry.exists(investigatorId)
		      .then(status => {
			  if(status)
			  {  
			    return participantRegistryUser.get(investigatorId)
			      .then(user=>{ 
				investigator = user;
				console.log('Investigator already exist ---- ');
				return user; 
			      });
			  } else
			  {  
			      investigator = factory.newResource(namespace, 'User', investigatorId);
			      investigator.role = 'SITE_INVESTIGATOR';
			      return participantRegistryUser.add(investigator)
			      .then(()=>{
				console.log('New Investigator Added with id ---- '+investigatorId);
				adminBusinessNetworkConnection.issueIdentity(namespace+'.User#'+investigatorId, investigatorId)
				.then(
				  identity=>{
				    importCardForIdentity(investigatorId, identity);
				    console.log('New Investigator identity imported ---- '+investigatorId);
				  });
			      });
			  }
			  
			});
		      
		    }).then(()=>{
		        
			return factory.newResource(namespace, 'Visit', visitId);
		    }).then(visitAsset => {
			
			visit = visitAsset;
			visit.visitId = visitId;
			let kArr=[];
			let vArr=[];
			for(let key in v)
			{
                          if(k!='Visit_ID' || k!='Patient_ID' || k!='Site_Investigator_ID')
                          {    
                            kArr.push(key);
                            vArr.push(v[key]);
                          }  
                        }
			visit.keys = kArr;
			visit.values = vArr;
			return factory.newRelationship(namespace, 'User', patientId);
		    }).then(patientRelation=>{
			visit.patient = patientRelation;
			return factory.newRelationship(namespace, 'User', investigatorId);
		    }).then(investigatorRelation =>{	
			visit.investigator = investigatorRelation;
			return adminBusinessNetworkConnection.getAssetRegistry(namespace + '.Visit');
		    }).then((assetRegistry) => {
			console.log('Add asset with visit id------------------ ' + visitId);
			return assetRegistry.add(visit);
		    });    
		 }
	    });
});




app.get('/api/blockchain/get', function(req, res) {
	
	adminBusinessNetworkConnection = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');
      
	return adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
	.then( definition => {
	    businessNetworkDefinition = definition;
	    factory = adminBusinessNetworkConnection.getBusinessNetwork().getFactory();
	}).then(()=>{
	  
	    return adminBusinessNetworkConnection.getParticipantRegistry('com.incedoinc.clinical_trial.User');
	}).then(participantRegistry => {
	  
	    return participantRegistry.getAll();
	}).then(participants => {
	    let participant = participants[0];
	    res.send(participant.userId);
	}); 

});


function importCardForIdentity(cardName, identity) {
        const metadata = {
            userName: identity.userID,
            version: 1,
            enrollmentSecret: identity.userSecret,
            businessNetwork: businessNetworkName
        };
        const card = new IdCard(metadata, connectionProfile);
        return adminConnection.importCard(cardName, card);
}

function useIdentity(cardName) {
      return businessNetworkConnection.disconnect()
            .then(() => {
                businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });
				//businessNetworkConnection = new BusinessNetworkConnection();
                events = [];
                businessNetworkConnection.on('event', (event) => {
                    events.push(event);
                });
                return businessNetworkConnection.connect(cardName);
            })
            .then(() => {
                factory = businessNetworkConnection.getBusinessNetwork().getFactory();
            });
 }


