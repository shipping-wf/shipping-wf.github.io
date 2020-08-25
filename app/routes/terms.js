var express = require('express');
var router = express.Router();

/* GET parameters listing. */
router.get('/', function(req, res, next) {
	// 1. Get the link from header to the context
	// 2. Flatten the input JSON-ld document
	// 3. Lookup for a specific term (nested terms are , separated. https://shippping-wf.io/BillOfLading.jsonld,https://shipping-wf.io/electronicBill
	// 4. returns a JSON object representing the term, if not, we 
	res.send('{"res":"abc"}');
});

module.exports = router;
