var express = require('express');
var jsonld = require('jsonld');
var axios = require('axios');

var router = express.Router();

// grab the built-in Node.js doc loader
const nodeDocumentLoader = jsonld.documentLoaders.node();

// change the default document loader
const customLoader = async (url, options) => {
	console.log("called customLoader " + url);
	if (false) {
		return {
			contextUrl: null, // this is for a context via a link header
			document: request.get("https://shipping-wf.github.io/BillOfLading.jsonld"), // this is the actual document that was loaded
			documentUrl: "https://shipping-wf.github.io/BillOfLading.jsonld" // this is the actual context URL after redirects
		};
	}
	return nodeDocumentLoader(url);
};

var expand = async function(req, res) { 
  // Your async task will execute with await
  let context = req.body["@context"];
  if (context == null) { 
	context = "https://shipping-wf.github.io/BillOfLading.jsonld";
  }
  const expanded = await jsonld.expand(req.body, {expandContext: context});
  res.send(expanded);
}

var flatten = async function(req, res) {
   const flattened = await jsonld.flatten(req.body);
   res.send(flattened);
}

var compact = async function(req, res) {
  let context = req.body["@context"];
  if (context == null) { 
	var doc = await axios.get("https://shipping-wf.github.io/BillOfLading.jsonld")	
	context = doc.data;
  }
  console.log("Context is : " + JSON.stringify(context));

  const compacted = await jsonld.compact(req.body, context);
  res.send(compacted);
}

router.post('/expand', function(req, res, next) {
	console.log("Serving POST");
	expand(req, res)
});

router.post('/flatten', function(req, res, next) {
	console.log("Serving POST");
	flatten(req, res)
});

router.post('/compact', function(req, res, next) {
	console.log("Serving POST");
	compact(req, res)
});

module.exports = router;
