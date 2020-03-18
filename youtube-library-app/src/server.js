const express = require('express'); 
const cors = require('cors');
const bodyParser = require("body-parser"); 
const fs = require('fs');
const axios = require('axios');

var hostname = 'localhost'; 
var port = 2999;
var ytapiURL = 'https://www.googleapis.com/youtube/v3/search';
var apiKey = 'AIzaSyASO7i2BTsNkU_YjucK5Eej-XgrsHnZDu8';


function connectAPI() {
    var app = express(); 
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var myRouter = express.Router();

    myRouter.route('/add')
        .post(function(req,res){
            fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);
                let json = JSON.parse( '{"title":"'+req.body.addtitle+'", "id":"'+req.body.addid+'"}');
                data['videos'].push(json);
                fs.writeFile('../../server/'+req.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    } 
                });
              })
        })
    
        myRouter.route('/remove')
        .post(function(req,res){
            fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);
                let json = JSON.parse('{"title":"'+req.body.rmtitle+'", "id":"'+req.body.rmid+'"}');
                console.log(JSON.stringify(json));      

                for (var i = 0; i < data['videos'].length; i++){
                    console.log("Testing : "+JSON.stringify(data['videos'][i]));
                    if (data['videos'][i].id === json.id){
                        console.log("Matched : "+data['videos'][i]);
                        data['videos'].splice(i,1);
                    }
                  }
                  console.log(JSON.stringify(data));        
                  fs.writeFile('../../server/'+req.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    } 
                });
              })
        })

    myRouter.route('/data')
        .get(function(req,res){ 
            fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                //modify thumbnails by modifying "data" here
                res.end(data);
              })
        })

    myRouter.route('/search')
        .post(function(req,res){
            axios.get(ytapiURL, {
                params: {
                  part: 'snippet',
                  maxResults: req.body.maxResults,
                  q: req.body.keyword,
                  type: 'videos',
                  key: apiKey
                }
              })
              .then(function (response) {
                  for (let i = 0; i < req.body.maxResults; i++) {
                      response.data.items[i].id = JSON.stringify(response.data.items[i].id);
                      response.data.items[i].snippet = JSON.stringify(response.data.items[i].snippet);

                      //console.log("id : "+response.data.items[i].id);
                      //console.log("snippet : "+response.data.items[i].snippet);
                  }
                  //response.data.items
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
                // always executed
              });
        })


    myRouter.route('/')
    .all(function(req,res){ 
          res.json({message : "Bienvenue sur notre API ", methode : req.method});
    });    
    app.use(myRouter);  
    app.listen(port, hostname, function(){
    });
}


connectAPI();

