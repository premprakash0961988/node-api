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
  database: "test3aug"
});
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query(select * from table_prem, fun(error, rows) {
  if (err) throw err;

  console.log('Data recevied : \n');
  console.log(row);
});
