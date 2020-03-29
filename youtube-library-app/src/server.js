const express = require('express'); 
const cors = require('cors');
const bodyParser = require("body-parser"); 
const fs = require('fs');
const axios = require('axios');

var hostname = 'localhost'; 
var port = 2999;
var ytapiURL = 'https://www.googleapis.com/youtube/v3/search';
var apiKey = 'AIzaSyASO7i2BTsNkU_YjucK5Eej-XgrsHnZDu8';

function decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp":" ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return encodedString.replace(translate_re, function(match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
    });
}


function connectAPI() {
    var app = express(); 
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    var myRouter = express.Router();

    myRouter.route('/add')
        .post(function(req,res){
            fs.readFile('../../databases/'+req.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);
                
                let json = JSON.parse( '{"title":"'+req.body.addtitle+'", "id":"'+req.body.addid+'", "thumbnails":'+req.body.thumbnails+'}');
                data['videos'].push(json);
                fs.writeFile('../../databases/'+req.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    fs.readFile('../../databases/'+req.body.user+".lib", (err, data) => {
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
                vidtoplay = {
                    videoId: req.body.videoid,
                    videotitle: req.body.videotitle,
                    thumbnails: req.body.thumbnails
                }
                res.json(vidtoplay);
            })

        myRouter.route('/rename')
            .post(function(req,res){
                var oldname;
                fs.readFile('../../databases/'+req.body.body.user+".lib", (err, data) => {
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
                    fs.writeFile('../../databases/'+req.body.body.user+".lib", JSON.stringify(data), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        fs.readFile('../../databases/'+req.body.body.user+".lib", (err, data) => {
                            data = JSON.parse(data);
                            res.json(data);
                        })
                        console.log("Renamed "+oldname+" to "+req.body.body.newtitle);
                    });
                })
                

            })
    
        myRouter.route('/remove')
        .post(function(req,res){
            fs.readFile('../../databases/'+req.body.body.user+".lib", (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                data = JSON.parse(data);
                var deletedVideo;
                for (var i = 0; i < data['videos'].length; i++){
                    if (data['videos'][i].id === req.body.body.rmid){
                        deletedVideo = data['videos'][i].title;
                        data['videos'].splice(i,1);
                    }
                  }
                  console.log(deletedVideo+ " deteled from "+req.body.body.user+"'s library");        
                  fs.writeFile('../../databases/'+req.body.body.user+".lib", JSON.stringify(data), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    fs.readFile('../../databases/'+req.body.body.user+".lib", (err, data) => {
                        data = JSON.parse(data);
                        res.json(data);
                    })
                });
              })
        })

    myRouter.route('/data')
        .get(function(req,res){ 
            console.log(req.query);
            fs.readFile('../../databases/'+req.query.user+".lib", (err, data) => {
                if (err) {
                    return console.error(err);
                }
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
                  }
                  else {
                    results.status = 'Ok';
                    for (let i = 0; i < req.body.maxResults; i++) {
                        if(response.data.items[i] !== undefined){
                            results.videos.push({
                                id: response.data.items[i].id.videoId, 
                                title: decodeEntities(response.data.items[i].snippet.title),
                                thumbnails: response.data.items[i].snippet.thumbnails //Modify thumbnails here
                            }); 
                        }                  
                  }
                  console.log("Results of search: "+JSON.stringify(results));
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

