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
		//price = 10;
		price = calculateStamped(weight);
	/*
	} else if (op == "subtract") {
		result = left - right;		
	} else if (op == "multiply") {
		result = left * right;
	} else if (op == "divide") {
		result = left / right; */
	} else {
		price - "20";
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {type: type, weight: weight, price: price};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}

function calculateStamped(weight) {
	let price = 0;
	
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