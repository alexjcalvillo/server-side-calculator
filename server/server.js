const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

app.post('/calculate', (req, res) => {
  console.log('posted');
  res.sendStatus(201);
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
