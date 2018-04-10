var methods = {};

methods.processContent = function(content) {
	var length = content.length;
	var processCont = [];
	
	for(var i = 0; i<length; i++)
	{
		var temp = content[i];
		processCont[i] = {};
		for (var key in temp) {
			if (key == 'Visit_ID' || key == 'Patient_ID' || key == 'Site_Investigator_ID' || key == 'Trail_ID' || key == 'Visit_Date' || key == 'Visit_Time_Out' || key == 'Visit_Time_In') 
				processCont[i][key] = temp[key];
			else
			{	
				if(!processCont[i]['data_hash'])
				{	
					processCont[i]['data_hash']={};
				}
				var val = temp[key];
				processCont[i]['data_hash'][key] = val;
			}	
		}
	}
	return processCont;
};

exports.data = methods;