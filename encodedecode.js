
'use strict';

var methods = {};
var _ =require('lodash');





methods.encodeContent = function(content) {
	let data = content;
	let buff = new Buffer(data);  
	let base64data = buff.toString('base64');
	return base64data;
}



methods.decodeContent = function(obj1,content) {
	console.log("Content is"+JSON.stringify(content));
	let data = content;  
	let buff = new Buffer(data, 'base64');  
	let text = buff.toString('ascii');
	//return text; 
	console.log("Me called Again");
	console.log("CTMS data is"+JSON.stringify(obj1));
	console.log("BlockChain data is"+content);
	console.log("text is"+text);
	var obj2 = JSON.parse(text);
    const diff = Object.keys(obj1).reduce((result, key) => { 
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        } else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));
console.log(" hello " + diff);
    return diff;
}

methods.getJsonDiff= function(obj1, obj2) {
	console.log("Me called Again");
	console.log("CTMS data is"+JSON.stringify(obj1));
	console.log("BlockChain data is"+obj2);
	obj2 = JSON.parse(obj2);
    const diff = Object.keys(obj1).reduce((result, key) => {
        if (!obj2.hasOwnProperty(key)) {
            result.push(key);
        } else if (_.isEqual(obj1[key], obj2[key])) {
            const resultKeyIndex = result.indexOf(key);
            result.splice(resultKeyIndex, 1);
        }
        return result;
    }, Object.keys(obj2));
console.log(" hello " + diff);
    return diff;
}

exports.data = methods;






