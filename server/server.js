const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let history = [];

// use these enhancers for testing and request use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

app.get('/calculate', (req, res) => {
  res.send(history);
});

app.post('/calculate', (req, res) => {
  let equation = req.body;

  console.log(equation.firstNum);
  if (equation.calcType === '+') {
    equation.answer =
      parseFloat(equation.firstNum) + parseFloat(equation.secondNum);
  } else if (equation.calcType === '-') {
    equation.answer =
      parseFloat(equation.firstNum) - parseFloat(equation.secondNum);
  } else if (equation.calcType === '*') {
    equation.answer =
      parseFloat(equation.firstNum) * parseFloat(equation.secondNum);
  } else if (equation.calcType === '/') {
    equation.answer =
      parseFloat(equation.firstNum) / parseFloat(equation.secondNum);
  }
  //   equation.answer = 0;
  console.log(equation.answer);
  console.log(equation);

  history.push(equation);
  res.sendStatus(201);
});

app.delete('/removeHistory', (req, res) => {
  history = [];
  res.send(history);
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
