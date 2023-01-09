var express = require('express');
//var app = express();
 var sql = require("mssql");
var http = require("http");
var fs = require("fs");
 var Value_1= 0;
 var Value_2= 0;
 var Value_3= 0;

//var SQL=require("./SQL_SERVER");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var data = fs.readFileSync(__dirname + "/index.html" , "utf-8");
  res.end(data);
    var config = {
        user: 'DH_SQL',
        password: '123456',
        server: 'APTHINKPAD\\WINCC', 
        database: 'NODE_DATA',
		port: 1433,
		options: {
                "enableArithAbort": true
            }
		
    };
setInterval(function(){
   sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        
        // query to the database and get the records
        request.query('select * from Table_R', function (err, result) {
          //  if (err) console.log(err)
			
           // console.log(rowsAffected);
		  var Endrows = result.recordsets[0].length -1;
		Value_1 = result.recordset[Endrows].Value_1 // return 1
		Value_2 = result.recordset[Endrows].Value_2 // return 2 
		Value_3 = result.recordset[Endrows].Value_3 // return 3		
		
const Data_Received = {
    "Value_1": Value_1,
    "Value_2": Value_2,
    "Value_3": Value_3
};

// convert JSON object to string
const data = JSON.stringify(Data_Received);

// write JSON string to a file
fs.writeFile('Data_Received.json', data, (err) => {
    if (err) {
        throw err;
    }
    //console.log("JSON data is saved.");
});
		

		// console.log(Endrows);
    
        });
    });
	}, 1000);
}).listen(process.env.PORT || 3000);

