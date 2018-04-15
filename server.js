var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var port = process.env.PORT || 2000;
app.listen(port);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


console.log("Deployed on port------------>" + port);

var methods = {};

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
let businessNetworkConnection = new BusinessNetworkConnection({
    cardStore: cardStore
});
let adminBusinessNetworkConnection;
let participantRegistryUser;
let assetRegistry;
let factory;
let events;
let businessNetworkName = 'clinical-trial-hyperledger';
let businessNetworkDefinition;
const cardStore = new MemoryCardStore();
let adminBusinessNetworkName;
const namespace = 'com.incedoinc.clinical';
const connectionProfile = {
    "name": "hlfv1",
    "type": "hlfv1",
    "orderers": [{
        "url": "grpc://localhost:7050"
    }],
    "ca": {
        "url": "http://localhost:7054",
        "name": "ca.org1.example.com"
    },
    "peers": [{
        "requestURL": "grpc://localhost:7051",
        "eventURL": "grpc://localhost:7053"
    }],
    "channel": "composerchannel",
    "mspID": "Org1MSP",
    "timeout": 300
};
adminConnection = new AdminConnection({
    cardStore: cardStore
});
adminBusinessNetworkConnection = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');

//adminBusinessNetworkConnection.query('selectCommod',{userId : 'resource:com.incedoinc.clinical.User#PA_TA1_V_16'}) .then((results) => { 
//console.log( results.length); });


app.post('/blockchain/api/getVisitDataByUserId', function (req, res) {

    console.log("GET VISIT DATA BY USER ID API CALL");

    let userId = req.param('userId');
    let role = req.param('role');
    //console.log(req.body.role);
    if (role == 'PATIENT') {
        adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
            .then(() => {
                return adminBusinessNetworkConnection.query('selectVisitByPatient', {
                    userId: 'resource:com.incedoinc.clinical.User#' + userId
                });

            }).then((results) => {

                let processData = getVisitData(results);
                console.log(processData);
                res.send(processData);
            });
    } else if (role == 'SITE_INVESTIGATOR') {
        adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
            .then(() => {
                return adminBusinessNetworkConnection.query('selectVisitByInvestigator', {
                    userId: 'resource:com.incedoinc.clinical.User#' + userId
                });
            }).then((results) => {
                //console.log( results.length); 
                let processData = getVisitData(results);
                console.log(processData);
                res.send(processData);
            });
    } else if (role == 'CRO') {
        adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
            .then(() => {
                return adminBusinessNetworkConnection.query('selectVisitByCRO');
            }).then((results) => {
                //console.log( results.length); 
                let processData = getVisitData(results);
                console.log(processData);
                res.send(processData);
            });
    }

});

app.get('/blockchain/api/home', function (req, res) {

    console.log("GET HOME PAGE API CALL");

    adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
        .then(definition => {
            businessNetworkDefinition = definition;
            factory = adminBusinessNetworkConnection.getBusinessNetwork().getFactory();
        }).then(() => {
            return adminBusinessNetworkConnection.getParticipantRegistry(namespace + '.User');
        }).then(participantRegistry => {
            return participantRegistry.getAll();
        }).then(participants => {
            let data, length = participants.length;
            for (let i = 0; i < length; i++) {
                p = participants[i];
                if (i == 0)
                    data = '{"' + 'userId"' + ': "' + p.userId + '", "' + 'role"' + ': "' + p.role + '"}';
                else
                    data += ',{"' + 'userId"' + ': "' + p.userId + '", "' + 'role"' + ': "' + p.role + '"}';
            }
            if (data.length > 0)
                data = '[' + data + ']';
            console.log(data);
            res.render('./pages/blockchain', {
                participants: JSON.parse(data)
            });
        });
});

app.get('/api/blockchain/save', async (req, res, next) => {

    let data = [{
        "Visit_ID": "VI_PA_TA1_1_16",
        "Patient_ID": "PA_TA1_V_16",
        "Site_Investigator_ID": "SI_TA1_TA16",
        "Trail_ID": "TA16",
        "Visit_Date": "43101.0",
        "Visit_Time_In": "0.5083333333333333",
        "Visit_Time_Out": "0.5208333333333334",
        "Urobilinogen": "u",
        "Bilirubin": "b",
        "Ketone": "k",
        "Blood": "b",
        "Protien": "p",
        "Nitrile": "n",
        "Leukocytes": "l",
        "SpecificGravity": "s",
        "PH": "p",
        "Microalbumin": "m"
    }];

    adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
        .then(definition => {
            businessNetworkDefinition = definition;
            factory = adminBusinessNetworkConnection.getBusinessNetwork().getFactory();
        }).then(() => {
            return adminBusinessNetworkConnection.getParticipantRegistry(namespace + '.User');
        }).then(participantRegistry => {
            participantRegistryUser = participantRegistry;
            for (let k in data) {

                let v = data[k];
                saveVisit(v);
            }
        }).then(() => {
            res.send(true);
        });
});




