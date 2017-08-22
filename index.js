var express = require("express");
var cors = require('cors')
var app = express()

app.use(cors())


var node1 = require("./index1.js")(app);
var node2 = require("./index2.js");
//var node3 = require("./index2.js")(app1);
// node2.abcd(app)
// node2.abcde(app)
node2.exportData(app)

//console.log(node2.abcde)
app.listen(8080);


app.get('/',function(req,res) {
	console.log(req);
	res.send(req);
});

