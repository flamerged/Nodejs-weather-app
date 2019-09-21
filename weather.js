const https =  require("https");
const http =  require("http");
const querystring = require("querystring");
const api = require("./api.json");

function printWeather(weather){
	const message = `The weather in ${weather.name} is ${weather.main.temp} °C.`;
	console.log(message);
}

function printError(error){
	console.error(error.message);
}

function get(city, country){
	const parameters = {
		q: ``,
		APPID: api.key,
		units: "metric"
	}
	
	console.log(querystring.stringify(parameters));
	
	try{
		if(country === null || country === undefined){
			parameters.q = `${city}`;
		} else {
			parameters.q = `${city},${country}`;
		}
		
		const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;
		console.log(apiUrl);
		
		const request = https.get(apiUrl, response => {
			let body = "";
			
			response.on("data", chunk => {
				body += chunk;
			});
			
			response.on("end", () => {
				try {
				const weather = JSON.parse(body);
			
				if(weather.name){
					printWeather(weather);
				} else {
					const queryError = new Error(`The weather for the location "${city}" could not be found.`);
					printError(queryError);
				}
				} catch (error){
					printError(error);
				}
			});
		});
	} catch (error) {
		printError(error);
	}
	
}

module.exports.get = get;	


