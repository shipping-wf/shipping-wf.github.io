var express = require('express');
var jsonld = require('jsonld');
var axios = require('axios');

var router = express.Router();

const LINK_HEADER_CONTEXT = 'http://www.w3.org/ns/json-ld#context';

// grab the built-in Node.js doc loader
const nodeDocumentLoader = jsonld.documentLoaders.node();

// change the default document loader
const customLoader = async (url, options) => {
	console.log("called customLoader " + url);
	if (false) {
		return {
			contextUrl: null, // this is for a context via a link header
			document: await axios.get("https://shipping-wf.github.io/BillOfLading.jsonld"), // this is the actual document that was loaded
			documentUrl: "https://shipping-wf.github.io/BillOfLading.jsonld" // this is the actual context URL after redirects
		};
	}
	return nodeDocumentLoader(url);
};

var getLinkHeader = function(req) {
  var contextUrl = null;
  if (req.headers['content-type'] !== 'application/ld+json' && req.headers.link != undefined ) {
      const linkHeaders = jsonld.parseLinkHeader(req.headers.link);
      const linkedContext = linkHeaders[LINK_HEADER_CONTEXT];

       if(linkedContext) {
        contextUrl = linkedContext.target;
      }
  }

  return contextUrl;
}

var expand = async function(req, res) { 
  // Your async task will execute with await
  let context = req.body["@context"];
  if (context == null) { 
	context = getLinkHeader(req);
  }
  const expanded = await jsonld.expand(req.body, {expandContext: context});
  res.set('content-type','application/json+ld');
  res.send(expanded);
}

var flatten = async function(req, res) {
   const flattened = await jsonld.flatten(req.body);
   res.set('content-type','application/json+ld');
   res.send(flattened);
}

var compact = async function(req, res) {
  let context = req.body["@context"];
  if (context == null) { 
	var contexturl = getLinkHeader(req);
	var doc = await axios.get(contextUrl);	
	context = doc.data;
  }
  console.log("Context is : " + JSON.stringify(context));

  const compacted = await jsonld.compact(req.body, context);
  res.set('content-type','application/json+ld');
  res.send(compacted);
}

router.post('/expand', function(req, res, next) {
	console.log("Serving EXPAND: ");
	expand(req, res)
});

router.post('/flatten', function(req, res, next) {
	console.log("Serving FLATTEN");
	flatten(req, res)
});

router.post('/compact', function(req, res, next) {
	console.log("Serving COMPACT");
	compact(req, res)
});

router.post('/frame', function(req, res, next) {
	console.log("Serving FRAME")
});

module.exports = router;
