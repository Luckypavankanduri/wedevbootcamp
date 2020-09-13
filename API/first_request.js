var request = require("request");
request("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2020-08-30", function(error,response,body){
	if(!error && response.statusCode == 200){
		var parsedData =JSON.parse(body);
		console.log(parsedData["results"]["sunset"]);
		
	} 
});