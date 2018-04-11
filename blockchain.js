'use strict';

var methods = {};

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const IdCard = require('composer-common').IdCard;
const MemoryCardStore = require('composer-common').MemoryCardStore;
const path = require('path');
let cardName;
let adminConnection;
let businessNetworkConnection;
let factory;
let events;
let businessNetworkName;
let businessNetworkDefinition;
const cardStore = new MemoryCardStore();
let adminBusinessNetworkName;


function setBusinessNetworkName(networkName){
	adminBusinessNetworkName = networkName;
}

function getBusinessNetworkName(){
	return adminBusinessNetworkName;
}

async function createBusinessNetworkConnection(userName){
	//businessNetworkConnection = new BusinessNetworkConnection(userName+'@'+adminBusinessNetworkName);
	//businessNetworkConnection.connect(userName+'@'+adminBusinessNetworkName);
	businessNetworkConnection = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');
	await businessNetworkConnection.connect('admin@clinical-trial-hyperledger');
	factory = businessNetworkConnection.getBusinessNetwork().getFactory();
}

function getBusinessNetworkConnection(){
	return businessNetworkConnection;
}

async function getAllParticipants(){

	let participantRegistry = await businessNetworkConnection.getParticipantRegistry('com.incedoinc.clinical_trial.User');
        let participants = await participantRegistry.getAll();
	let participant = participants[0];
	return participant;
}



exports.data = {};
exports.methods = {
		setBusinessNetworkName, 
		getBusinessNetworkName,
		createBusinessNetworkConnection,
		getBusinessNetworkConnection,
		getAllParticipants
	      };


/*
methods.setBusinessNetworkName = function(networkName){
	adminBusinessNetworkName = networkName;
}

methods.getBusinessNetworkName = function(){
	return adminBusinessNetworkName;
}

methods.createBusinessNetworkConnection = function(userName){
	//businessNetworkConnection = new BusinessNetworkConnection(userName+'@'+adminBusinessNetworkName);
	//businessNetworkConnection.connect(userName+'@'+adminBusinessNetworkName);
	businessNetworkConnection = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');
	businessNetworkConnection.connect('admin@clinical-trial-hyperledger');
	console.log("---------------------------------------------------------------------------");
	console.log(businessNetworkConnection.getBusinessNetwork());
	//factory = businessNetworkConnection.getBusinessNetwork().getFactory();
}

methods.getBusinessNetworkConnection = function(){
	return businessNetworkConnection;
}

methods.getAllParticipants = function(){

	return businessNetworkConnection.getParticipantRegistry('com.incedoinc.clinical_trial.User')
			.then(participantRegistry=>{
				return participantRegistry.getAll();
	}).then(participants=>{const participant = participants[0]; return participant; })

}
*/

