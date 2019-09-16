const http = require('http');
    const fs = require('fs');
    const url = require('url');
    const db = require("./database2");

    var server = http.createServer(function(request, response){
        console.log('Request URL--', request.url)
        if(request.url == "/home"){
            fs.readFile("./home.html", function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write('Error found');
                }
                else{
                    response.writeHead(200,{'content-type':'text/html'});
                    response.write(data);
                }
                // response.end();
            });
        }
        else if(request.url.indexOf('createUser') > 0){
            var y = url.parse(request.url, true);
            console.log(y.query);
            db.insertuser(y.query);
            fs.readFile("./list.html", function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write('Error found');
                }
                else{
                    response.writeHead(200,{'content-type':'text/html'});
                    response.write(data);
                }   
            });
        }

        // else if(request.url.indexOf('listUsers')>0){
            
        else if(request.url=="/list"){
    

                db.listuser(function (list){ 
                    console.log(list);
                    var details = JSON.stringify(list);
                    response.writeHead(200,{'content-type':'application/json'});
                    response.write(details);
                });
                console.log("end of listuser");
            }
            else if(request.url=="/delete"){
                fs.readFile('./udelete.html',function(err,data){
                    if(err){
                        console.log('Deleting user failed');                    }
                        else{
                    response.writeHead(200, {'content-type':'text/html'});
                    response.write(data);
                        }
                });
            }
            
            else if(request.url.indexOf('backtolist')>0)
            {
                var remove = url.parse(request.url,true);
                console.log(remove.query);
                db.deleteuser(remove.query);
                console.log('testing');
                fs.readFile('./list.html',function(err,data){
                    console.log('running');
                    response.write(data);
                })
            }
    });
    server.listen(1234);
    console.log("http://localhost:1234/home");