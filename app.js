const consoleInput = process.argv.slice(2,4);
const city = consoleInput[0];
const country = consoleInput[1];
const weather = require("./weather.js");

weather.get(city, country);
