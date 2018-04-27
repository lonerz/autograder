var request = require('request');
var register = require('./register.js');
var login = require('./login.js');
var path = require('path');

exports.get = function(req, res) {
  var url=req._parsedOriginalUrl.path.substr("/api".length)+"/";
  var rawHeaders=req.rawHeaders;
  var headers={};
  for(var i=0;i<rawHeaders.length;i+=2){
    headers[rawHeaders[i]]=rawHeaders[i+1];
  }
  //console.log("API",url);
  //console.log("Headers",headers);
  request.get({url: 'http://localhost:3000/' + url,

      headers:headers
  }, function(err, resp, body) {
      if(body) {
        //console.log(resp,body);
          return res.send(resp.body);
      }
      if(err) console.log(err);
      return res.redirect('/fail');
  });
    //if(req.session && req.session.userId) return res.redirect('/profile');
    //return res.sendFile(path.join(__dirname, '/../client/index.html'));
};

exports.post = function(req, res) {
  var url=req._parsedOriginalUrl.path.substr("/api".length)+"/";
  var rawHeaders=req.rawHeaders;
  var headers={};
  for(var i=0;i<rawHeaders.length;i+=2){
    headers[rawHeaders[i]]=rawHeaders[i+1];
  }
  //console.log("API",url);
  //console.log("Headers",headers);
  request.post({url: 'http://localhost:3000/' + url,

      headers:headers
  }, function(err, resp, body) {
      if(body) {
        //console.log(resp,body);
          return res.send(resp.body);
      }
      if(err) console.log(err);
      return res.redirect('/fail');
  });
    //if(req.session && req.session.userId) return res.redirect('/profile');
    //return res.sendFile(path.join(__dirname, '/../client/index.html'));
    //if(req.body.email) register(req, res);
  //  else login.login(req, res);
};
