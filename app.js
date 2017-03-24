var express = require('express')
var app = express()

app.get('/db_test', function (req, res) {
	db.serialize(function() {
		db.all("Select * from research order by name", function(err, row) {
		 	console.log(row);
		});
  	});
})

app.get('/db/:from/:to', function (req, res) {
	var result = db.serialize(function() {
		db.all("Select * from research where year >= " + req.params.from + " and year <= " + req.params.to + " order by year", function(err, rows) {
			res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify(rows));
		});
	});
	//db.close()
});

var file = "test.db";

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var port = 1337
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
