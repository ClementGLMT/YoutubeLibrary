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
                    fs.readFile('../../server/'+req.body.user+".lib", (err, data) => {
                        data = JSON.parse(data);
                        res.json(data);
                    })
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
                res.json(vidtoplay);
            })

        myRouter.route('/rename')
            .post(function(req,res){
                var oldname;
                console.log("POST received on /rename");
                console.log("Req received: "+JSON.stringify(req.body.body.user));
                fs.readFile('../../server/'+req.body.body.user+".lib", (err, data) => {
                    if (err) {
                      return console.error(err);
                    }
                    data = JSON.parse(data);
                    for (var i = 0; i < data['videos'].length; i++){
                        if (data['videos'][i].id === req.body.body.videoid) {
                            oldname = data['videos'][i].title;
                            data['videos'][i].title = req.body.body.newtitle;
                        }
                    }
                    fs.writeFile('../../server/'+req.body.body.user+".lib", JSON.stringify(data), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        fs.readFile('../../server/'+req.body.body.user+".lib", (err, data) => {
                            data = JSON.parse(data);
                            res.json(data);
                        })
                        console.log("Renamed "+oldname+" to "+req.body.body.newtitle);
                    });
                })
                

            })
    
        myRouter.route('/remove')
        .post(function(req,res){
            console.log("POST received on /remove");
            fs.readFile('../../server/'+req.body.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);

                for (var i = 0; i < data['videos'].length; i++){
                    if (data['videos'][i].id === req.body.body.rmid){
                        data['videos'].splice(i,1);
                    }
                  }
                  console.log(req.body.body.rmtitle+ "deteled from "+req.body.body.user+" library");        
                  fs.writeFile('../../server/'+req.body.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    fs.readFile('../../server/'+req.body.body.user+".lib", (err, data) => {
                        data = JSON.parse(data);
                        res.json(data);
                    })
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
            console.log("POST received on /search"+req);
            axios.get(ytapiURL, {
                params: {
                  part: 'snippet',
                  maxResults: req.body.maxResults,
                  q: req.body.keyword,
                  type: 'video',
                  key: apiKey,
                  fields: 'items(id,snippet(title, thumbnails))'
                }
              })
              .then(function (response) {
                  var results = {videos: [], status: ''};
                  if(response.data.items.length === 0){
                      res.json({
                          status: 'No results'
                      })
                      console.log("No results");
                  }
                  else {
                    results.status = 'Ok';
                    for (let i = 0; i < req.body.maxResults; i++) {
                        results.videos.push({
                            id: response.data.items[i].id.videoId, 
                            title: response.data.items[i].snippet.title,
                            thumbnails: response.data.items[i].snippet.thumbnails //Modify thumbnails here
                        });                      
                  }
                  console.log(JSON.stringify(results));
                  res.json(results);
                  }

              })
              .catch(function (error) {
                console.log(error);
                res.json(error);
              })
              .finally(function () {
              });
        })    

    app.use(myRouter);  
    app.listen(port, hostname, function(){
        console.log("Listening HTTP on "+hostname+":"+port);
    });
}


connectAPI();

