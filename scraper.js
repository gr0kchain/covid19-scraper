const axios = require("axios");
const artoo = require("artoo-js");
const cheerio = require("cheerio");
const notifier = require("node-notifier")
const fs = require('fs');

artoo.bootstrap(cheerio);

axios.get("https://sacoronavirus.co.za/").then(function(response) {

	// read prev data, cached in repo for comparison
	const prevData = fs.readFileSync(process.cwd() + '/data.json','utf-8')

	var $ = cheerio.load(response.data)

	// parse and extract data points
	var data = $('span[data-value]').scrape('data-value')


	// Setup payload object
	var payload = {}

	payload.concluded = data[0]
	payload.positive = data[1]
	payload.recoveries = data[2]
	payload.deahts = data[3]

	var payloadString = JSON.stringify(payload)

	if (prevData == payloadString) {
		// Do nothing
  } else {
		// Do something
	}

	fs.writeFileSync(process.cwd() + '/data.json', JSON.stringify(payload));
})
