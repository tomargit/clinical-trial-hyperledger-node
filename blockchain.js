'use strict';

var methods = {};

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const IdCard = require('composer-common').IdCard;
const MemoryCardStore = require('composer-common').MemoryCardStore;
const path = require('path');
const cardName;
let adminConnection;
let businessNetworkConnection;
let factory;
const aliceCardName = 'alice';
const bobCardName = 'bob';
let events;
let businessNetworkName;
let businessNetworkDefinition;
const cardStore = new MemoryCardStore();
//businessNetworkConnection = new BusinessNetworkConnection({ cardStore: cardStore });
businessNetworkConnection = new BusinessNetworkConnection('admin@basic-sample-network');
businessNetworkConnection.connect('admin@basic-sample-network');
factory = businessNetworkConnection.getBusinessNetwork().getFactory();