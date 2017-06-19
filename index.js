const env = process.env.ENV || 'development';
const express = require('express');

const app = express();

/**
 * If an incoming request uses a protocol other than HTTPS,
 * redirect that request to the same url but with HTTPS
 *
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 * @param {Closure} next - function to be called at the end of execution
*/
function forceSSL(req, res, next) {
  if (process.env.ENV !== 'development' &&
    req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
}

// Instruct the app to use the forceSSL middleware
app.use(forceSSL);

app.set('port', process.env.PORT || 4200);

app.use(express.static(`${process.cwd()}/dist`));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: './dist' });
});

app.listen(app.get('port'), function () {
  console.log('Listening on port %d', app.get('port'));
});
