const env = process.env.NODE_ENV || 'development';
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 4200);

app.use(express.static(process.cwd() + '/dist'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: './dist' });
});

app.listen(app.get('port'), function () {
  console.log('Listening on port %d', app.get('port'));
});
