const express = require('express')
const cool = require('cool-ascii-faces')
const path = require('path')

const PORT = process.env.PORT || 5000



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile(path.join(__dirname+'/public/form.html')))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/calculate', handlePost)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  
function handlePost(request, response) {
	const type = request.query.type;
	const weight = Number(request.query.weight);

	calculateRate(response, type, weight);
}

function calculateRate(response, type, weight) {
	
	let price = "0"; 

	if (type == "letterS") {
		type = "Letters (Stamped)";
		price = calculateStamped(weight);
	} else if (type == "letterM") {
		type = "Letters (Metered)";
		price = calculateMetered(weight);	
	} else if (type == "largeE") {
		type = "Large Envelopes (Flats)";
		price = calculateEnvelope(weight);
	} else if (type == "fcpsR") {
		type = "First-Class Package Service—Retail";
		price = calculateFCPackage(weight);
	} else {
		price - "Error: Please redo the form";
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {type: type, weight: weight, price: price};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}

function calculateStamped(weight) {
	
	const x = weight;
	switch (true) {
		case (x <= 1):
			price = "0.55";
			break;
		case (x <= 2):
			price = "0.70";
			break;
		case (x <= 3):
			price = "0.85";
			break;
		default:
			price = "1.00";
			break;
		}
	return price;
}

function calculateMetered(weight) {
	
	const x = weight;
	switch (true) {
		case (x <= 1):
			price = "0.50";
			break;
		case (x <= 2):
			price = "0.65";
			break;
		case (x <= 3):
			price = "0.80";
			break;
		default:
			price = "0.95";
			break;
		}
	return price;
}

function calculateEnvelope(weight) {
	
	const x = weight;
	switch (true) {
		case (x <= 1):
			price = "1.00";
			break;
		case (x <= 2):
			price = "1.20";
			break;
		case (x <= 3):
			price = "1.40";
			break;
		case (x <= 4):
			price = "1.60";
			break;
		case (x <= 5):
			price = "1.80";
			break;
		case (x <= 6):
			price = "2.00";
			break;
		case (x <= 7):
			price = "2.20";
			break;
		case (x <= 8):
			price = "2.40";
			break;
		case (x <= 9):
			price = "2.60";
			break;
		case (x <= 10):
			price = "2.80";
			break;
		case (x <= 11):
			price = "3.00";
			break;
		case (x <= 12):
			price = "3.20";
			break;
		default:
			price = "3.40";
			break;
		}
	return price;
}

function calculateFCPackage(weight) {
	
	const x = weight;
	switch (true) {
		case (x <= 4):
			price = "3.80";
			break;
		case (x <= 8):
			price = "4.60";
			break;
		case (x <= 12):
			price = "5.30";
			break;
		default:
			price = "3.40";
			break;
		}
	return price;
}