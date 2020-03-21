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
            console.log("POST received on /add");
            fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);
                
                let json = JSON.parse( '{"title":"'+req.body.addtitle+'", "id":"'+req.body.addid+'", "thumbnails":'+req.body.thumbnails+'}');
                data['videos'].push(json);
                fs.writeFile('../../server/'+req.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    } 
                });
                console.log(json.title+" added to "+req.body.user+" library");
            })
        })

        var vidtoplay = [];
        myRouter.route('/play')
            .post(function (req,res) {
                console.log("POST received on /play");
                vidtoplay = {
                    videoId: req.body.videoid,
                    videotitle: req.body.videotitle,
                    thumbnails: req.body.thumbnails
                    //Modify thumbnails here
                }
            })
            .get(function (req, res) {
                console.log("GET received on /play");
                res.json(vidtoplay);
            })

        myRouter.route('/rename')
            .post(function(req,res){
                var oldname;
                console.log("POST received on /rename");
                fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                    if (err) {
                      return console.error(err);
                    }
                    data = JSON.parse(data);
                    for (var i = 0; i < data['videos'].length; i++){
                        if (data['videos'][i].id === req.body.videoid) {
                            oldname = data['videos'][i].title;
                            data['videos'][i].title = req.body.newtitle;
                        }
                    }
                    fs.writeFile('../../server/'+req.body.user+".lib", JSON.stringify(data), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("Renamed "+oldname+" to "+req.body.newtitle);
                    });
                })
                

            })
    
        myRouter.route('/remove')
        .post(function(req,res){
            console.log("POST received on /remove");
            fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);

                for (var i = 0; i < data['videos'].length; i++){
                    if (data['videos'][i].id === req.body.rmid){
                        data['videos'].splice(i,1);
                    }
                  }
                  console.log(req.body.rmtitle+ "deteled from "+req.body.user+" library");        
                  fs.writeFile('../../server/'+req.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    } 
                });
              })
        })

    myRouter.route('/data')
        .get(function(req,res){ 
            console.log("GET received on /data");
            console.log(req.query);
            fs.readFile('../../server/'+req.query.user+".lib", (err, data) => {
                if (err) {
                    return console.error(err);
                }
                //console.log(data.toString());
                try {
                    data = JSON.parse(data.toString());
                    res.json(data);
                } catch(e) {
                    console.log(e);
                }

              })
        })

    myRouter.route('/search')
        .post(function(req,res){
            console.log("POST received on /search");
            axios.get(ytapiURL, {
                params: {
                  part: 'snippet',
                  maxResults: req.body.maxResults,
                  q: req.body.keyword,
                  type: 'video',
                  key: apiKey
                }
              })
              .then(function (response) {
                  var results = [];
                  for (let i = 0; i < req.body.maxResults; i++) {
                        results.push({
                            videoId: response.data.items[i].id.videoId, 
                            videotitle: response.data.items[i].snippet.title,
                            thumbnails: response.data.items[i].snippet.thumbnails //Modify thumbnails here
                        });                      
                  }
                  console.log(JSON.stringify(results));
                    axios.post('http://localhost:2999/ressearch', {
                        body: {
                            results
                        }
                    })
                    .then(() => {console.log("Results sent to /ressearch ("+results.length+" results)"); }
                    )
                    .catch(function (error) {
                        console.log(error);
                    });
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
              });
        })
        
    
    var searchresults=[];
    myRouter.route('/ressearch')
        .post(function (req, res) {
            console.log("POST received on /ressearch");
            searchresults = req.body;
        })
        .get(function(req, res){
            console.log("GET received on /ressearch");
            res.json(searchresults.body);
        })

    app.use(myRouter);  
    app.listen(port, hostname, function(){
        console.log("Listening HTTP on "+hostname+":"+port);
    });
}


connectAPI();

