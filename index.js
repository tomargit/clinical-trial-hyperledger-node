var methods = {};

methods.concat = function(content) {
	console.log("this is test");
	return "Response: " + content;
};

exports.data = methods;