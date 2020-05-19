const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
res.redirect(301, 'https://www.entertainmylife.com/pets/1' + req.originalUrl);

// app.use(function forceLiveDomain(req, res, next) {
//   // Don't allow user to hit Heroku now that we have a domain
//   var host = req.get('Host');
//   console.log(host)
//   if (host === 'entertainmylife.com' || host === 'http://entertainmylife.com' || host === 'http://www.entertainmylife.com' || 'https://entertainmylife.com') {
//     return res.redirect(301, 'https://www.entertainmylife.com/' + req.originalUrl);
//   }
//   return next();
// });


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
