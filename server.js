const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
var sslRedirect = require('heroku-ssl-redirect');
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
var compression = require('compression')

// the __dirname is the current directory from where the script is running
app.use(compression())

app.all(/.*/, function (req, res, next) {
  var host = req.header("host");
  if (host.match(/^www\..*/i)) {
    next();
  } else {
    res.redirect(301, "http://www." + host);
  }
});
app.use(sslRedirect(['production'], 301));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
