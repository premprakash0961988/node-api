var express = require("express");
var app =  express();

var node1 = require("./index1.js")(app);
var node2 = require("./index2.js")(app);


app.listen(8080);


app.get('/',function(req,res) {
	res.send("its great");
});

