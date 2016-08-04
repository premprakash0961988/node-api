var express = require("express");
var app =  express();

var node1 = require("./index1.js")(app);
var node2 = require("./index2.js")(app);


app.listen(8080);


app.get('/',function(req,res) {
	res.send("its great");
});


var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "table_prem"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
