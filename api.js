

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

//var affiliateToken = "ea351af4dbbb4c71bd889b2527b3f883"
var affiliateId = 'premprakash096'
var affiliateToken = '671645dfd6d1422692963bd673804771'
var request = require('request');
let productCollection = "product"
       


var exportData = function(app) {
	createDB(app);
	createCollection(app);
	refreshData(app);
	getAllCategories(app);
	fetchCategoryData(app);
	createProductCollection(app);
}

  var createDB =  function (app){ 
  	app.get('/createdb',function(req,res) {

		MongoClient.connect(url, function(err, db) {
		  	if (err) throw err;
		  	console.log("Database created!");
		  	db.close();
			});
			res.send("createdb");
	})
}




 var createCollection = function(app){ 
 	app.get('/createCollection',function(req,res) {

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
		  db.createCollection(req.query.collection, function(err, res) {
		    if (err) throw err;
		    console.log(req.query.collection + " collection created!");
		    db.close();
		  });
	});

	res.send(req.query.collection + " collection created!");
})
}



var refreshData = function(app){ 
 	app.get('/refresh',function(req,res) {
		
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;

	  request("https://affiliate-api.flipkart.net/affiliate/api/premprakash096.json", function(error,response,body) {
	  	var obj = JSON.parse(body);
		var objects = []

		var count = 0;
	  	for (var i in obj.apiGroups.affiliate.apiListings) {
	  		var data = obj.apiGroups.affiliate.apiListings[i];
	  		console.log(data)
	  		data = data['availableVariants']['v1.1.0'];
	  		objects.push(data)
		  	}

		  		  		
		  	db.collection("categories").insertMany(objects, function(err, res) {
		    if (err) throw err;
		    
		  	});
		  	db.close();
		});
	  
	  })
	  

	res.send("refreshData started");
})
}


var getAllCategories = function(app){ 
 	app.get('/getAllCategories',function(req,res) {
		
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;

	  	  var collection = db.collection("categories");
			collection.find({},{"resourceName":1,"get":1,"deltaGet":1,"top":1}).toArray(function(err, items) {
          	var jsonString = JSON.stringify(items);
            res.send(jsonString);
			})
		  	db.close();
		});
	  
	  })
}

var createProductCollection = function(app) {
	app.get('/createProductCollection',function(req,res) {

		MongoClient.connect(url, function(err, db) {

db.listCollections({name: productCollection})
    .next(function(err, collinfo) {
        if (collinfo) {
            console.log("Collection found");
            res.send(productCollection + " collection created!")
        }
        else {
        db.createCollection(productCollection, function(err, res) {
		    if (err) throw err;
		    console.log(productCollection + " collection created!");
		    res.send(productCollection + " collection created!")
		    
		  });
        	
        }
    });

	})
})
}

var fetchCategoryData = function(app){ 
 	app.get('/fetch',function(req,res) {
		
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;


	  	var collection = db.collection("categories");	
	  	let categoryName = req.query.category;
	  	  
		collection.find({resourceName:categoryName},{"get":1}).toArray(function(err, items) {
         let url = items[0].get;


		var options = { method: 'GET',
  						url: url, 
  						 headers:  { 
					     'fk-affiliate-token': affiliateToken,
     					 'fk-affiliate-id': affiliateId } 
     				};

		request(options, function (error, response, body) {
  		if (error) throw new Error(error);

	    console.log(error);
	    console.log(response);
	    console.log(body);
	  	var obj = JSON.parse(body);
		var objects = []

		var count = 0;
	  	for (var i in obj.productInfoList) {
	  		var data = obj.productInfoList[i];
	  		console.log(data)
	  		data["category"] = categoryName;
	  		objects.push(data)
		  	}
		  		  		
		  	db.collection(productCollection).insertMany(objects, function(err, res) {
		    if (err) throw err;
		    
		  	});
		  	db.close();
		

  			console.log(body);
		});
         res.send(url);
		});
	  
	  })
})
}






//module.exports = {createDB,refreshData,createCollection}; 
module.exports  = {exportData};

