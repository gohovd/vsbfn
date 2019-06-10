var app = require('./app');
var port = process.env.PORT || 3000;
var logger = require('logger').createLogger();

logger.setLevel("info");


var server = app.listen(port, function() {
  logger.info('VSBF: Express server listening on port ' + port);
});