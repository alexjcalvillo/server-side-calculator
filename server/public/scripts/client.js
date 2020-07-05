$(document).ready(init);
let calcType = '';
let inputValue1 = [];
let inputValue2 = [];

function init() {
  console.log('jquery is loaded');
  for (let i = 0; i < 17; i++) {
    $('button').eq(i).on('click', { value: i }, setMathType);
  }

  $('#js-calculate').on('click', submitMath);
  $('#js-clear').on('click', reset);
  $('.js-clear-history').on('click', clearHistory);
}

function setMathType(event) {
  //   calcType = $(this).data();
  //   calcType = calcType.math;
  //   console.log(calcType);
  let value = $(this).data().math;
  console.log(value);
  switch (value) {
    case '+':
      if (inputValue1.length === 0) {
        alert('Please select a value first');
      } else {
        calcType = value;
      }
      break;
    case '-':
      if (inputValue1.length === 0) {
        alert('Please select a value first');
      } else {
        calcType = value;
      }
      break;
    case '/':
      if (inputValue1.length === 0) {
        alert('Please select a value first');
      } else {
        calcType = value;
      }
      break;
    case '*':
      if (inputValue1.length === 0) {
        alert('Please select a value first');
      } else {
        calcType = value;
      }
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
    case '.':
      if (calcType === '') {
        inputValue1.push(value);
        console.log(inputValue1);
      } else {
        inputValue2.push(value);
        console.log(inputValue2);
      }
    default:
      break;
  }
  renderInputs();
}

function submitMath() {
  console.log('calculating');
  const equation = {
    firstNum: inputValue1.join(''),
    secondNum: inputValue2.join(''),
    calcType,
  };

  if (
    equation.firstNum == '' ||
    equation.secondNum == '' ||
    equation.calcType == ('' || null)
  ) {
    alert('Not a complete equation.');
    return;
  }
  console.table(equation);
  // post this data to the server
  $.ajax({
    type: 'POST',
    url: '/calculate',
    data: equation,
  }).then((response) => {
    console.log('Post response ', response);
    // get back the transformed data from server
    getCalculation();
    reset();
  });
}

function reset() {
  inputValue1 = [];
  console.log(inputValue1);
  inputValue2 = [];
  calcType = '';
  renderInputs();
  $('.answer').empty();
  $('.answer').append(`
  <p>Answer:</p>
  `);
}

function getCalculation() {
  // get back data from the server transformed
  $.ajax({
    type: 'GET',
    url: '/calculate',
  }).then((response) => {
    console.log('GET - response', response);
    render(response);
  });
}

function render(calcWithAnswer) {
  // display stuff on html screen
  console.log(calcWithAnswer);
  $('#js-answer').empty();

  $('#js-answer').append(`
    <p class='answer'>Answer: ${
      calcWithAnswer[calcWithAnswer.length - 1].answer
    }</p>
    `);
  $('#js-history').empty();
  for (let i = 0; i < calcWithAnswer.length; i++) {
    $('#js-history').append(`
        <li class="js-prevEquation" data-answer="${calcWithAnswer[i].answer}">${calcWithAnswer[i].firstNum} ${calcWithAnswer[i].calcType} ${calcWithAnswer[i].secondNum} = ${calcWithAnswer[i].answer}</li>
        `);
  }
}

function renderInputs() {
  console.log('in renderInputs');
  $('#js-displayField').empty();

  let displayValue1 = inputValue1.join('');
  let displayValue2 = inputValue2.join('');

  $('#js-displayField').append(`
  <p class="displayText">${displayValue1} ${calcType} ${displayValue2}</p>
  `);
}

function clearHistory() {
  $.ajax({
    type: 'DELETE',
    url: '/removeHistory',
  }).then((response) => {
    console.log('DELETE - ', response);
    renderClear();
  });
}

function renderClear() {
  $('#js-history').empty();
}
