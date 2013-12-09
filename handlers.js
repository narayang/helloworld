
var exec = require("child_process").exec;var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable"), sys = require('sys');

function start(res, request) {
  console.log("handler for start called");

          res.writeHead(200, "OK", {'Content-Type': 'text/html'});
          res.write('<html><head><title>Hello Noder!</title></head><body>');
          res.write('<h1>Welcome Noder, who are you?</h1>');
          res.write('<form enctype="multipart/form-data" action="/upload" method="post">');
          res.write('Name: <input type="text" name="username" value="John Doe" /><br />');
          res.write('Age: <input type="text" name="userage" value="99" /><br />');
          res.write('File :<input type="file" name="upload" multiple="multiple"><br>');
          res.write('<input type="submit" />');
          res.write('</form></body></html');
          res.end();
}

function upload(response, request) {
  
  var postData = "";
  console.log("handler for upload called");


  var form = new formidable.IncomingForm();
   console.log("about to parse");


   form.parse(request, function(error, fields, files) {
  	 console.log("parsing done");
	 console.log('in if condition'+sys.inspect({fields: fields, files: files}));

	 /* Possible error on Windows systems:
	 tried to rename to an already existing file */
	 fs.rename(files.upload.path, "abc22.png", function(error) {
	   if (error) {
		 fs.unlink("abc.png");
		 fs.rename(files.upload.path, "abc.png");
	  }
	 });

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received image:<br/>");
  response.write("<img src='/show' />");
  response.end();
 });

}

 function show(response) {
	 console.log("Request handler 'show' was called.");
 	response.writeHead(200, {"Content-Type": "image/png"});
 	fs.createReadStream("abc22.png").pipe(response);
 }

exports.start = start;
exports.upload = upload;
exports.show = show;