app.get('/api/blockchain/get', function (req, res) {

    adminBusinessNetworkConnection = new BusinessNetworkConnection('admin@clinical-trial-hyperledger');

    return adminBusinessNetworkConnection.connect('admin@clinical-trial-hyperledger')
        .then(definition => {
            businessNetworkDefinition = definition;
            factory = adminBusinessNetworkConnection.getBusinessNetwork().getFactory();
        }).then(() => {

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
            console.log('-------cardStore------------');
            console.log(cardStore);
            businessNetworkConnection = new BusinessNetworkConnection({
                cardStore: cardStore
            });
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

function getVisitData(visitData) {
    let data = [],
        length = visitData.length;
    for (let i = 0; i < length; i++) {
        let p = visitData[i];
        data[i] = {};
        data[i]['visitId'] = p.visitId;
        data[i]['keys'] = [];
        data[i]['keys'] = p.keys;
        data[i]['values'] = p.values;
        data[i]['patient'] = p.patient.$identifier;
        data[i]['investigator'] = p.investigator.$identifier;
    }
    return data;
}



function saveVisit(v) {
    let patientId = v.Patient_ID;
    let investigatorId = v.Site_Investigator_ID;
    let visitId = v.Visit_ID;
    let patient;
    let investigator;
    let visit;
    let patientStatus;
    let investigatorStatus;

    return participantRegistryUser.exists(investigatorId)
        .then(status => {
            investigatorStatus = status;
            if (status) {
                console.log('investigator already exist ---- ' + investigatorId);
                return participantRegistryUser.get(investigatorId)
            } else {
                return factory.newResource(namespace, 'User', investigatorId);
            }
        }).then((investigator) => {
            if (!investigatorStatus) {
                investigator.role = 'SITE_INVESTIGATOR';
                return participantRegistryUser.add(investigator);
            }
        }).then(() => {
            if (!investigatorStatus) {
                console.log('New Investigator Added with id ---- ' + investigatorId);
                return adminBusinessNetworkConnection.issueIdentity(namespace + '.User#' + investigatorId, investigatorId);
            }
        }).then(identity => {
            if (!investigatorStatus) {
                var currentTime = new Date().getTime();
                importCardForIdentity(investigatorId, identity);
                console.log('New Investigator identity imported ---- ' + investigatorId);
            }
        }).then(() => {
            return participantRegistryUser.exists(patientId);
        }).then(status => {
            patientStatus = status;
            if (status) {
                console.log('Patient already exist ---- ');
                return participantRegistryUser.get(patientId);
            } else {
                return factory.newResource(namespace, 'User', patientId);
            }

        }).then((patient) => {
            if (!patientStatus) {
                patient.role = 'PATIENT';
                return participantRegistryUser.add(patient);
            }
        }).then(() => {
            if (!patientStatus) {
                console.log('New Patient Added with id ---- ' + patientId);
                return adminBusinessNetworkConnection.issueIdentity(namespace + '.User#' + patientId, patientId);
            }
        }).then((identity) => {
            if (!patientStatus) {
                importCardForIdentity(patientId, identity);
                console.log('New Patient identity imported ---- ' + patientId);
            }
        }).then(() => {
            events = [];
            businessNetworkConnection.on('event', (event) => {
                events.push(event);
            });
            console.log('Before card Connect');
            return businessNetworkConnection.connect(investigatorId)
                .then((temp) => {
                    console.log('get Factory');
                    return businessNetworkConnection.getBusinessNetwork().getFactory();
                }).then((f) => {
                    console.log('set factory');
                    factory = f;
                }).then(() => {
                    return factory.newResource(namespace, 'Visit', visitId);
                }).then(visitAsset => {
                    visit = visitAsset;
                    visit.visitId = visitId;
                    let kArr = [];
                    let vArr = [];
                    for (let key in v) {
                        if (key != 'Visit_ID' || key != 'Patient_ID' || key != 'Site_Investigator_ID') {
                            kArr.push(key);
                            vArr.push(v[key]);
                        }
                    }
                    visit.keys = kArr;
                    visit.values = vArr;
                    return factory.newRelationship(namespace, 'User', patientId);
                }).then(patientRelation => {
                    visit.patient = patientRelation;
                    return factory.newRelationship(namespace, 'User', investigatorId);
                }).then(investigatorRelation => {
                    visit.investigator = investigatorRelation;
                    return businessNetworkConnection.getAssetRegistry(namespace + '.Visit');
                }).then((assetRegistry) => {
                    console.log('Add asset with visit id------------------ ' + visitId);
                    return assetRegistry.add(visit);
                })
        });
}