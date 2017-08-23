var express = require("express");
var cors = require('cors')
var app = express()

app.use(cors())


var apiNode = require("./api.js");
//var node3 = require("./index2.js")(app1);
// node2.abcd(app)
// node2.abcde(app)
apiNode.exportData(app)

//console.log(node2.abcde)
app.listen(8080);


app.get('/',function(req,res) {
	console.log(req);
	res.send(req);
});

