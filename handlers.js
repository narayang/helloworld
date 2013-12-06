
var exec = require("child_process").exec;var querystring = require("querystring");

function start(response, request) {
  console.log("handler for start called");

var body = '<html>'+
 '<head>'+
 '<meta http-equiv="Content-Type" content="text/html; '+
 'charset=UTF-8" />'+
 '</head>'+
 '<body>'+
 '<form action="/upload" method="post">'+
 '<textarea name="name"></textarea>'+
 '<input type="submit" value="Submit text" />'+
 '</form>'+
 '</body>'+
 '</html>'; response.writeHead(200, {"Content-Type": "text/html"});
 response.write(body);
 response.end();

}

function upload(response, request) {
  
  var postData = "";
  console.log("handler for upload called");

   request.addListener("data", function(postDataChunk) {
 	console.log("Receiving POST data chunk:"+ postDataChunk.toString());
	postData += postDataChunk.toString();
    });    request.addListener("end", function() {
 	console.log("Done receiving the data");
  	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("hare krsna: " + querystring.parse(postData).name);
  	response.end();
    });


}

exports.start = start;
exports.upload = upload;


